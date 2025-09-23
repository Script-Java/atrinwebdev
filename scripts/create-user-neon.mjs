// scripts/create-user-neon.mjs  (bcrypt version)
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const sql = neon(process.env.DATABASE_URL);

async function main() {
  let email = (process.argv[2] || "").trim().toLowerCase();
  const password = process.argv[3];
  const role = process.argv[4] || "admin";
  if (!email || !password) {
    console.error('Usage: node scripts/create-user-neon.mjs <email> <password> [role]');
    process.exit(1);
  }

  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
  await sql`CREATE TABLE IF NOT EXISTS "User"(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text UNIQUE NOT NULL,
    name text,
    "passwordHash" text NOT NULL,
    role text NOT NULL DEFAULT 'user',
    "createdAt" timestamptz NOT NULL DEFAULT now(),
    "updatedAt" timestamptz NOT NULL DEFAULT now()
  )`;

  const passwordHash = await bcrypt.hash(password, 12);
  const rows = await sql`
    INSERT INTO "User"(email, "passwordHash", role)
    VALUES (${email}, ${passwordHash}, ${role})
    ON CONFLICT (email)
    DO UPDATE SET "passwordHash" = EXCLUDED."passwordHash", role = EXCLUDED.role, "updatedAt" = now()
    RETURNING id, email, role, "createdAt"
  `;
  console.log('✅ User ready:', rows[0]);
}
main().catch(e => { console.error(e); process.exit(1); });
