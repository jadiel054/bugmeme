"use client";

import { useState, useRef, useCallback, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Copy,
  Share2,
  ArrowLeft,
  TriangleAlert,
  Skull,
  Download,
  Sparkles,
  Heart,
} from "lucide-react";
import {
  UNIVERSES,
  generateMeme,
  generateCustomOptions,
  type Meme,
  type UniverseId,
} from "@/lib/universes";
import { toPng } from "html-to-image";
import { toggleFavorite, isFavorite } from "@/lib/prefs";
import { pushHistory } from "@/lib/history";
import { buildMemeText, shareWhatsApp, shareX, shareNative } from "@/lib/share";
import { analyzeSentiment, type SentimentResult } from "@/lib/sentiment";
import { logMemeToServer } from "@/lib/api";
import { IconWhatsApp, IconX } from "@/components/BrandIcons";
import Link from "next/link";

const UNIVERSE_THEME: Record<
  UniverseId,
  { glow: string; border: string; soft: string; buttonShadow: string }
> = {
  tech: {
    glow: "bg-cyan-500/20",
    border: "border-cyan-400/30",
    soft: "from-cyan-500/10 to-fuchsia-500/5",
    buttonShadow: "shadow-[0_8px_32px_rgba(34,211,238,0.25)]",
  },
  futebol: {
    glow: "bg-emerald-500/20",
    border: "border-emerald-400/30",
    soft: "from-emerald-500/10 to-green-500/5",
    buttonShadow: "shadow-[0_8px_32px_rgba(52,211,153,0.25)]",
  },
  trabalho: {
    glow: "bg-blue-500/20",
    border: "border-blue-400/30",
    soft: "from-blue-500/10 to-indigo-500/5",
    buttonShadow: "shadow-[0_8px_32px_rgba(96,165,250,0.25)]",
  },
  relacionamento: {
    glow: "bg-pink-500/20",
    border: "border-pink-400/30",
    soft: "from-pink-500/10 to-rose-500/5",
    buttonShadow: "shadow-[0_8px_32px_rgba(244,114,182,0.25)]",
  },
  faculdade: {
    glow: "bg-amber-500/20",
    border: "border-amber-400/30",
    soft: "from-amber-500/10 to-orange-500/5",
    buttonShadow: "shadow-[0_8px_32px_rgba(251,191,36,0.25)]",
  },
  games: {
    glow: "bg-violet-500/25",
    border: "border-violet-400/35",
    soft: "from-violet-500/15 to-purple-500/5",
    buttonShadow: "shadow-[0_8px_32px_rgba(167,139,250,0.3)]",
  },
  brasil: {
    glow: "bg-yellow-500/20",
    border: "border-yellow-400/30",
    soft: "from-yellow-500/10 to-green-500/5",
    buttonShadow: "shadow-[0_8px_32px_rgba(250,204,21,0.25)]",
  },
  familia: {
    glow: "bg-orange-500/20",
    border: "border-orange-400/30",
    soft: "from-orange-500/10 to-red-500/5",
    buttonShadow: "shadow-[0_8px_32px_rgba(251,146,60,0.25)]",
  },
};

const EMOTION_LABEL: Record<string, string> = {
  frustracao: "Frustração",
  ironia: "Ironia",
  desespero: "Desespero",
  raiva: "Raiva",
  resignacao: "Resignção",
  caos: "Caos",
  humor: "Humor",
  neutro: "Neutro",
};

