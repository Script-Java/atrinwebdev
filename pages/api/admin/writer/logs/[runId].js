// pages/api/admin/writer/logs/[runId].js
import { getToken } from "next-auth/jwt";
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // 🚫 disable caching for live polling
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  // 🔒 admin-only
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { runId } = req.query;
  if (!runId) return res.status(400).json({ error: "Missing runId" });

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const rows = await sql`
      SELECT ts, level, step, message, meta
      FROM "WriterLog"
      WHERE runId = ${runId}
      ORDER BY ts ASC, id ASC
    `;
    return res.status(200).json({ logs: rows });
  } catch (e) {
    console.error("logs API error:", e);
    return res.status(500).json({ error: "Failed to load logs" });
  }
}
