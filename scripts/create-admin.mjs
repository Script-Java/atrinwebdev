import "dotenv/config";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  if (!email || !password) {
    console.error("Usage: node scripts/create-admin.mjs <email> <password>");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);

  const rows = await sql`
    INSERT INTO "User"(email, "passwordHash", role)
    VALUES (${email.toLowerCase()}, ${hash}, 'admin')
    ON CONFLICT (email) DO UPDATE
      SET "passwordHash" = EXCLUDED."passwordHash",
          role = 'admin'
    RETURNING id, email, role, "createdAt"
  `;

  console.log("✅ Admin user ready:", rows[0]);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
