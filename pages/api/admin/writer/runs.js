// pages/api/admin/writer/runs.js
import { getToken } from "next-auth/jwt";
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  try {
    const rows = await sql`
      SELECT id, status, slug, path, image, error, "startedAt", "finishedAt"
      FROM "WriterRun"
      ORDER BY "startedAt" DESC
      LIMIT 30
    `;
    return res.status(200).json({ runs: rows });
  } catch (e) {
    console.error("runs API error:", e);
    return res.status(500).json({ error: "Failed to load runs" });
  }
}
