// pages/api/admin/writer/run.js
export const config = { runtime: "nodejs" }; // avoid Edge; we import fs/path locally

import { getToken } from "next-auth/jwt";
import path from "path";
import fs from "fs/promises";
import { chat } from "@/lib/blog-ai/chat";
import { upsertFileInRepo } from "@/lib/github";
import { getNextTopic } from "@/lib/topics";
import buildCoverSVG from "@/lib/cover";
import { createRun, makeLogger, finishRun } from "@/lib/writer-logger";

const CONTENT_DIR = process.env.CONTENT_DIR || "src/content";

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

// more tolerant JSON parser (handles code fences / extra prose)
function parseJsonLoose(raw) {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch {}
  const m =
    raw.match(/```json\s*([\s\S]*?)```/i) ||
    raw.match(/\{[\s\S]*\}$/);
  if (m) {
    const s = Array.isArray(m) ? (m[1] || m[0]) : m;
    try { return JSON.parse(s); } catch {}
  }
  return null;
}

async function fileExists(relPath) {
  if (process.env.VERCEL) {
    const owner = process.env.GITHUB_REPO_OWNER;
    const repo = process.env.GITHUB_REPO_NAME;
    const branch = process.env.GITHUB_BRANCH || "main";
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(relPath)}?ref=${encodeURIComponent(branch)}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "blog-writer-bot",
      },
      cache: "no-store",
    });
    return res.ok;
  }
  try { await fs.stat(path.join(process.cwd(), relPath)); return true; } catch { return false; }
}

export default async function handler(req, res) {
  // 🚫 no-cache for admin API
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  const runId = await createRun();
  const logger = makeLogger(runId);

  try {
    await logger.info("start", "Beginning AI blog generation run");

    // 1) Topic
    const topic = (await getNextTopic()) || "Next.js on Vercel best practices";
    await logger.info("topic", `Topic selected: ${topic}`);

    // 2) Meta (STRICT JSON ONLY)
    await logger.info("meta", "Requesting title/description/tags from Groq…");
    const metaRaw = await chat(
      [
        {
          role: "system",
          content:
            "You are a strict JSON generator. Output ONLY a JSON object with keys: title, description, tags. " +
            'No prose. No code fences. "description" <= 150 chars. "tags" length 3-6.',
        },
        {
          role: "user",
          content: `Topic: ${topic}\nReturn: {"title":"...","description":"...","tags":["...","..."]}`,
        },
      ],
      { temperature: 0.2 }
    );

    let title = topic, description = "A helpful post.", tags = ["webdev"];
    const meta = parseJsonLoose(metaRaw);
    if (meta) {
      title = meta?.title || title;
      description = meta?.description || description;
      tags = Array.isArray(meta?.tags) ? meta.tags : tags;
      await logger.info("meta", "Meta parsed", { title, description, tags });
    } else {
      await logger.warn("meta", "Failed to parse JSON meta, using defaults", { raw: metaRaw });
    }

    const slug = slugify(title);
    const today = new Date().toISOString().slice(0, 10);
    const mdRelPath = `${CONTENT_DIR}/${slug}.md`;

    // 3) Duplicate check
    if (await fileExists(mdRelPath)) {
      await logger.warn("check", "Slug already exists, skipping", { slug, path: mdRelPath });
      await finishRun(runId, "skipped", { slug, path: mdRelPath });
      return res.json({ skipped: true, reason: "slug-exists", runId, slug, path: mdRelPath, logs: logger.buffer });
    }

    // 4) Body
    await logger.info("body", "Requesting body markdown from Groq…");
    const bodyMd = await chat(
      [
        { role: "system", content: "You are a meticulous technical writer." },
        {
          role: "user",
          content:
            `Write a 1200-1600 word Markdown article.\n` +
            `Title: ${title}\nAudience: professional web developers.\n` +
            `Include: clear headings, actionable steps, code examples (JS/Next.js/SQL), ` +
            `"Key Takeaways" (4-6 bullets), conclusion.\n` +
            `Do NOT add front-matter; only the body markdown.`,
        },
      ],
      { temperature: 0.7 }
    );

    // 5) Cover SVG
    await logger.info("cover", "Building SVG cover image…");
    const svg = buildCoverSVG({ title });
    const imageRel = `public/images/posts/${slug}.svg`;

    // 6) Persist image
    if (process.env.VERCEL) {
      await upsertFileInRepo({
        path: imageRel,
        content: svg,
        message: `chore(blog): add cover ${slug}.svg`,
      });
      await logger.info("cover", "Cover committed to GitHub", { path: imageRel });
    } else {
      const abs = path.join(process.cwd(), imageRel);
      await fs.mkdir(path.dirname(abs), { recursive: true });
      await fs.writeFile(abs, svg, "utf8");
      await logger.info("cover", "Cover written to disk", { path: abs });
    }

    // 7) Front-matter + content
    const fm = [
      "---",
      `title: "${title.replace(/"/g, '\\"')}"`,
      `date: "${today}"`,
      `description: "${description.replace(/"/g, '\\"')}"`,
      `image: "/images/posts/${slug}.svg"`,
      `tags:${tags.map((t) => `\n  - ${t}`).join("")}`,
      "---",
      "",
    ].join("\n");
    const mdContent = fm + (bodyMd || "").trim() + "\n";

    // 8) Persist markdown
    if (process.env.VERCEL) {
      await upsertFileInRepo({
        path: mdRelPath,
        content: mdContent,
        message: `chore(blog): add ${slug}.md`,
      });
      await logger.info("persist", "Markdown committed to GitHub", { path: mdRelPath });
    } else {
      const abs = path.join(process.cwd(), mdRelPath);
      await fs.mkdir(path.dirname(abs), { recursive: true });
      await fs.writeFile(abs, mdContent, "utf8");
      await logger.info("persist", "Markdown written to disk", { path: abs });
    }

    await finishRun(runId, "ok", { slug, path: mdRelPath, image: `/images/posts/${slug}.svg` });
    await logger.info("done", "Run finished successfully");
    return res.json({ ok: true, runId, slug, path: mdRelPath, image: `/images/posts/${slug}.svg`, logs: logger.buffer });
  } catch (e) {
    const msg = String(e?.message || e);
    await logger.error("error", msg);

    // Map common GitHub misconfig to helpful HTTP
    if (msg.includes("GitHub is not configured")) {
      await finishRun(runId, "error", { error: msg });
      return res.status(501).json({ ok: false, runId, error: "GitHub not configured for prod environment" });
    }
    if (msg.includes("token lacks Contents write")) {
      await finishRun(runId, "error", { error: msg });
      return res.status(502).json({
        ok: false,
        runId,
        error: "GitHub token has no write access. Grant Contents: Read & write, enable SSO if needed.",
      });
    }

    await finishRun(runId, "error", { error: msg });
    return res.status(500).json({ ok: false, runId, error: msg, logs: logger.buffer });
  }
}
