"use client";

import { useState, useRef, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Copy,
  Share2,
  RefreshCw,
  ArrowLeft,
  TriangleAlert,
  Skull,
  Download,
  Sparkles,
} from "lucide-react";
import {
  UNIVERSES,
  generateMeme,
  generateCustomOptions,
  type Meme,
  type UniverseId,
} from "@/lib/universes";
import { toPng } from "html-to-image";
import Link from "next/link";

export default function UniversePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const universe = UNIVERSES.find((u) => u.id === id);

  const [mode, setMode] = useState<"random" | "custom">("random");
  const [meme, setMeme] = useState<Meme | null>(null);
  const [customOptions, setCustomOptions] = useState<Meme[] | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [count, setCount] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });
  const [isFleeing, setIsFleeing] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const audioCtx = useRef<AudioContext | null>(null);

  if (!universe) {
    return (
      <div className="min-h-screen bg-[#07070b] flex items-center justify-center text-zinc-400">
        Universo não encontrado.{" "}
        <Link href="/" className="text-cyan-300 underline ml-2">
          Voltar
        </Link>
      </div>
    );
  }

  const universeId = universe.id as UniverseId;

  const initAudio = useCallback(() => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.current.state === "suspended") audioCtx.current.resume();
    return audioCtx.current;
  }, []);

  const playSound = useCallback(
    (type: "click" | "win") => {
      try {
        const ctx = initAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.0001, now);
        osc.type = type === "click" ? "square" : "triangle";
        osc.frequency.setValueAtTime(type === "click" ? 700 : 500, now);
        if (type === "win") osc.frequency.exponentialRampToValueAtTime(900, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.15, now + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.22);
      } catch {}
    },
    [initAudio]
  );

  const generateRandom = () => {
    playSound("click");
    const next = count + 1;
    setCount(next);

    if (next % 5 === 0) {
      setIsFleeing(true);
      setButtonOffset({ x: (Math.random() - 0.5) * 120, y: (Math.random() - 0.5) * 60 });
    } else {
      setIsFleeing(false);
      setButtonOffset({ x: 0, y: 0 });
    }

    setTimeout(() => {
      setMeme(generateMeme(universeId, meme));
      setCustomOptions(null);
      playSound("win");
    }, 150);
  };

  const generateCustom = () => {
    if (!customInput.trim()) {
      setToast("Digite um contexto");
      setTimeout(() => setToast(null), 1800);
      return;
    }
    playSound("click");
    setCount((c) => c + 1);
    setTimeout(() => {
      setCustomOptions(generateCustomOptions(universeId, customInput.trim(), 6));
      setMeme(null);
      playSound("win");
    }, 150);
  };

  const selectOption = (opt: Meme) => {
    setMeme(opt);
    setCustomOptions(null);
    playSound("click");
  };

  const copyText = async () => {
    if (!meme) return;
    const text = `SITUAÇÃO: ${meme.situacao}\nDESCULPA: ${meme.desculpa}\nIA: ${meme.respostaIA}\nSTATUS: ${meme.status.emoji} ${meme.status.label}`;
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copiado!");
    } catch {
      setToast("Erro ao copiar");
    }
    setTimeout(() => setToast(null), 1800);
  };

  const share = async () => {
    if (!meme) return;
    const text = `SITUAÇÃO: ${meme.situacao}\nDESCULPA: "${meme.desculpa}"\nIA: "${meme.respostaIA}"\nSTATUS: ${meme.status.emoji} ${meme.status.label}`;
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
      setToast("Imagem baixada!");
      setTimeout(() => setToast(null), 1800);
    } catch {
      setToast("Erro ao baixar");
      setTimeout(() => setToast(null), 1800);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070b] text-zinc-100">
      {/* App header */}
      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#07070b]/95 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-3 h-14 flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center active:scale-95 transition"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-300" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="font-display font-bold text-[16px] truncate">
              {universe.emoji} {universe.name}
            </div>
            <div className="text-[11px] text-zinc-500 truncate">{universe.description}</div>
          </div>
          <div className="text-[11px] text-zinc-600 tabular-nums">{String(count).padStart(3, "0")}</div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-5 pb-28">
        {/* Mode switch */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => {
              setMode("random");
              setCustomOptions(null);
            }}
            className={`flex-1 h-10 rounded-xl text-[13px] font-bold transition ${
              mode === "random"
                ? "bg-white text-black"
                : "bg-white/5 text-zinc-400 border border-white/10"
            }`}
          >
            Aleatório
          </button>
          <button
            onClick={() => {
              setMode("custom");
              setMeme(null);
            }}
            className={`flex-1 h-10 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition ${
              mode === "custom"
                ? "bg-white text-black"
                : "bg-white/5 text-zinc-400 border border-white/10"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Personalizado
          </button>
        </div>

        {/* Custom input */}
        {mode === "custom" && (
          <div className="mb-5 space-y-3">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateCustom()}
              placeholder="Ex: perdi no último minuto..."
              className="w-full h-12 px-4 rounded-xl bg-[#12131b] border border-white/10 text-[14px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400/40"
            />
            <button
              onClick={generateCustom}
              className="w-full h-12 rounded-xl bg-white text-black font-bold text-[14px] active:scale-[0.98] transition"
            >
              Gerar opções
            </button>
          </div>
        )}

        {/* Random generate button */}
        {mode === "random" && (
          <div className="mb-6 flex justify-center">
            <motion.button
              onClick={generateRandom}
              animate={{ x: buttonOffset.x, y: buttonOffset.y }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="relative px-10 h-14 rounded-2xl bg-white text-black font-display font-bold text-[16px] shadow-[0_8px_30px_rgba(0,255,255,0.2)] active:scale-[0.97] transition"
            >
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                {count === 0 ? "Gerar desculpa" : "Gerar outro"}
              </span>
              {isFleeing && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-yellow-300 text-black text-[10px] font-bold">
                  pega!
                </span>
              )}
            </motion.button>
          </div>
        )}

        {/* Custom options */}
        <AnimatePresence>
          {customOptions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-3 mb-6"
            >
              <div className="text-[11px] tracking-widest text-zinc-500">
                ESCOLHA UMA ({customOptions.length})
              </div>
              {customOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => selectOption(opt)}
                  className="w-full text-left p-4 rounded-2xl bg-[#12131b] border border-white/10 active:scale-[0.98] transition hover:border-white/20"
                >
                  <div className="text-[10px] text-cyan-300 mb-1">
                    {opt.status.emoji} {opt.status.label}
                  </div>
                  <div className="font-display font-bold text-[15px] text-white leading-snug">
                    {opt.situacao}
                  </div>
                  <div className="mt-1 text-[13px] text-zinc-400 italic line-clamp-1">
                    "{opt.desculpa}"
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Meme result card */}
        <AnimatePresence mode="wait">
          {meme && (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <div
                ref={cardRef}
                className="rounded-2xl border border-white/10 bg-[#12131b] overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
              >
                <div className={`h-[3px] bg-gradient-to-r ${meme.status.bg}`} />

                <div className="flex items-center justify-between px-4 h-11 border-b border-white/5 bg-[#171925]">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                    <TriangleAlert className="w-3.5 h-3.5 text-yellow-300" />
                    #{meme.id}
                  </div>
                  <div className="text-[10px] text-zinc-600">{universe.emoji} {universe.shortName}</div>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <div className="text-[10px] tracking-[0.2em] text-cyan-300 mb-1">SITUAÇÃO REAL</div>
                    <div className="font-display font-bold text-[18px] leading-[1.2] text-white">
                      {meme.situacao.toUpperCase()}
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#0a0b10] border border-white/5 p-3">
                    <div className="text-[10px] tracking-[0.2em] text-fuchsia-300 mb-1.5 flex items-center gap-1.5">
                      <Skull className="w-3.5 h-3.5" /> DESCULPA
                    </div>
                    <div className="text-[15px] text-zinc-100 font-medium">"{meme.desculpa}"</div>
                  </div>

                  <div className="rounded-xl bg-[#0a0b10] border border-white/5 p-3">
                    <div className="text-[10px] tracking-[0.2em] text-yellow-200 mb-1.5">RESPOSTA DA IA</div>
                    <div className="text-[14px] text-zinc-300 italic leading-relaxed">
                      “{meme.respostaIA}”
                    </div>
                  </div>

                  <div className={`text-[12px] font-bold tracking-wide ${meme.status.color}`}>
                    STATUS: {meme.status.emoji} {meme.status.label}
                  </div>
                </div>

                <div className="px-4 pb-4 flex flex-col gap-2">
                  <button
                    onClick={copyText}
                    className="h-11 rounded-xl bg-white text-black text-[13px] font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition"
                  >
                    <Copy className="w-4 h-4" /> Copiar texto
                  </button>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={share}
                      className="h-11 rounded-xl bg-[#1d1f2d] border border-white/10 text-zinc-200 text-[12px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </button>
                    <button
                      onClick={downloadImage}
                      className="h-11 rounded-xl bg-[#1d1f2d] border border-white/10 text-zinc-200 text-[12px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition"
                    >
                      <Download className="w-3.5 h-3.5" /> Salvar
                    </button>
                    <button
                      onClick={() => {
                        if (mode === "random") generateRandom();
                        else {
                          setMeme(null);
                          setCustomOptions(null);
                        }
                      }}
                      className="h-11 rounded-xl bg-[#1d1f2d] border border-white/10 text-zinc-200 text-[12px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Outro
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!meme && !customOptions && mode === "random" && (
          <div className="mt-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-center">
            <div className="text-[32px] mb-2">{universe.emoji}</div>
            <div className="text-[14px] text-zinc-400">
              Toque no botão acima para gerar a primeira desculpa deste universo.
            </div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-white text-black text-[13px] font-bold shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
