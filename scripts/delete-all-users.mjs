import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function main() {
  const rows = await sql`DELETE FROM "User" RETURNING id, email`;
  console.log("🗑 Deleted users:", rows);
}
main().catch(e => { console.error(e); process.exit(1); });
