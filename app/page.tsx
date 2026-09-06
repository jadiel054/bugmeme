"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { UNIVERSES } from "@/lib/universes";
import { Sparkles, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#07070b] text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#07070b]/90 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="font-display font-bold text-[17px] tracking-tight">BugMeme</span>
          </div>
          <div className="text-[11px] text-zinc-500 tracking-wide">v3.1</div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 pb-24">
        <div className="mb-7">
          <p className="text-[11px] tracking-[0.2em] text-zinc-500 mb-2">GERADOR DE DESCULPAS</p>
          <h1 className="font-display font-bold text-[30px] leading-[1.1] tracking-tight">
            O caos do dia a dia,
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-200 bg-clip-text text-transparent">
              em formato de meme
            </span>
          </h1>
          <p className="mt-3 text-[14px] text-zinc-400 leading-relaxed">
            Oito universos. Desculpas absurdas. Status caótico. Pronto pra compartilhar.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {UNIVERSES.map((u, i) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <Link
                href={`/u/${u.id}`}
                className="block group relative overflow-hidden rounded-2xl border border-white/10 bg-[#12131b] p-4 min-h-[128px] active:scale-[0.97] transition-transform"
              >
                <div
                  className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${u.accent} opacity-25 blur-2xl group-active:opacity-40 transition-opacity`}
                />
                <div className="relative h-full flex flex-col">
                  <div className="text-[30px] mb-2">{u.emoji}</div>
                  <div className="font-display font-bold text-[15px] text-white leading-tight mt-auto">
                    {u.name}
                  </div>
                  <div className="mt-1 text-[11px] text-zinc-500 leading-snug line-clamp-2">
                    {u.description}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-5">
          <Link
            href="/custom"
            className="flex items-center gap-3 w-full rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 px-4 py-4 active:scale-[0.98] transition"
          >
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </div>
            <div className="flex-1">
              <div className="font-display font-bold text-[14px] text-white">Modo Personalizado</div>
              <div className="text-[12px] text-zinc-400">Digite um contexto e escolha entre 6 opções</div>
            </div>
          </Link>
        </div>

        <p className="mt-10 text-center text-[11px] text-zinc-600">
          feito com ódio de deploy na sexta · multi-universo
        </p>
      </main>
    </div>
  );
}
