import { getToken } from "next-auth/jwt";
import { getTopics,addTopic } from "@/lib/topics";

export default async function handler(req, res) {
  // 🚫 no-cache for admin API
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  if (req.method === "GET") {
    const topics = await getTopics();
    return res.json({ topics });
  }

  if (req.method === "POST") {
    const { topic } = req.body || {};
    const r = await addTopic(topic);
    if (!r.ok) return res.status(400).json({ error: r.error || "Failed to add" });
    const topics = await getTopics();
    return res.json({ ok: true, topics });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
