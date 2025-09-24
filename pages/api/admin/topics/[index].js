// pages/api/admin/topics/[index].js
import { getToken } from "next-auth/jwt";
import * as Topics from "@/lib/topics";

function noCache(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
}

export default async function handler(req, res) {
  noCache(res);

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).end();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  const idx = Number(req.query.index);
  if (!Number.isInteger(idx) || idx < 0) {
    return res.status(400).json({ error: "Invalid index" });
  }

  if (req.method === "DELETE") {
    const r = await Topics.deleteTopic(idx);
    if (!r?.ok) return res.status(400).json({ error: r?.error || "Delete failed" });
    const topics = await Topics.getTopics();
    return res.status(200).json({ ok: true, topics });
  }

  if (req.method === "PUT") {
    const { toIndex } = req.body || {};
    const to = Number(toIndex);
    if (!Number.isInteger(to) || to < 0) return res.status(400).json({ error: "Invalid toIndex" });
    const r = await Topics.moveTopic(idx, to);
    if (!r?.ok) return res.status(400).json({ error: r?.error || "Move failed" });
    const topics = await Topics.getTopics();
    return res.status(200).json({ ok: true, topics });
  }

  res.setHeader("Allow", "DELETE, PUT, OPTIONS");
  return res.status(405).json({ error: "Method Not Allowed" });
}
