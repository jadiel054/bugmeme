"use client";

import { useEffect, useState } from "react";
import { loadPrefs, savePrefs, defaultPrefs, type Prefs } from "@/lib/prefs";
import { Volume2, VolumeX, Accessibility, Info } from "lucide-react";

export default function ConfigPage() {
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);

  useEffect(() => {
    setPrefs(loadPrefs());
  }, []);

  const update = (partial: Partial<Prefs>) => {
    const next = { ...prefs, ...partial };
    setPrefs(next);
    savePrefs(next);
  };

  return (
    <div className="min-h-screen bg-[#07070b] text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#07070b]/95 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <h1 className="font-display font-bold text-[17px]">Ajustes</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 pb-28 space-y-4">
        <section className="rounded-2xl border border-white/10 bg-[#12131b] overflow-hidden">
          <button
            onClick={() => update({ sound: !prefs.sound })}
            className="w-full flex items-center justify-between px-4 py-4 border-b border-white/5"
          >
            <div className="flex items-center gap-3">
              {prefs.sound ? (
                <Volume2 className="w-5 h-5 text-cyan-300" />
              ) : (
                <VolumeX className="w-5 h-5 text-zinc-500" />
              )}
              <div className="text-left">
                <div className="text-[14px] font-medium">Som</div>
                <div className="text-[12px] text-zinc-500">Efeitos ao gerar e clicar</div>
              </div>
            </div>
            <div
              className={`w-11 h-6 rounded-full relative transition ${
                prefs.sound ? "bg-cyan-400" : "bg-zinc-700"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition ${
                  prefs.sound ? "left-5" : "left-0.5"
                }`}
              />
            </div>
          </button>

          <button
            onClick={() => update({ reduceMotion: !prefs.reduceMotion })}
            className="w-full flex items-center justify-between px-4 py-4"
          >
            <div className="flex items-center gap-3">
              <Accessibility className="w-5 h-5 text-fuchsia-300" />
              <div className="text-left">
                <div className="text-[14px] font-medium">Reduzir movimento</div>
                <div className="text-[12px] text-zinc-500">Menos animações e efeitos</div>
              </div>
            </div>
            <div
              className={`w-11 h-6 rounded-full relative transition ${
                prefs.reduceMotion ? "bg-cyan-400" : "bg-zinc-700"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition ${
                  prefs.reduceMotion ? "left-5" : "left-0.5"
                }`}
              />
            </div>
          </button>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#12131b] p-4">
          <div className="flex items-center gap-2 text-[13px] text-zinc-400 mb-2">
            <Info className="w-4 h-4" /> Sobre
          </div>
          <p className="text-[13px] text-zinc-500 leading-relaxed">
            BugMeme v3 — gerador de memes e desculpas absurdas. Conta, login e geração com IA
            real entram nas próximas versões. Favoritos e ajustes ficam salvos neste aparelho.
          </p>
        </section>
      </main>
    </div>
  );
}
