// src/app/actions.js
"use server";
import { neon } from "@neondatabase/serverless";

// Create a single client instance per module (good enough for server actions)
const sql = neon(process.env.DATABASE_URL);

// Simple health check
export async function pingDb() {
  const rows = await sql`select 1 as ok`;
  return rows[0]?.ok === 1;
}

// Example: read a user (matches Prisma "User" model naming)
export async function getUserByEmail(email) {
  const rows = await sql`
    select id, email, name, role
    from "User"
    where email = ${email}
    limit 1
  `;
  return rows[0] ?? null;
}

// Example: create a user (hash the password elsewhere, pass hash here)
export async function createUser({ email, name, role = "user", passwordHash }) {
  const rows = await sql`
    insert into "User" (email, name, role, "passwordHash")
    values (${email}, ${name}, ${role}, ${passwordHash})
    returning id, email, name, role
  `;
  return rows[0];
}

export async function getData() {
  const data = await sql`select now() as time`;
  return data[0];
}
