"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { UNIVERSES } from "@/lib/universes";
import { Sparkles, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#07070b] text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#07070b]/90 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="font-display font-bold text-[17px] tracking-tight">BugMeme</span>
          </div>
          <div className="text-[11px] text-zinc-500 tracking-wide">v3.0</div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-6 pb-24">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-[28px] leading-[1.15] tracking-tight">
            Escolha o universo
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-yellow-200 bg-clip-text text-transparent">
              do caos
            </span>
          </h1>
          <p className="mt-2 text-[14px] text-zinc-400 leading-relaxed">
            Desculpas absurdas + status caótico. Toque em um universo para começar.
          </p>
        </div>

        {/* Universe grid */}
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
                className="block group relative overflow-hidden rounded-2xl border border-white/10 bg-[#12131b] p-4 active:scale-[0.97] transition-transform"
              >
                {/* Soft glow */}
                <div
                  className={`absolute -right-6 -top-6 w-20 h-20 rounded-full bg-gradient-to-br ${u.accent} opacity-20 blur-2xl group-hover:opacity-35 transition-opacity`}
                />

                <div className="relative">
                  <div className="text-[28px] mb-3">{u.emoji}</div>
                  <div className="font-display font-bold text-[15px] text-white leading-tight">
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

        {/* Custom CTA */}
        <div className="mt-6">
          <Link
            href="/custom"
            className="flex items-center gap-3 w-full rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-4 active:scale-[0.98] transition"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-300" />
            </div>
            <div className="flex-1">
              <div className="font-display font-bold text-[14px] text-white">Modo Personalizado</div>
              <div className="text-[12px] text-zinc-500">Digite um contexto e gere várias opções</div>
            </div>
          </Link>
        </div>

        <p className="mt-10 text-center text-[11px] text-zinc-600">
          feito com ódio de deploy na sexta
        </p>
      </main>
    </div>
  );
}
