// pages/api/crm/leads/[id].js
import { neon } from "@neondatabase/serverless";
import { getToken } from "next-auth/jwt";

const sql = neon(process.env.DATABASE_URL);

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
}

export default async function handler(req, res) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Missing id" });

  if (req.method === "PUT") {
    try {
      await ensureLeadTable();
      const body = req.body || {};
      const name = body.name ?? null;
      const email = body.email ? String(body.email).trim().toLowerCase() : null;
      const phone = body.phone ? String(body.phone).replace(/[^\d+]/g, "") : null;
      const source = body.source ?? null;
      const status = body.status ?? null; // 'new'|'contacted'|'qualified'|'lost'|'won'
      const notes = body.notes ?? null;

      const rows = await sql`
        UPDATE "Lead"
        SET
          name = ${name},
          email = ${email},
          phone = ${phone},
          source = ${source},
          status = COALESCE(${status}, status),
          notes = ${notes},
          "updatedAt" = now()
        WHERE id = ${id}
        RETURNING id, name, email, phone, source, status, notes, "createdAt"
      `;
      if (!rows.length) return res.status(404).json({ error: "Lead not found" });
      return res.json({ lead: rows[0] });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Failed to update lead" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await ensureLeadTable();
      const rows = await sql`DELETE FROM "Lead" WHERE id = ${id} RETURNING id`;
      if (!rows.length) return res.status(404).json({ error: "Lead not found" });
      return res.json({ ok: true });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Failed to delete lead" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
