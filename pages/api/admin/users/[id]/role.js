import { neon } from "@neondatabase/serverless";
import { getToken } from "next-auth/jwt";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // 🚫 no-cache for admin API
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  if (req.method !== "PUT") return res.status(405).end();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  const { id } = req.query;
  const { role } = req.body || {};
  if (!id || !role || !["admin", "user"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  // Disallow self-demotion (optional but recommended)
  if (token.sub === id && role !== "admin") {
    return res.status(400).json({ error: "You cannot demote your own account." });
  }

  try {
    const rows = await sql`
      UPDATE "User" SET role = ${role}, "updatedAt" = now()
      WHERE id = ${id}
      RETURNING id, email, role
    `;
    if (!rows.length) return res.status(404).json({ error: "User not found" });
    return res.json({ user: rows[0] });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to update role" });
  }
}
