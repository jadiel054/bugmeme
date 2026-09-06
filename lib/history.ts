import type { SavedMeme } from "./prefs";

const HISTORY_KEY = "bugmeme-history";
const MAX = 40;

export function loadHistory(): SavedMeme[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function pushHistory(item: SavedMeme) {
  if (typeof window === "undefined") return;
  const list = loadHistory().filter((h) => h.id !== item.id);
  const next = [item, ...list].slice(0, MAX);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}
