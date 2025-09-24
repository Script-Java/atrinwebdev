// lib/github.js
const GH = {
  token: process.env.GITHUB_TOKEN,
  owner: process.env.GITHUB_REPO_OWNER,  // e.g., "Script-Java"
  repo: process.env.GITHUB_REPO_NAME,    // e.g., "atrinwebdev"
  branch: process.env.GITHUB_BRANCH || "main",
};

const isConfigured =
  !!(GH.token && GH.owner && GH.repo && GH.branch);

function ghHeaders(extra = {}) {
  return {
    Authorization: `Bearer ${GH.token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "blog-writer-bot",
    "Content-Type": "application/json",
    ...extra,
  };
}

export async function upsertFileInRepo({ path, content, message }) {
  if (!isConfigured) {
    throw new Error(
      "GitHub is not configured (GITHUB_TOKEN/OWNER/REPO/BRANCH). " +
      "Set env vars in Vercel and redeploy."
    );
  }

  const base = `https://api.github.com/repos/${GH.owner}/${GH.repo}/contents/${encodeURIComponent(path)}`;

  // Get existing sha (ok if 404)
  let sha = undefined;
  {
    const res = await fetch(`${base}?ref=${encodeURIComponent(GH.branch)}`, {
      headers: ghHeaders(),
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      sha = json.sha;
    } else if (res.status !== 404) {
      const t = await res.text();
      throw new Error(`GitHub read failed ${res.status}: ${t}`);
    }
  }

  const body = {
    message,
    content: Buffer.from(content, "utf8").toString("base64"),
    branch: GH.branch,
    ...(sha ? { sha } : {}),
  };

  const putRes = await fetch(base, {
    method: "PUT",
    headers: ghHeaders(),
    body: JSON.stringify(body),
  });

  if (!putRes.ok) {
    const t = await putRes.text();
    // Map the common 403 into something actionable:
    if (putRes.status === 403 && t.includes("Resource not accessible by personal access token")) {
      throw new Error(
        "GitHub upsert failed 403: token lacks Contents write. " +
        "Fix in Vercel env:\n" +
        "- Use a PAT with 'repo' scope (classic) OR fine-grained with Repository permissions → Contents: Read and write.\n" +
        "- If the repo is in an org with SSO, click 'Enable SSO' on the token.\n" +
        "- Confirm GITHUB_REPO_OWNER/NAME/BRANCH."
      );
    }
    throw new Error(`GitHub upsert failed ${putRes.status}: ${t}`);
  }

  return putRes.json();
}