function toSaved(m: Meme) {
  return {
    id: m.id,
    universeId: m.universeId,
    situacao: m.situacao,
    desculpa: m.desculpa,
    respostaIA: m.respostaIA,
    statusLabel: m.status.label,
    statusEmoji: m.status.emoji,
    savedAt: Date.now(),
  };
}

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
  const [sentiment, setSentiment] = useState<SentimentResult | null>(null);
  const [count, setCount] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [fav, setFav] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const audioCtx = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (meme) setFav(isFavorite(meme.id));
  }, [meme]);

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
  const theme = UNIVERSE_THEME[universeId];

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

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const applyMeme = (next: Meme) => {
    setMeme(next);
    setCustomOptions(null);
    pushHistory(toSaved(next));
    logMemeToServer(next, sentiment?.emotion ?? null);
  };

  const generateRandom = () => {
    playSound("click");
    setCount((c) => c + 1);
    setSentiment(null);
    setTimeout(() => {
      applyMeme(generateMeme(universeId, meme));
      playSound("win");
    }, 120);
  };

  const generateCustom = () => {
    if (!customInput.trim()) {
      showToast("Digite um contexto");
      return;
    }
    playSound("click");
    setCount((c) => c + 1);
    const s = analyzeSentiment(customInput);
    setSentiment(s);
    setTimeout(() => {
      setCustomOptions(generateCustomOptions(universeId, customInput.trim(), 6));
      setMeme(null);
      playSound("win");
    }, 120);
  };

  const selectOption = (opt: Meme) => {
    applyMeme(opt);
    playSound("click");
  };

  const copyText = async () => {
    if (!meme) return;
    try {
      await navigator.clipboard.writeText(buildMemeText(meme));
      showToast("Copiado!");
    } catch {
      showToast("Erro ao copiar");
    }
  };

  const share = async () => {
    if (!meme) return;
    const text = buildMemeText(meme);
    try {
      const ok = await shareNative("BugMeme", text);
      if (!ok) shareWhatsApp(text);
    } catch {
      shareWhatsApp(text);
    }
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
      showToast("Imagem baixada!");
    } catch {
      showToast("Erro ao baixar");
    }
  };

  const onFavorite = () => {
    if (!meme) return;
    toggleFavorite(toSaved(meme));
    const active = isFavorite(meme.id);
    setFav(active);
    showToast(active ? "Salvo nos favoritos!" : "Removido");
  };

  return (
    <div className="min-h-screen bg-[#07070b] text-zinc-100 relative overflow-hidden">
      <div className={`pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-[80px] ${theme.glow}`} />

      <header className="sticky top-0 z-20 border-b border-white/5 bg-[#07070b]/90 backdrop-blur-xl">
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

      <main className="max-w-lg mx-auto px-4 pt-4 pb-44">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => {
              setMode("random");
              setCustomOptions(null);
              setSentiment(null);
            }}
            className={`flex-1 h-10 rounded-xl text-[13px] font-bold transition ${
              mode === "random" ? "bg-white text-black" : "bg-white/5 text-zinc-400 border border-white/10"
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
              mode === "custom" ? "bg-white text-black" : "bg-white/5 text-zinc-400 border border-white/10"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Personalizado
          </button>
        </div>

        {mode === "custom" && (
          <div className="mb-4 space-y-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateCustom()}
              placeholder="Ex: perdi no último minuto..."
              className="w-full h-12 px-4 rounded-xl bg-[#12131b] border border-white/10 text-[14px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/30"
            />
            {sentiment && (
              <div className="text-[11px] text-zinc-500 px-1">
                Tom detectado:{" "}
                <span className="text-zinc-300 font-medium">
                  {EMOTION_LABEL[sentiment.emotion] || sentiment.emotion}
                </span>
                {sentiment.intensity > 0.4 && (
                  <span className="text-zinc-600"> · intensidade {Math.round(sentiment.intensity * 100)}%</span>
                )}
              </div>
            )}
          </div>
        )}

        <div className="min-h-[300px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {customOptions && (
              <motion.div
                key="options"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-2.5 pb-4"
              >
                <div className="text-[11px] tracking-widest text-zinc-500">
                  ESCOLHA UMA ({customOptions.length})
                </div>
                {customOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => selectOption(opt)}
                    className={`w-full text-left p-3.5 rounded-2xl bg-[#12131b] border ${theme.border} active:scale-[0.98] transition`}
                  >
                    <div className="text-[10px] text-zinc-400 mb-1">
                      {opt.status.emoji} {opt.status.label}
                    </div>
                    <div className="font-display font-bold text-[14px] text-white leading-snug">{opt.situacao}</div>
                    <div className="mt-1 text-[12px] text-zinc-400 italic line-clamp-1">"{opt.desculpa}"</div>
                  </button>
                ))}
              </motion.div>
            )}

            {meme && !customOptions && (
              <motion.div
                key={meme.id}
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.28 }}
              >
                <div
                  ref={cardRef}
                  className={`rounded-3xl border ${theme.border} bg-[#12131b] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.55)]`}
                >
                  <div className={`h-1.5 bg-gradient-to-r ${universe.accent}`} />
                  <div className="flex items-center justify-between px-4 h-10 border-b border-white/5 bg-[#171925]/80">
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                      <TriangleAlert className="w-3.5 h-3.5 text-yellow-300" /> #{meme.id}
                    </div>
                    <div className="text-[10px] text-zinc-500">
                      {universe.emoji} {universe.shortName}
                    </div>
                  </div>

                  <div className={`p-4 space-y-3.5 bg-gradient-to-b ${theme.soft}`}>
                    <div>
                      <div className="text-[10px] tracking-[0.18em] text-zinc-400 mb-1">SITUAÇÃO</div>
                      <div className="font-display font-bold text-[17px] leading-[1.25] text-white">
                        {meme.situacao.toUpperCase()}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-black/40 border border-white/5 p-3">
                      <div className="text-[10px] tracking-[0.18em] text-fuchsia-300 mb-1 flex items-center gap-1.5">
                        <Skull className="w-3.5 h-3.5" /> DESCULPA
                      </div>
                      <div className="text-[15px] text-zinc-100 font-medium leading-snug">"{meme.desculpa}"</div>
                    </div>
                    <div className="rounded-2xl bg-black/40 border border-white/5 p-3">
                      <div className="text-[10px] tracking-[0.18em] text-yellow-200 mb-1">IA</div>
                      <div className="text-[13px] text-zinc-300 italic leading-relaxed">“{meme.respostaIA}”</div>
                    </div>
                    <div className={`text-[12px] font-bold tracking-wide ${meme.status.color}`}>
                      {meme.status.emoji} {meme.status.label}
                    </div>
                  </div>

                  <div className="px-3 pb-3 pt-1 space-y-1.5">
                    <div className="grid grid-cols-4 gap-1.5">
                      <button onClick={copyText} className="h-10 rounded-xl bg-white text-black text-[11px] font-bold flex items-center justify-center gap-1 active:scale-[0.97]">
                        <Copy className="w-3.5 h-3.5" /> Copiar
                      </button>
                      <button onClick={share} className="h-10 rounded-xl bg-[#1d1f2d] border border-white/10 text-zinc-200 text-[11px] font-bold flex items-center justify-center gap-1 active:scale-[0.97]">
                        <Share2 className="w-3.5 h-3.5" /> Share
                      </button>
                      <button onClick={downloadImage} className="h-10 rounded-xl bg-[#1d1f2d] border border-white/10 text-zinc-200 text-[11px] font-bold flex items-center justify-center gap-1 active:scale-[0.97]">
                        <Download className="w-3.5 h-3.5" /> Foto
                      </button>
                      <button onClick={onFavorite} className="h-10 rounded-xl bg-[#1d1f2d] border border-white/10 text-zinc-200 text-[11px] font-bold flex items-center justify-center gap-1 active:scale-[0.97]">
                        <Heart className={`w-3.5 h-3.5 ${fav ? "fill-pink-400 text-pink-400" : ""}`} />
                        {fav ? "Salvo" : "Salvar"}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => meme && shareWhatsApp(buildMemeText(meme))}
                        className="h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/35 text-[#25D366] text-[12px] font-bold flex items-center justify-center gap-2 active:scale-[0.97]"
                      >
                        <IconWhatsApp className="w-4 h-4" /> WhatsApp
                      </button>
                      <button
                        onClick={() => meme && shareX(buildMemeText(meme))}
                        className="h-10 rounded-xl bg-white/5 border border-white/15 text-zinc-100 text-[12px] font-bold flex items-center justify-center gap-2 active:scale-[0.97]"
                      >
                        <IconX className="w-3.5 h-3.5" /> Postar no X
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {!meme && !customOptions && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`rounded-3xl border border-dashed ${theme.border} bg-gradient-to-b ${theme.soft} p-10 text-center`}
              >
                <div className="text-[48px] mb-3">{universe.emoji}</div>
                <div className="font-display font-bold text-[16px] text-white mb-1">{universe.name}</div>
                <div className="text-[13px] text-zinc-400 leading-relaxed">
                  O meme aparece aqui no centro.
                  <br />
                  Use o botão embaixo para gerar.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <div className="fixed bottom-16 inset-x-0 z-30 px-4 pb-3 pt-3 bg-gradient-to-t from-[#07070b] via-[#07070b]/95 to-transparent">
        <div className="max-w-lg mx-auto">
          <button
            onClick={mode === "random" ? generateRandom : generateCustom}
            className={`w-full h-14 rounded-2xl bg-white text-black font-display font-bold text-[16px] active:scale-[0.98] transition flex items-center justify-center gap-2 ${theme.buttonShadow}`}
          >
            {mode === "random" ? (
              <>
                <Zap className="w-5 h-5" />
                {count === 0 ? "Gerar desculpa" : "Gerar outro"}
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Gerar opções
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-36 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-white text-black text-[13px] font-bold shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
