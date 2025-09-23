import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const sql = neon(process.env.DATABASE_URL);

async function main() {
  const email = "test@atrinwebdev.com";
  const password = "Test123!";
  const role = "admin";

  const passwordHash = await bcrypt.hash(password, 12);

  const rows = await sql`
    INSERT INTO "User"(email, "passwordHash", role)
    VALUES (${email.toLowerCase()}, ${passwordHash}, ${role})
    ON CONFLICT (email)
    DO UPDATE SET "passwordHash" = EXCLUDED."passwordHash", role = EXCLUDED.role, "updatedAt" = now()
    RETURNING id, email, role, "createdAt"
  `;

  console.log("✅ Test user created:", rows[0]);
  console.log("Login with:");
  console.log("  Email:    ", email);
  console.log("  Password: ", password);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
