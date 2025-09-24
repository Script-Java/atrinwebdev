// src/app/api/admin/topics/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getTopics, addTopic } from "@/lib/topics";

function noCache(resp) {
  resp.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  resp.headers.set("Pragma", "no-cache");
  resp.headers.set("Expires", "0");
  return resp;
}

export async function OPTIONS() {
  const resp = new NextResponse(null, { status: 200 });
  resp.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  resp.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return noCache(resp);
}

export async function GET(req) {
  // Auth (admin)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") {
    return noCache(NextResponse.json({ error: "Forbidden" }, { status: 403 }));
  }

  const topics = await getTopics();
  return noCache(NextResponse.json({ topics }, { status: 200 }));
}

export async function POST(req) {
  // Auth (admin)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token || token.role !== "admin") {
    return noCache(NextResponse.json({ error: "Forbidden" }, { status: 403 }));
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return noCache(NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }));
  }

  const topic = (body?.topic || "").trim();
  if (!topic) {
    return noCache(NextResponse.json({ error: "Invalid topic" }, { status: 400 }));
  }

  const r = await addTopic(topic);
  if (!r?.ok) {
    return noCache(NextResponse.json({ error: r?.error || "Failed to add" }, { status: 400 }));
  }

  const topics = await getTopics();
  return noCache(NextResponse.json({ ok: true, topics }, { status: 201 }));
}
