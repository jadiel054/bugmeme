import { NextResponse } from "next/server";
import { hasDatabase, getDb } from "@/lib/db";
import { sql } from "drizzle-orm";

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

  if (!hasDatabase()) {
    return NextResponse.json(payload);
  }

  try {
    const db = getDb();
    await db.execute(sql`select 1 as ok`);
    payload.database = "connected";
  } catch (e) {
    payload.ok = false;
    payload.database = "error";
    payload.detail = e instanceof Error ? e.message : "unknown";
  }

  return NextResponse.json(payload);
}
