"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Copy,
  Share2,
  Download,
  RefreshCw,
  TriangleAlert,
  Skull,
} from "lucide-react";
import {
  UNIVERSES,
  generateCustomOptions,
  type Meme,
  type UniverseId,
} from "@/lib/universes";
import { toPng } from "html-to-image";

export default function CustomPage() {
  const router = useRouter();
  const [universeId, setUniverseId] = useState<UniverseId>("tech");
  const [customInput, setCustomInput] = useState("");
  const [options, setOptions] = useState<Meme[] | null>(null);
  const [meme, setMeme] = useState<Meme | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const universe = UNIVERSES.find((u) => u.id === universeId)!;

  const generate = () => {
    if (!customInput.trim()) {
      setToast("Digite um contexto");
      setTimeout(() => setToast(null), 1800);
      return;
    }
    setOptions(generateCustomOptions(universeId, customInput.trim(), 6));
    setMeme(null);
  };

  const selectOption = (opt: Meme) => {
    setMeme(opt);
    setOptions(null);
  };

  const copyText = async () => {
    if (!meme) return;
    const text = `SITUAÇÃO: ${meme.situacao}\nDESCULPA: ${meme.desculpa}\nIA: ${meme.respostaIA}\nSTATUS: ${meme.status.emoji} ${meme.status.label}`;
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copiado!");
    } catch {
      setToast("Erro");
    }
    setTimeout(() => setToast(null), 1800);
  };

  const share = async () => {
    if (!meme) return;
    const text = `SITUAÇÃO: ${meme.situacao}\nDESCULPA: "${meme.desculpa}"\nIA: "${meme.respostaIA}"`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "BugMeme", text });
      } catch {
        copyText();
      }
    } else copyText();
  };

  const downloadImage = async () => {
    if (!cardRef.current || !meme) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: "#12131b",
      });
      const a = document.createElement("a");
      a.download = `bugmeme-${meme.id}.png`;
      a.href = dataUrl;
      a.click();
      setToast("Baixado!");
      setTimeout(() => setToast(null), 1800);
    } catch {
      setToast("Erro");
      setTimeout(() => setToast(null), 1800);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070b] text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#07070b]/95 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-3 h-14 flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-300" />
          </button>
          <div className="flex-1">
            <div className="font-display font-bold text-[16px] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-300" /> Personalizado
            </div>
            <div className="text-[11px] text-zinc-500">Digite um contexto e gere opções</div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-5 pb-28">
        {/* Universe chips */}
        <div className="text-[11px] tracking-widest text-zinc-500 mb-2">UNIVERSO</div>
        <div className="flex flex-wrap gap-2 mb-5">
          {UNIVERSES.map((u) => (
            <button
              key={u.id}
              onClick={() => setUniverseId(u.id)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition ${
                universeId === u.id
                  ? "bg-white text-black border-white"
                  : "bg-white/5 text-zinc-300 border-white/10"
              }`}
            >
              {u.emoji} {u.shortName}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder="Ex: perdi o jogo no último minuto..."
          className="w-full h-12 px-4 rounded-xl bg-[#12131b] border border-white/10 text-[14px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400/40 mb-3"
        />

        <button
          onClick={generate}
          className="w-full h-12 rounded-xl bg-white text-black font-bold text-[14px] active:scale-[0.98] transition mb-6"
        >
          Gerar opções
        </button>

        <AnimatePresence>
          {options && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 mb-6"
            >
              <div className="text-[11px] tracking-widest text-zinc-500">
                ESCOLHA UMA ({options.length})
              </div>
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => selectOption(opt)}
                  className="w-full text-left p-4 rounded-2xl bg-[#12131b] border border-white/10 active:scale-[0.98] transition"
                >
                  <div className="text-[10px] text-cyan-300 mb-1">
                    {opt.status.emoji} {opt.status.label}
                  </div>
                  <div className="font-display font-bold text-[15px] text-white">{opt.situacao}</div>
                  <div className="mt-1 text-[13px] text-zinc-400 italic line-clamp-1">
                    "{opt.desculpa}"
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {meme && (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div
                ref={cardRef}
                className="rounded-2xl border border-white/10 bg-[#12131b] overflow-hidden"
              >
                <div className={`h-[3px] bg-gradient-to-r ${meme.status.bg}`} />
                <div className="flex items-center justify-between px-4 h-11 border-b border-white/5 bg-[#171925]">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <TriangleAlert className="w-3.5 h-3.5 text-yellow-300" /> #{meme.id}
                  </div>
                  <div className="text-[10px] text-zinc-600">
                    {universe.emoji} {universe.shortName}
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <div className="text-[10px] tracking-[0.2em] text-cyan-300 mb-1">SITUAÇÃO</div>
                    <div className="font-display font-bold text-[18px] text-white">
                      {meme.situacao.toUpperCase()}
                    </div>
                  </div>
                  <div className="rounded-xl bg-[#0a0b10] border border-white/5 p-3">
                    <div className="text-[10px] tracking-[0.2em] text-fuchsia-300 mb-1.5 flex items-center gap-1.5">
                      <Skull className="w-3.5 h-3.5" /> DESCULPA
                    </div>
                    <div className="text-[15px] text-zinc-100">"{meme.desculpa}"</div>
                  </div>
                  <div className="rounded-xl bg-[#0a0b10] border border-white/5 p-3">
                    <div className="text-[10px] tracking-[0.2em] text-yellow-200 mb-1.5">IA</div>
                    <div className="text-[14px] text-zinc-300 italic">“{meme.respostaIA}”</div>
                  </div>
                  <div className={`text-[12px] font-bold ${meme.status.color}`}>
                    STATUS: {meme.status.emoji} {meme.status.label}
                  </div>
                </div>
                <div className="px-4 pb-4 flex flex-col gap-2">
                  <button
                    onClick={copyText}
                    className="h-11 rounded-xl bg-white text-black text-[13px] font-bold flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" /> Copiar
                  </button>
                  <div className="grid grid-cols-3 gap-2">
                    <button onClick={share} className="h-11 rounded-xl bg-[#1d1f2d] border border-white/10 text-zinc-200 text-[12px] font-bold flex items-center justify-center gap-1">
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </button>
                    <button onClick={downloadImage} className="h-11 rounded-xl bg-[#1d1f2d] border border-white/10 text-zinc-200 text-[12px] font-bold flex items-center justify-center gap-1">
                      <Download className="w-3.5 h-3.5" /> Salvar
                    </button>
                    <button
                      onClick={() => {
                        setMeme(null);
                        setOptions(null);
                      }}
                      className="h-11 rounded-xl bg-[#1d1f2d] border border-white/10 text-zinc-200 text-[12px] font-bold flex items-center justify-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Voltar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-white text-black text-[13px] font-bold"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
