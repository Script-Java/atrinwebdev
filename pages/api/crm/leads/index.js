import { neon } from "@neondatabase/serverless";
import { getToken } from "next-auth/jwt";

const sql = neon(process.env.DATABASE_URL);

// Ensure table exists (runs once per cold start)
async function ensureLeadTable() {
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
  await sql`
    CREATE TABLE IF NOT EXISTS "Lead" (
      id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email        text,
      name         text,
      phone        text,
      source       text,
      status       text NOT NULL DEFAULT 'new',
      notes        text,
      ownerUserId  uuid,
      "createdAt"  timestamptz NOT NULL DEFAULT now(),
      "updatedAt"  timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS lead_email_idx ON "Lead"(lower(email))`;
}
ensureLeadTable().catch(() => {}); // don’t crash if this fails

export default async function handler(req, res) {
  // Ensure user is logged in
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  // 👉 Optional: restrict to admins only
  // if (token.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  if (req.method === "POST") {
    try {
      const {
        name = "",
        email = "",
        phone = "",
        source = "",
        notes = "",
      } = req.body || {};

      if (!name && !email && !phone) {
        return res
          .status(400)
          .json({ error: "Provide at least a name, email, or phone" });
      }

      const cleanedEmail = email ? String(email).trim().toLowerCase() : null;
      const cleanedPhone = phone ? String(phone).replace(/[^\d+]/g, "") : null;

      const rows = await sql`
        INSERT INTO "Lead"(name, email, phone, source, notes, ownerUserId)
        VALUES (${name || null}, ${cleanedEmail}, ${cleanedPhone}, ${source || null}, ${notes || null}, ${token.sub || null})
        RETURNING id, name, email, phone, source, status, notes, "createdAt"
      `;

      return res.status(201).json({ lead: rows[0] });
    } catch (e) {
      console.error("POST /api/crm/leads failed:", e);
      return res.status(500).json({ error: "Failed to create lead" });
    }
  }

  if (req.method === "GET") {
    try {
      const q = (req.query.q || "").toString().trim().toLowerCase();
      const where = q
        ? sql`WHERE lower(coalesce(name,'')) LIKE ${"%" + q + "%"}
               OR lower(coalesce(email,'')) LIKE ${"%" + q + "%"}
               OR coalesce(phone,'') LIKE ${"%" + q + "%"}`
        : sql``;

      const rows = await sql`
        SELECT id, name, email, phone, source, status, notes, "createdAt"
        FROM "Lead"
        ${where}
        ORDER BY "createdAt" DESC
        LIMIT 200
      `;
      return res.json({ leads: rows });
    } catch (e) {
      console.error("GET /api/crm/leads failed:", e);
      return res.status(500).json({ error: "Failed to fetch leads" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
