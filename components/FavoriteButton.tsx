"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { isFavorite, toggleFavorite, type SavedMeme } from "@/lib/prefs";

export default function FavoriteButton({ item }: { item: SavedMeme }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isFavorite(item.id));
  }, [item.id]);

  return (
    <button
      onClick={() => {
        const next = toggleFavorite(item);
        setActive(next.some((f) => f.id === item.id));
      }}
      className="h-11 rounded-xl bg-[#1d1f2d] border border-white/10 text-zinc-200 text-[12px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition"
    >
      <Heart className={`w-3.5 h-3.5 ${active ? "fill-pink-400 text-pink-400" : ""}`} />
      {active ? "Salvo" : "Salvar"}
    </button>
  );
}
