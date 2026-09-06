import type { Meme } from "./universes";

const DEVICE_KEY = "bugmeme-device-id";

export function getDeviceId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

/** Fire-and-forget: grava meme no backend se estiver configurado */
export function logMemeToServer(meme: Meme, emotion?: string | null) {
  if (typeof window === "undefined") return;
  const body = {
    publicCode: meme.id,
    universeId: meme.universeId,
    situacao: meme.situacao,
    desculpa: meme.desculpa,
    respostaIa: meme.respostaIA,
    statusLabel: meme.status.label,
    statusEmoji: meme.status.emoji,
    emotion: emotion || null,
    deviceId: getDeviceId() || null,
  };
  fetch("/api/memes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch(() => {
    /* silencioso: app funciona offline do backend */
  });
}
