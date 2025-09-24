// src/lib/topics.js
import { neon } from "@neondatabase/serverless";

// DATABASE_URL must include sslmode=require on Neon
const sql = neon(process.env.DATABASE_URL);

// return topics ordered by position asc
export async function getTopics() {
  const rows = await sql/*sql*/`select id, title, position from "Topic" order by position asc`;
  return rows.map(r => r.title);
}

export async function addTopic(topic) {
  const t = (topic || "").trim();
  if (!t) return { ok: false, error: "Empty topic" };
  const [{ max }] = await sql/*sql*/`select coalesce(max(position), -1) as max from "Topic"`;
  const nextPos = (max ?? -1) + 1;
  await sql/*sql*/`insert into "Topic"(title, position) values (${t}, ${nextPos})`;
  return { ok: true };
}

export async function deleteTopic(index) {
  const i = Number(index);
  if (!Number.isInteger(i) || i < 0) return { ok: false, error: "Bad index" };

  // find id at that position
  const rows = await sql/*sql*/`select id from "Topic" where position = ${i}`;
  if (rows.length === 0) return { ok: false, error: "Out of range" };

  const id = rows[0].id;

  // delete it
  await sql/*sql*/`delete from "Topic" where id = ${id}`;

  // shift down positions above i
  await sql/*sql*/`
    update "Topic"
       set position = position - 1
     where position > ${i};
  `;
  return { ok: true };
}

export async function moveTopic(fromIndex, toIndex) {
  const from = Number(fromIndex);
  const to = Number(toIndex);
  if (![from, to].every(Number.isInteger) || from < 0 || to < 0) {
    return { ok: false, error: "Bad index" };
  }
  if (from === to) return { ok: true };

  // grab id of the item at `from`
  const rows = await sql/*sql*/`select id from "Topic" where position = ${from}`;
  if (rows.length === 0) return { ok: false, error: "Out of range" };
  const id = rows[0].id;

  // make room at `to` then plug `id` there
  if (to > from) {
    await sql/*sql*/`
      update "Topic"
         set position = position - 1
       where position > ${from} and position <= ${to};
    `;
  } else {
    await sql/*sql*/`
      update "Topic"
         set position = position + 1
       where position >= ${to} and position < ${from};
    `;
  }
  await sql/*sql*/`update "Topic" set position = ${to} where id = ${id}`;
  return { ok: true };
}

// Pop first topic (position 0) and renumber others.
// Returns the consumed title or null.
export async function getNextTopic() {
  const first = await sql/*sql*/`select id, title from "Topic" where position = 0`;
  if (first.length === 0) return null;
  const { id, title } = first[0];

  // delete it
  await sql/*sql*/`delete from "Topic" where id = ${id}`;
  // shift all remaining down by 1
  await sql/*sql*/`update "Topic" set position = position - 1`;
  return title;
}
