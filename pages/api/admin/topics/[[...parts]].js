// pages/api/admin/topics/[[...parts]].js
import { getToken } from "next-auth/jwt";
import { getTopics, addTopic, deleteTopic, moveTopic } from "@/lib/topics";

function noCache(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
}

function safeParse(body, fallback = {}) {
  try { return JSON.parse(body); } catch { return fallback; }
}

export default async function handler(req, res) {
  noCache(res);

  // CORS/preflight (harmless on same-origin but avoids surprises)
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).end();
  }

  // 🔐 Require admin for all topics APIs
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  const parts = req.query.parts || [];            // [] for /topics, ["0"] for /topics/0
  const hasIndex = parts.length === 1;
  const idx = hasIndex ? Number(parts[0]) : null;

  try {
    switch (req.method) {
      case "GET": {
        const topics = await getTopics();
        return res.status(200).json({ topics });
      }

      case "POST": {
        const body = typeof req.body === "string" ? safeParse(req.body) : (req.body || {});
        const topic = (body.topic || "").trim();
        if (!topic) return res.status(400).json({ error: "Invalid topic" });
        const r = await addTopic(topic);
        if (!r?.ok) return res.status(400).json({ error: r?.error || "Failed to add" });
        const topics = await getTopics();
        return res.status(201).json({ ok: true, topics });
      }

      case "DELETE": {
        if (!hasIndex || !Number.isInteger(idx) || idx < 0) {
          return res.status(400).json({ error: "Index required" });
        }
        const r = await deleteTopic(idx);
        if (!r?.ok) return res.status(400).json({ error: r?.error || "Delete failed" });
        const topics = await getTopics();
        return res.status(200).json({ ok: true, topics });
      }

      case "PUT": {
        if (!hasIndex || !Number.isInteger(idx) || idx < 0) {
          return res.status(400).json({ error: "Index required" });
        }
        const body = typeof req.body === "string" ? safeParse(req.body) : (req.body || {});
        const to = Number(body.toIndex);
        if (!Number.isInteger(to) || to < 0) return res.status(400).json({ error: "Invalid toIndex" });
        const r = await moveTopic(idx, to);
        if (!r?.ok) return res.status(400).json({ error: r?.error || "Move failed" });
        const topics = await getTopics();
        return res.status(200).json({ ok: true, topics });
      }

      default: {
        res.setHeader("Allow", "GET, POST, DELETE, PUT, OPTIONS");
        return res.status(405).json({ error: "Method Not Allowed" });
      }
    }
  } catch (e) {
    // Ensure JSON on errors (prevents "Unexpected end of JSON input" in the client)
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}
