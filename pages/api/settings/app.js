import { neon } from "@neondatabase/serverless";
import { getToken } from "next-auth/jwt";
const sql = neon(process.env.DATABASE_URL);

// Minimal key/value table (JSONB)
async function ensureSettingsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS "AppSetting" (
      key text PRIMARY KEY,
      value jsonb NOT NULL,
      "updatedAt" timestamptz NOT NULL DEFAULT now()
    )
  `;
}
ensureSettingsTable().catch(() => {});

export default async function handler(req, res) {
  // 🚫 no-cache for admin API
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  // Optional: limit to admin
  // if (token.role !== "admin") return res.status(403).json({ error: "Forbidden" });

  if (req.method === "GET") {
    await ensureSettingsTable();
    const rows = await sql`SELECT value FROM "AppSetting" WHERE key = 'app'`;
    const value = rows[0]?.value || {};
    return res.json({ settings: value });
  }

  if (req.method === "PUT") {
    await ensureSettingsTable();
    const body = req.body || {};
    // Only allow specific keys
    const clean = {
      company_name: body.company_name || "",
      theme: body.theme || "light",
    };
    await sql`
      INSERT INTO "AppSetting"(key, value)
      VALUES ('app', ${clean})
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value, "updatedAt" = now()
    `;
    return res.json({ settings: clean });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
