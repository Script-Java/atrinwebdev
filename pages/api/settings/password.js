import { neon } from "@neondatabase/serverless";
import { getToken } from "next-auth/jwt";
import bcrypt from "bcryptjs";
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // 🚫 no-cache for admin API
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const { currentPassword = "", newPassword = "" } = req.body || {};
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Missing current or new password" });
  }

  // Get current hash
  const rows = await sql`
    SELECT "passwordHash" AS passwordhash
    FROM "User" WHERE id = ${token.sub} LIMIT 1
  `;
  const u = rows[0];
  if (!u || !u.passwordhash) return res.status(404).json({ error: "User not found" });

  // Verify current
  const ok = await bcrypt.compare(currentPassword, u.passwordhash);
  if (!ok) return res.status(400).json({ error: "Current password is incorrect" });

  // Update to new
  const newHash = await bcrypt.hash(newPassword, 12);
  await sql`UPDATE "User" SET "passwordHash" = ${newHash}, "updatedAt" = now() WHERE id = ${token.sub}`;
  return res.json({ ok: true });
}
