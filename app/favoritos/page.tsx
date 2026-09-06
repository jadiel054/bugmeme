"use client";

import { useEffect, useState } from "react";
import { loadFavorites, saveFavorites, type SavedMeme } from "@/lib/prefs";
import { loadHistory, clearHistory } from "@/lib/history";
import { UNIVERSES } from "@/lib/universes";
import { Heart, Trash2, Clock, Eraser } from "lucide-react";

export default function FavoritosPage() {
  const [tab, setTab] = useState<"fav" | "hist">("fav");
  const [list, setList] = useState<SavedMeme[]>([]);
  const [history, setHistory] = useState<SavedMeme[]>([]);

  useEffect(() => {
    setList(loadFavorites());
    setHistory(loadHistory());
  }, []);

  const remove = (id: string) => {
    const next = list.filter((f) => f.id !== id);
    setList(next);
    saveFavorites(next);
  };

  const wipeHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const renderItem = (item: SavedMeme, onRemove?: () => void) => {
    const universe = UNIVERSES.find((u) => u.id === item.universeId);
    return (
      <div key={item.id} className="rounded-2xl border border-white/10 bg-[#12131b] p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] text-zinc-500 mb-1">
              {universe?.emoji} {universe?.name} • {item.statusEmoji} {item.statusLabel}
            </div>
            <div className="font-display font-bold text-[15px] text-white leading-snug">
              {item.situacao}
            </div>
            <div className="mt-1 text-[13px] text-zinc-400 italic">"{item.desculpa}"</div>
          </div>
          {onRemove && (
            <button
              onClick={onRemove}
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center shrink-0"
            >
              <Trash2 className="w-4 h-4 text-zinc-400" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#07070b] text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#07070b]/95 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-display font-bold text-[17px]">Salvos</h1>
          {tab === "hist" && history.length > 0 && (
            <button
              onClick={wipeHistory}
              className="text-[12px] text-zinc-400 flex items-center gap-1"
            >
              <Eraser className="w-3.5 h-3.5" /> Limpar
            </button>
          )}
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-4 pb-28">
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setTab("fav")}
            className={`flex-1 h-10 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 ${
              tab === "fav" ? "bg-white text-black" : "bg-white/5 text-zinc-400 border border-white/10"
            }`}
          >
            <Heart className="w-3.5 h-3.5" /> Favoritos
          </button>
          <button
            onClick={() => setTab("hist")}
            className={`flex-1 h-10 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 ${
              tab === "hist" ? "bg-white text-black" : "bg-white/5 text-zinc-400 border border-white/10"
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> Histórico
          </button>
        </div>

        {tab === "fav" &&
          (list.length === 0 ? (
            <Empty icon={<Heart className="w-8 h-8 text-zinc-600 mx-auto mb-3" />} text="Nenhum favorito ainda. Gere um meme e toque em Salvar." />
          ) : (
            <div className="space-y-3">{list.map((item) => renderItem(item, () => remove(item.id)))}</div>
          ))}

        {tab === "hist" &&
          (history.length === 0 ? (
            <Empty icon={<Clock className="w-8 h-8 text-zinc-600 mx-auto mb-3" />} text="Seu histórico de gerações aparece aqui." />
          ) : (
            <div className="space-y-3">{history.map((item) => renderItem(item))}</div>
          ))}
      </main>
    </div>
  );
}

function Empty({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
      {icon}
      <p className="text-[14px] text-zinc-400">{text}</p>
    </div>
  );
}
