import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { hasDatabase, getDb } from "@/lib/db";
import { generatedMemes } from "@/lib/db/schema";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  if (!hasDatabase()) {
    return NextResponse.json(
      { ok: false, reason: "database_not_configured" },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const {
      publicCode,
      universeId,
      situacao,
      desculpa,
      respostaIa,
      statusLabel,
      statusEmoji,
      emotion,
      deviceId,
    } = body;

    if (!publicCode || !universeId || !situacao || !desculpa || !respostaIa || !statusLabel) {
      return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
    }

    const db = getDb();
    await db.insert(generatedMemes).values({
      publicCode: String(publicCode).slice(0, 16),
      universeId: String(universeId).slice(0, 32),
      situacao: String(situacao).slice(0, 500),
      desculpa: String(desculpa).slice(0, 500),
      respostaIa: String(respostaIa).slice(0, 800),
      statusLabel: String(statusLabel).slice(0, 64),
      statusEmoji: statusEmoji ? String(statusEmoji).slice(0, 16) : null,
      emotion: emotion ? String(emotion).slice(0, 32) : null,
      deviceId: deviceId ? String(deviceId).slice(0, 64) : null,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, reason: e instanceof Error ? e.message : "error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  if (!hasDatabase()) {
    return NextResponse.json({ ok: false, items: [], reason: "database_not_configured" });
  }

  try {
    const limit = Math.min(Number(req.nextUrl.searchParams.get("limit") || 20), 50);
    const db = getDb();
    const items = await db
      .select()
      .from(generatedMemes)
      .orderBy(desc(generatedMemes.createdAt))
      .limit(limit);

    return NextResponse.json({ ok: true, items });
  } catch (e) {
    return NextResponse.json(
      { ok: false, items: [], reason: e instanceof Error ? e.message : "error" },
      { status: 500 }
    );
  }
}
