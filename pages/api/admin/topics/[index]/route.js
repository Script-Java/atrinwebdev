// src/app/api/admin/topics/[index]/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { deleteTopic, moveTopic, getTopics } from "@/lib/topics";

function noCache(resp) {
  resp.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  resp.headers.set("Pragma", "no-cache");
  resp.headers.set("Expires", "0");
  return resp;
}

export async function OPTIONS() {
  const resp = new NextResponse(null, { status: 200 });
  resp.headers.set("Access-Control-Allow-Methods", "DELETE,PUT,OPTIONS");
  resp.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return noCache(resp);
}

export async function DELETE(req, { params }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") {
    return noCache(NextResponse.json({ error: "Forbidden" }, { status: 403 }));
  }

  const idx = Number(params.index);
  if (!Number.isInteger(idx) || idx < 0) {
    return noCache(NextResponse.json({ error: "Invalid index" }, { status: 400 }));
  }

  const r = await deleteTopic(idx);
  if (!r?.ok) {
    return noCache(NextResponse.json({ error: r?.error || "Delete failed" }, { status: 400 }));
  }

  const topics = await getTopics();
  return noCache(NextResponse.json({ ok: true, topics }, { status: 200 }));
}

export async function PUT(req, { params }) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") {
    return noCache(NextResponse.json({ error: "Forbidden" }, { status: 403 }));
  }

  const from = Number(params.index);
  if (!Number.isInteger(from) || from < 0) {
    return noCache(NextResponse.json({ error: "Invalid index" }, { status: 400 }));
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return noCache(NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }));
  }

  const to = Number(body?.toIndex);
  if (!Number.isInteger(to) || to < 0) {
    return noCache(NextResponse.json({ error: "Invalid toIndex" }, { status: 400 }));
  }

  const r = await moveTopic(from, to);
  if (!r?.ok) {
    return noCache(NextResponse.json({ error: r?.error || "Move failed" }, { status: 400 }));
  }

  const topics = await getTopics();
  return noCache(NextResponse.json({ ok: true, topics }, { status: 200 }));
}
