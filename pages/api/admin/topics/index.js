// pages/api/admin/topics/index.js
import { getToken } from "next-auth/jwt";
import { getTopics, addTopic } from "@/lib/topics";

function noCache(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
}

export default async function handler(req, res) {
  noCache(res);

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).end();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  if (req.method === "GET") {
    const topics = await getTopics();
    return res.status(200).json({ topics });
  }

  if (req.method === "POST") {
    const { topic } = req.body || {};
    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return res.status(400).json({ error: "Invalid topic" });
    }
    const r = await addTopic(topic.trim());
    if (!r?.ok) return res.status(400).json({ error: r?.error || "Failed to add" });
    const topics = await getTopics();
    return res.status(201).json({ ok: true, topics });
  }

  res.setHeader("Allow", "GET, POST, OPTIONS");
  return res.status(405).json({ error: "Method Not Allowed" });
}
