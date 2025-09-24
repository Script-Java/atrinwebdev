// src/lib/db.js
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required (include sslmode=require for Neon).");
}

export const sql = neon(process.env.DATABASE_URL);
