"use client";

import { useEffect, useState } from "react";
import { loadFavorites, saveFavorites, type SavedMeme } from "@/lib/prefs";
import { UNIVERSES } from "@/lib/universes";
import { Heart, Trash2 } from "lucide-react";

export default function FavoritosPage() {
  const [list, setList] = useState<SavedMeme[]>([]);

  useEffect(() => {
    setList(loadFavorites());
  }, []);

  const remove = (id: string) => {
    const next = list.filter((f) => f.id !== id);
    setList(next);
    saveFavorites(next);
  };

  return (
    <div className="min-h-screen bg-[#07070b] text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#07070b]/95 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <h1 className="font-display font-bold text-[17px]">Favoritos</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-5 pb-28">
        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
            <Heart className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <p className="text-[14px] text-zinc-400">
              Nenhum meme salvo ainda. Gere um e toque em favoritar.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {list.map((item) => {
              const universe = UNIVERSES.find((u) => u.id === item.universeId);
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-[#12131b] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[11px] text-zinc-500 mb-1">
                        {universe?.emoji} {universe?.name} • {item.statusEmoji} {item.statusLabel}
                      </div>
                      <div className="font-display font-bold text-[15px] text-white leading-snug">
                        {item.situacao}
                      </div>
                      <div className="mt-1 text-[13px] text-zinc-400 italic">
                        "{item.desculpa}"
                      </div>
                    </div>
                    <button
                      onClick={() => remove(item.id)}
                      className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center shrink-0"
                    >
                      <Trash2 className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
