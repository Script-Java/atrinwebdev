// pages/api/cron/generate.js
import { chat } from "@/lib/blog-ai/chat";
import { upsertFileInRepo } from "@/lib/github";
import { getNextTopic } from "@/lib/topics";
import { buildCoverSVG } from "@/lib/cover";
import path from "path";
import fs from "fs/promises";

const CRON_SECRET = process.env.CRON_SECRET;
const CONTENT_DIR = process.env.CONTENT_DIR || "src/content";

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
}
function getChicagoNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour12: false, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(new Date());
  const by = Object.fromEntries(parts.map(p => [p.type, p.value]));
  return { weekday: by.weekday, hour: Number(by.hour) };
}
async function fileExists(relPath) {
  if (process.env.VERCEL) {
    const owner = process.env.GITHUB_REPO_OWNER;
    const repo = process.env.GITHUB_REPO_NAME;
    const branch = process.env.GITHUB_BRANCH || "main";
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(relPath)}?ref=${encodeURIComponent(branch)}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "User-Agent": "blog-writer-bot" } });
    return res.ok;
  }
  try { await fs.stat(path.join(process.cwd(), relPath)); return true; } catch { return false; }
}

export default async function handler(req, res) {
  // auth
  if ((req.headers.authorization || "") !== `Bearer ${CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  // run only Mon/Wed/Fri 09:00 America/Chicago
  const { weekday, hour } = getChicagoNow();
  if (!(["Mon","Wed","Fri"].includes(weekday) && hour === 9)) {
    return res.json({ skipped: true, reason: `Not schedule time (${weekday} ${hour}:xx CT)` });
  }

  try {
    // Topic queue
    const topic = (await getNextTopic()) || "Next.js on Vercel best practices";
    // Meta
    const metaJson = await chat([
      { role: "system", content: "You are an expert tech blogger for web developers." },
      { role: "user", content:
`Return JSON with keys: title, description (<=150 chars), tags[] (3-6).
Topic: "${topic}"
Constraints:
- Title must be concise and compelling.
- Description must be plain text, <=150 chars.` }
    ], { temperature: 0.6 });

    let title = topic, description = "A helpful post.", tags = ["webdev"];
    try {
      const parsed = JSON.parse(metaJson);
      title = parsed?.title || title;
      description = parsed?.description || description;
      tags = Array.isArray(parsed?.tags) ? parsed.tags : tags;
    } catch {}

    const slug = slugify(title);
    const today = new Date().toISOString().slice(0, 10);

    // skip duplicate slug
    const relPath = `${CONTENT_DIR}/${slug}.md`;
    if (await fileExists(relPath)) {
      return res.json({ skipped: true, reason: "slug-exists", slug, path: relPath });
    }

    // Body
    const bodyMd = await chat([
      { role: "system", content: "You are a meticulous technical writer." },
      { role: "user", content:
`Write a 1200-1600 word Markdown article.
Title: ${title}
Audience: professional web developers.
Include: clear headings, actionable steps, code examples (JS/Next.js/SQL), "Key Takeaways" (4-6 bullets), conclusion.
Do NOT add front-matter; only the body markdown.` }
    ], { temperature: 0.7 });

    // Cover image (SVG)
    const svg = buildCoverSVG({ title });
    const imageRel = `public/images/posts/${slug}.svg`;
    if (process.env.VERCEL) {
      await upsertFileInRepo({
        path: imageRel,
        content: svg,
        message: `chore(blog): add cover ${slug}.svg`,
      });
    } else {
      const abs = path.join(process.cwd(), imageRel);
      await fs.mkdir(path.dirname(abs), { recursive: true });
      await fs.writeFile(abs, svg, "utf8");
    }

    // Assemble Markdown
    const fm = [
      "---",
      `title: "${title.replace(/"/g, '\\"')}"`,
      `date: "${today}"`,
      `description: "${description.replace(/"/g, '\\"')}"`,
      `image: "/images/posts/${slug}.svg"`,
      `tags:${tags.map(t => `\n  - ${t}`).join("")}`,
      "---",
      "",
    ].join("\n");
    const mdContent = fm + (bodyMd || "").trim() + "\n";

    // Persist Markdown
    if (process.env.VERCEL) {
      await upsertFileInRepo({
        path: relPath,
        content: mdContent,
        message: `chore(blog): add ${slug}.md`,
      });
    } else {
      const abs = path.join(process.cwd(), relPath);
      await fs.mkdir(path.dirname(abs), { recursive: true });
      await fs.writeFile(abs, mdContent, "utf8");
    }

    return res.json({ ok: true, slug, path: relPath, image: `/images/posts/${slug}.svg` });
  } catch (e) {
    console.error("CRON generate failed:", e);
    return res.status(500).json({ error: String(e.message || e) });
  }
}
