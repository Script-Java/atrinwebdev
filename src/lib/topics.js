// src/lib/topics.js
import { sql } from "@/lib/db";

/**
 * Returns the topics as a simple array of strings, ordered by position.
 */
export async function getTopics() {
  const rows = await sql/*sql*/`
    SELECT title
    FROM "Topic"
    ORDER BY position ASC
  `;
  return rows.map(r => r.title);
}

/**
 * Appends a new topic to the end.
 */
export async function addTopic(topic) {
  const t = (topic || "").trim();
  if (!t) return { ok: false, error: "Empty topic" };

  // Find next position (0-based)
  const [{ next_pos }] = await sql/*sql*/`
    SELECT COALESCE(MAX(position), -1) + 1 AS next_pos
    FROM "Topic"
  `;

  await sql/*sql*/`
    INSERT INTO "Topic" (title, position)
    VALUES (${t}, ${next_pos})
  `;

  return { ok: true };
}

/**
 * Deletes topic at zero-based index and compacts positions.
 */
export async function deleteTopic(index) {
  const i = Number(index);
  if (!Number.isInteger(i) || i < 0) return { ok: false, error: "Bad index" };

  return await sql.begin(async (tx) => {
    const rows = await tx/*sql*/`
      SELECT id, position
      FROM "Topic"
      ORDER BY position ASC
      OFFSET ${i} LIMIT 1
    `;
    if (rows.length === 0) return { ok: false, error: "Out of range" };

    const { id, position } = rows[0];

    await tx/*sql*/`DELETE FROM "Topic" WHERE id = ${id}`;

    // Shift everything after deleted position down by 1
    await tx/*sql*/`
      UPDATE "Topic"
      SET position = position - 1
      WHERE position > ${position}
    `;

    return { ok: true };
  });
}

/**
 * Reorders topic from index `fromIndex` to `toIndex` (zero-based).
 */
export async function moveTopic(fromIndex, toIndex) {
  const from = Number(fromIndex);
  const to = Number(toIndex);

  if (![from, to].every(Number.isInteger) || from < 0 || to < 0) {
    return { ok: false, error: "Bad index" };
  }
  if (from === to) return { ok: true };

  return await sql.begin(async (tx) => {
    // Locate the moving row
    const movingRows = await tx/*sql*/`
      SELECT id, position
      FROM "Topic"
      ORDER BY position ASC
      OFFSET ${from} LIMIT 1
    `;
    if (movingRows.length === 0) return { ok: false, error: "Out of range" };

    const { id, position: fromPos } = movingRows[0];

    // Target is "to" index; fetch its position boundary
    const targetRows = await tx/*sql*/`
      SELECT position
      FROM "Topic"
      ORDER BY position ASC
      OFFSET ${to} LIMIT 1
    `;

    // If moving beyond the end, place at tail
    let toPos;
    if (targetRows.length === 0) {
      const [{ max_pos }] = await tx/*sql*/`
        SELECT COALESCE(MAX(position), -1) AS max_pos
        FROM "Topic"
      `;
      toPos = (max_pos ?? -1) + 1;
    } else {
      toPos = targetRows[0].position;
    }

    if (fromPos < toPos) {
      // Moving down: slide block up
      await tx/*sql*/`
        UPDATE "Topic"
        SET position = position - 1
        WHERE position > ${fromPos} AND position <= ${toPos}
      `;
    } else {
      // Moving up: slide block down
      await tx/*sql*/`
        UPDATE "Topic"
        SET position = position + 1
        WHERE position >= ${toPos} AND position < ${fromPos}
      `;
    }

    // Place the moving row into the target slot
    await tx/*sql*/`
      UPDATE "Topic"
      SET position = ${toPos}
      WHERE id = ${id}
    `;

    return { ok: true };
  });
}

/**
 * Pops the first topic and compacts positions. Returns string or null.
 */
export async function getNextTopic() {
  return await sql.begin(async (tx) => {
    const rows = await tx/*sql*/`
      SELECT id, title, position
      FROM "Topic"
      ORDER BY position ASC
      LIMIT 1
    `;
    if (rows.length === 0) return null;

    const { id, title, position } = rows[0];

    await tx/*sql*/`DELETE FROM "Topic" WHERE id = ${id}`;
    await tx/*sql*/`
      UPDATE "Topic"
      SET position = position - 1
      WHERE position > ${position}
    `;

    return title;
  });
}
