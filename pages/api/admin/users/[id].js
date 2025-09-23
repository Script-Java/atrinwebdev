import { getToken } from "next-auth/jwt";
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
    // 🚫 no-cache for admin API
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Missing id" });

  if (req.method === "DELETE") {
    try {
      const rows = await sql`DELETE FROM "User" WHERE id = ${id} RETURNING id`;
      if (rows.length === 0) return res.status(404).json({ error: "User not found" });
      return res.json({ ok: true });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Delete failed" });
    }
  }

  if (req.method === "PUT") {
    // optional: update role
    const { role } = req.body || {};
    if (!role) return res.status(400).json({ error: "Missing role" });
    try {
      const rows = await sql`
        UPDATE "User" SET role = ${role} WHERE id = ${id} RETURNING id, email, role, "createdAt"
      `;
      if (rows.length === 0) return res.status(404).json({ error: "User not found" });
      return res.json({ user: rows[0] });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Update failed" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
