export type Prefs = {
  sound: boolean;
  reduceMotion: boolean;
};

const PREFS_KEY = "bugmeme-prefs";
const FAV_KEY = "bugmeme-favorites";

export const defaultPrefs: Prefs = {
  sound: true,
  reduceMotion: false,
};

export function loadPrefs(): Prefs {
  if (typeof window === "undefined") return defaultPrefs;
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return defaultPrefs;
    return { ...defaultPrefs, ...JSON.parse(raw) };
  } catch {
    return defaultPrefs;
  }
}

export function savePrefs(prefs: Prefs) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

export type SavedMeme = {
  id: string;
  universeId: string;
  situacao: string;
  desculpa: string;
  respostaIA: string;
  statusLabel: string;
  statusEmoji: string;
  savedAt: number;
};

export function loadFavorites(): SavedMeme[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(list: SavedMeme[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(FAV_KEY, JSON.stringify(list.slice(0, 50)));
}

export function toggleFavorite(item: SavedMeme): SavedMeme[] {
  const list = loadFavorites();
  const exists = list.some((f) => f.id === item.id);
  const next = exists ? list.filter((f) => f.id !== item.id) : [item, ...list];
  saveFavorites(next);
  return next;
}

export function isFavorite(id: string): boolean {
  return loadFavorites().some((f) => f.id === id);
}
