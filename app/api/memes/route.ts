import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const runtime = "edge";

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

export async function POST(req: NextRequest) {
  const sql = getSql();
  if (!sql) {
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

    await sql`
      INSERT INTO generated_memes (
        public_code, universe_id, situacao, desculpa, resposta_ia,
        status_label, status_emoji, emotion, device_id
      ) VALUES (
        ${String(publicCode).slice(0, 16)},
        ${String(universeId).slice(0, 32)},
        ${String(situacao).slice(0, 500)},
        ${String(desculpa).slice(0, 500)},
        ${String(respostaIa).slice(0, 800)},
        ${String(statusLabel).slice(0, 64)},
        ${statusEmoji ? String(statusEmoji).slice(0, 16) : null},
        ${emotion ? String(emotion).slice(0, 32) : null},
        ${deviceId ? String(deviceId).slice(0, 64) : null}
      )
    `;

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, reason: e instanceof Error ? e.message : "error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const sql = getSql();
  if (!sql) {
    return NextResponse.json({ ok: false, items: [], reason: "database_not_configured" });
  }

  try {
    const limit = Math.min(Number(req.nextUrl.searchParams.get("limit") || 20), 50);
    const items = await sql`
      SELECT
        id,
        public_code as "publicCode",
        universe_id as "universeId",
        situacao,
        desculpa,
        resposta_ia as "respostaIa",
        status_label as "statusLabel",
        status_emoji as "statusEmoji",
        emotion,
        device_id as "deviceId",
        created_at as "createdAt"
      FROM generated_memes
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;

    return NextResponse.json({ ok: true, items });
  } catch (e) {
    return NextResponse.json(
      { ok: false, items: [], reason: e instanceof Error ? e.message : "error" },
      { status: 500 }
    );
  }
}
