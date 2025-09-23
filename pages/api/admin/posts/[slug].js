import { getToken } from "next-auth/jwt";
import path from "path";
import fs from "fs/promises";

async function githubDelete(relPath) {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const branch = process.env.GITHUB_BRANCH || "main";
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(relPath)}?ref=${encodeURIComponent(branch)}`;
  const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "blog-writer-bot",
  };
  const getRes = await fetch(url, { headers });
  if (!getRes.ok) throw new Error(`GitHub get sha failed ${getRes.status}: ${await getRes.text()}`);
  const meta = await getRes.json();

  const delRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(relPath)}`, {
    method: "DELETE",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `chore(blog): delete ${relPath}`,
      sha: meta.sha,
      branch,
    }),
  });
  if (!delRes.ok) throw new Error(`GitHub delete failed ${delRes.status}: ${await delRes.text()}`);
  return true;
}

export default async function handler(req, res) {
  // 🚫 no-cache for admin API
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error: "Missing slug" });

  if (req.method !== "DELETE") return res.status(405).json({ error: "Method not allowed" });

  try {
    const mdRel = `src/content/${slug}.md`;
    const imgRel = `public/images/posts/${slug}.svg`;

    if (process.env.VERCEL) {
      await githubDelete(mdRel);
      // ignore if image missing
      try { await githubDelete(imgRel); } catch {}
    } else {
      const mdAbs = path.join(process.cwd(), mdRel);
      const imgAbs = path.join(process.cwd(), imgRel);
      await fs.unlink(mdAbs).catch(()=>{});
      await fs.unlink(imgAbs).catch(()=>{});
    }

    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: String(e.message || e) });
  }
}
