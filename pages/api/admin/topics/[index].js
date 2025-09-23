import { getToken } from "next-auth/jwt";
import { deleteTopic, moveTopic, getTopics } from "@/lib/topics";

export default async function handler(req, res) {
  // 🚫 no-cache for admin API
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  const { index } = req.query;

  if (req.method === "DELETE") {
    const r = await deleteTopic(index);
    if (!r.ok) return res.status(400).json({ error: r.error || "Delete failed" });
    const topics = await getTopics();
    return res.json({ ok: true, topics });
  }

  if (req.method === "PUT") {
    const { toIndex } = req.body || {};
    const r = await moveTopic(index, toIndex);
    if (!r.ok) return res.status(400).json({ error: r.error || "Move failed" });
    const topics = await getTopics();
    return res.json({ ok: true, topics });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
