// lib/github.js
const GH = {
  token: process.env.GITHUB_TOKEN,
  owner: process.env.GITHUB_REPO_OWNER,  // e.g., "atrinwebdev"
  repo: process.env.GITHUB_REPO_NAME,    // e.g., "your-repo"
  branch: process.env.GITHUB_BRANCH || "main",
};

export async function upsertFileInRepo({ path, content, message }) {
  const urlBase = `https://api.github.com/repos/${GH.owner}/${GH.repo}/contents/${encodeURIComponent(path)}`;
  const headers = {
    Authorization: `Bearer ${GH.token}`,
    "Content-Type": "application/json",
    "User-Agent": "blog-writer-bot",
    Accept: "application/vnd.github+json",
  };

  // Check if file exists to include its SHA on update
  let sha = null;
  {
    const headRes = await fetch(`${urlBase}?ref=${encodeURIComponent(GH.branch)}`, { headers });
    if (headRes.ok) {
      const headJson = await headRes.json();
      sha = headJson.sha || null;
    }
  }

  const body = {
    message,
    content: Buffer.from(content, "utf8").toString("base64"),
    branch: GH.branch,
    ...(sha ? { sha } : {}),
  };

  const putRes = await fetch(urlBase, { method: "PUT", headers, body: JSON.stringify(body) });
  if (!putRes.ok) {
    const t = await putRes.text();
    throw new Error(`GitHub upsert failed ${putRes.status}: ${t}`);
  }
  return putRes.json();
}
