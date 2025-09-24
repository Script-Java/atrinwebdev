// src/lib/topics-db.js
import { sql } from "@/lib/db";

/**
 * Uses table "TopicQueue" with columns:
 *   id BIGSERIAL PRIMARY KEY
 *   title TEXT            -- or legacy: topic TEXT
 *   position INTEGER UNIQUE NOT NULL
 *
 * This module:
 *  - Creates the table if missing (with "title")
 *  - Detects legacy "topic" column and uses it
 *  - Reorders rows without transactions using a sentinel position
 */

let TITLE_COL_CACHE = null; // "title" | "topic"

/* ---------------- helpers ---------------- */

async function ensureTable() {
  // Create with "title" if not present
  await sql/* sql */`
    CREATE TABLE IF NOT EXISTS "TopicQueue" (
      id BIGSERIAL PRIMARY KEY,
      title TEXT,
      position INTEGER NOT NULL UNIQUE
    )
  `;
  // Make sure unique index name exists (helps with consistent error msgs)
  await sql/* sql */`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_indexes
        WHERE schemaname = 'public' AND indexname = 'TopicQueue_position_key'
      ) THEN
        CREATE UNIQUE INDEX "TopicQueue_position_key" ON "TopicQueue"(position);
      END IF;
    END $$;
  `;
}

async function getTitleColumn() {
  if (TITLE_COL_CACHE) return TITLE_COL_CACHE;
  await ensureTable();

  const cols = await sql/* sql */`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'TopicQueue'
  `;
  const names = cols.map(c => c.column_name);
  if (names.includes("title")) {
    TITLE_COL_CACHE = "title";
    return "title";
  }
  if (names.includes("topic")) {
    TITLE_COL_CACHE = "topic";
    return "topic";
  }
  // Neither? add "title"
  await sql/* sql */`ALTER TABLE "TopicQueue" ADD COLUMN title TEXT`;
  TITLE_COL_CACHE = "title";
  return "title";
}

async function currentMinPosition() {
  const [{ minpos }] = await sql/* sql */`
    SELECT COALESCE(MIN(position), 0) AS minpos FROM "TopicQueue"
  `;
  return Number(minpos) || 0;
}

/* ---------------- public API ---------------- */

export async function getTopics() {
  const col = await getTitleColumn();
  const rows = col === "title"
    ? await sql/* sql */`SELECT title AS t FROM "TopicQueue" ORDER BY position ASC`
    : await sql/* sql */`SELECT topic AS t FROM "TopicQueue" ORDER BY position ASC`;
  return rows.map(r => r.t);
}

export async function addTopic(title) {
  const t = (title || "").trim();
  if (!t) return { ok: false, error: "Empty topic" };

  const col = await getTitleColumn();
  try {
    const [{ next }] = await sql/* sql */`
      SELECT COALESCE(MAX(position), -1) + 1 AS next FROM "TopicQueue"
    `;
    if (col === "title") {
      await sql/* sql */`
        INSERT INTO "TopicQueue"(title, position) VALUES (${t}, ${next})
      `;
    } else {
      await sql/* sql */`
        INSERT INTO "TopicQueue"(topic, position) VALUES (${t}, ${next})
      `;
    }
    return { ok: true };
  } catch (e) {
    console.error("addTopic error:", e);
    return { ok: false, error: "Insert failed" };
  }
}

export async function deleteTopic(index) {
  const i = Number(index);
  if (!Number.isInteger(i) || i < 0) return { ok: false, error: "Bad index" };

  try {
    // Get the row by 0-based index
    const rows = await sql/* sql */`
      SELECT id, position
      FROM "TopicQueue"
      ORDER BY position ASC
      LIMIT 1 OFFSET ${i}
    `;
    if (rows.length === 0) return { ok: false, error: "Out of range" };

    const { id, position } = rows[0];
    await sql/* sql */`DELETE FROM "TopicQueue" WHERE id = ${id}`;
    await sql/* sql */`
      UPDATE "TopicQueue" SET position = position - 1
      WHERE position > ${position}
    `;
    return { ok: true };
  } catch (e) {
    console.error("deleteTopic error:", e);
    return { ok: false, error: e?.message || "Delete failed" };
  }
}

export async function moveTopic(fromIndex, toIndex) {
  const from = Number(fromIndex);
  const to = Number(toIndex);
  if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to < 0) {
    return { ok: false, error: "Bad index" };
  }

  try {
    // Load ordered map of id+position to translate 0-based indices
    const ordered = await sql/* sql */`
      SELECT id, position
      FROM "TopicQueue"
      ORDER BY position ASC
    `;
    if (from >= ordered.length || to >= ordered.length) {
      return { ok: false, error: "Out of range" };
    }

    const moving = ordered[from];
    const target  = ordered[to];
    const fromPos = moving.position;
    const toPos   = target.position;
    if (fromPos === toPos) return { ok: true };

    // Choose a unique sentinel away from current positions
    const minpos = await currentMinPosition();
    const SENTINEL = minpos - 1_000_000; // very negative, guaranteed unique

    // 1) Park the moving row
    await sql/* sql */`
      UPDATE "TopicQueue"
      SET position = ${SENTINEL}
      WHERE id = ${moving.id}
    `;

    // 2) Shift neighbors to open target slot
    if (fromPos < toPos) {
      // moving down: neighbors shift up (-1)
      await sql/* sql */`
        UPDATE "TopicQueue"
        SET position = position - 1
        WHERE position > ${fromPos} AND position <= ${toPos}
      `;
    } else {
      // moving up: neighbors shift down (+1)
      await sql/* sql */`
        UPDATE "TopicQueue"
        SET position = position + 1
        WHERE position >= ${toPos} AND position < ${fromPos}
      `;
    }

    // 3) Drop the moving row into the target slot
    await sql/* sql */`
      UPDATE "TopicQueue"
      SET position = ${toPos}
      WHERE id = ${moving.id}
    `;

    return { ok: true };
  } catch (e) {
    console.error("moveTopic error:", e);
    return { ok: false, error: e?.code === "23505" ? "Reorder conflict" : (e?.message || "Move failed") };
  }
}
