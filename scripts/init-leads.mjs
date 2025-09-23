// scripts/init-leads.mjs
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL); // use DIRECT Neon URL with ?sslmode=require

async function main() {
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
  console.log('✅ Lead table ready');
}
main().catch(e => { console.error(e); process.exit(1); });
