// src/lib/db.js
import { neon, neonConfig } from "@neondatabase/serverless";

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// Keep a single HTTP connection warm across invocations
neonConfig.fetchConnectionCache = true;

// Tagged template fn: use as sql`SELECT 1`
export const sql = neon(DATABASE_URL);
