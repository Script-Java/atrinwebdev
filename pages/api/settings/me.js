import { neon } from "@neondatabase/serverless";
import { getToken } from "next-auth/jwt";
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // 🚫 no-cache for admin API
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "GET") {
    const rows = await sql`
      SELECT id, email, name, role, "createdAt"
      FROM "User" WHERE id = ${token.sub} LIMIT 1
    `;
    if (!rows.length) return res.status(404).json({ error: "User not found" });
    return res.json({ user: rows[0] });
  }

  if (req.method === "PUT") {
    const { name = "" } = req.body || {};
    const rows = await sql`
      UPDATE "User"
      SET name = ${name || null}, "updatedAt" = now()
      WHERE id = ${token.sub}
      RETURNING id, email, name, role, "createdAt"
    `;
    if (!rows.length) return res.status(404).json({ error: "User not found" });
    return res.json({ user: rows[0] });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
