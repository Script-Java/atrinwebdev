// pages/api/admin/users/index.js
import { neon } from "@neondatabase/serverless";
import { getToken } from "next-auth/jwt";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // 🚫 no-cache for admin API
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  // Only admins can list users
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (req.method === "GET") {
    const rows = await sql`
      SELECT id, email, role, "createdAt"
      FROM "User"
      ORDER BY "createdAt" DESC
      LIMIT 500
    `;
    return res.json({ users: rows });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
