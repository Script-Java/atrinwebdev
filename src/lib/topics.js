// src/lib/topics.js
import path from "path";
import fs from "fs/promises";

const FILE_PATH = "topics.json";

const GH = {
  token: process.env.GITHUB_TOKEN,
  owner: process.env.GITHUB_REPO_OWNER,
  repo: process.env.GITHUB_REPO_NAME,
  branch: process.env.GITHUB_BRANCH || "main",
};

async function readFromGitHub(filePath) {
  const url = `https://api.github.com/repos/${GH.owner}/${GH.repo}/contents/${encodeURIComponent(filePath)}?ref=${encodeURIComponent(GH.branch)}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GH.token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "blog-writer-bot",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    if (res.status === 404) return { content: '{"topics":[]}', sha: null };
    throw new Error(`GitHub read failed ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  const content = Buffer.from(json.content || "", "base64").toString("utf8");
  return { content, sha: json.sha };
}

async function writeToGitHub(filePath, content, message, sha = undefined) {
  const url = `https://api.github.com/repos/${GH.owner}/${GH.repo}/contents/${encodeURIComponent(filePath)}`;
  const body = {
    message,
    content: Buffer.from(content, "utf8").toString("base64"),
    branch: GH.branch,
    ...(sha ? { sha } : {}),
  };
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GH.token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "blog-writer-bot",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GitHub write failed ${res.status}: ${await res.text()}`);
  return res.json();
}

async function readLocal(filePath) {
  const abs = path.join(process.cwd(), filePath);
  try {
    return await fs.readFile(abs, "utf8");
  } catch {
    return '{"topics":[]}';
  }
}
async function writeLocal(filePath, content) {
  const abs = path.join(process.cwd(), filePath);
  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, content, "utf8");
}

/* ---------------- Public API ---------------- */

export async function getTopics() {
  if (process.env.VERCEL) {
    const gh = await readFromGitHub(FILE_PATH);
    const data = JSON.parse(gh.content || '{"topics":[]}');
    return data.topics || [];
  }
  const raw = await readLocal(FILE_PATH);
  const data = JSON.parse(raw || '{"topics":[]}');
  return data.topics || [];
}

export async function addTopic(topic) {
  const t = (topic || "").trim();
  if (!t) return { ok: false, error: "Empty topic" };

  if (process.env.VERCEL) {
    const gh = await readFromGitHub(FILE_PATH);
    const data = JSON.parse(gh.content || '{"topics":[]}');
    data.topics = data.topics || [];
    data.topics.push(t);
    const updated = JSON.stringify(data, null, 2);
    await writeToGitHub(FILE_PATH, updated, `chore(topics): add "${t}"`, gh.sha || undefined);
    return { ok: true };
  } else {
    const raw = await readLocal(FILE_PATH);
    const data = JSON.parse(raw || '{"topics":[]}');
    data.topics = data.topics || [];
    data.topics.push(t);
    await writeLocal(FILE_PATH, JSON.stringify(data, null, 2));
    return { ok: true };
  }
}

export async function deleteTopic(index) {
  const i = Number(index);
  if (!Number.isInteger(i) || i < 0) return { ok: false, error: "Bad index" };

  if (process.env.VERCEL) {
    const gh = await readFromGitHub(FILE_PATH);
    const data = JSON.parse(gh.content || '{"topics":[]}');
    if (!data.topics || i >= data.topics.length) return { ok: false, error: "Out of range" };
    const removed = data.topics.splice(i, 1)[0];
    const updated = JSON.stringify(data, null, 2);
    await writeToGitHub(FILE_PATH, updated, `chore(topics): delete "${removed}"`, gh.sha || undefined);
    return { ok: true };
  } else {
    const raw = await readLocal(FILE_PATH);
    const data = JSON.parse(raw || '{"topics":[]}');
    if (!data.topics || i >= data.topics.length) return { ok: false, error: "Out of range" };
    data.topics.splice(i, 1);
    await writeLocal(FILE_PATH, JSON.stringify(data, null, 2));
    return { ok: true };
  }
}

export async function moveTopic(fromIndex, toIndex) {
  const from = Number(fromIndex);
  const to = Number(toIndex);
  if (![from, to].every(Number.isInteger) || from < 0 || to < 0) {
    return { ok: false, error: "Bad index" };
  }

  const move = (arr, a, b) => {
    if (a === b) return arr;
    if (a < 0 || a >= arr.length || b < 0 || b >= arr.length) return arr;
    const item = arr.splice(a, 1)[0];
    arr.splice(b, 0, item);
    return arr;
    };

  if (process.env.VERCEL) {
    const gh = await readFromGitHub(FILE_PATH);
    const data = JSON.parse(gh.content || '{"topics":[]}');
    data.topics = data.topics || [];
    move(data.topics, from, to);
    const updated = JSON.stringify(data, null, 2);
    await writeToGitHub(FILE_PATH, updated, `chore(topics): reorder ${from}→${to}`, gh.sha || undefined);
    return { ok: true };
  } else {
    const raw = await readLocal(FILE_PATH);
    const data = JSON.parse(raw || '{"topics":[]}');
    data.topics = data.topics || [];
    move(data.topics, from, to);
    await writeLocal(FILE_PATH, JSON.stringify(data, null, 2));
    return { ok: true };
  }
}

/** Consume first topic and persist (used by cron & admin run) */
export async function getNextTopic() {
  if (process.env.VERCEL) {
    const gh = await readFromGitHub(FILE_PATH);
    const data = JSON.parse(gh.content || '{"topics":[]}');
    const next = (data.topics || []).shift();
    const updated = JSON.stringify({ topics: data.topics || [] }, null, 2);
    await writeToGitHub(FILE_PATH, updated, next ? `chore(topics): consume "${next}"` : "chore(topics): consume(empty)", gh.sha || undefined);
    return next || null;
  }
  const raw = await readLocal(FILE_PATH);
  const data = JSON.parse(raw || '{"topics":[]}');
  const next = (data.topics || []).shift();
  await writeLocal(FILE_PATH, JSON.stringify({ topics: data.topics || [] }, null, 2));
  return next || null;
}
