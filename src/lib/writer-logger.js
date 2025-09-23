import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

export async function createRun() {
  const rows = await sql`INSERT INTO "WriterRun"(status) VALUES ('running') RETURNING id`;
  return rows[0].id;
}

export async function finishRun(runId, status, payload = {}) {
  const { slug = null, path = null, image = null, error = null } = payload;
  await sql`
    UPDATE "WriterRun"
    SET status = ${status}, slug = ${slug}, path = ${path}, image = ${image},
        error = ${error}, "finishedAt" = now()
    WHERE id = ${runId}
  `;
}

export async function logLine(runId, level, step, message, meta = null) {
  await sql`
    INSERT INTO "WriterLog"(runId, level, step, message, meta)
    VALUES (${runId}, ${level}, ${step}, ${message}, ${meta})
  `;
}

// Small convenience that also collects logs locally (for returning in API)
export function makeLogger(runId) {
  const buffer = [];
  const push = async (level, step, message, meta) => {
    buffer.push({ ts: new Date().toISOString(), level, step, message, meta });
    try { await logLine(runId, level, step, message, meta); } catch {}
  };
  return {
    buffer,
    info: (step, message, meta) => push("info", step, message, meta),
    warn: (step, message, meta) => push("warn", step, message, meta),
    error: (step, message, meta) => push("error", step, message, meta),
  };
}
