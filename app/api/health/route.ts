import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "edge";

export async function GET() {
  const payload: {
    ok: boolean;
    app: string;
    database: "connected" | "not_configured" | "error";
    detail?: string;
  } = {
    ok: true,
    app: "bugmeme",
    database: "not_configured",
  };

  const url = process.env.DATABASE_URL;
  if (!url) {
    return NextResponse.json(payload);
  }

  try {
    const sql = neon(url);
    await sql`select 1 as ok`;
    payload.database = "connected";
  } catch (e) {
    payload.ok = false;
    payload.database = "error";
    payload.detail = e instanceof Error ? e.message : "unknown";
  }

  return NextResponse.json(payload);
}
