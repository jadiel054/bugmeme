"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Copy,
  Share2,
  RefreshCw,
  Terminal,
  Cpu,
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

type Mode = "random" | "custom";

export default function Home() {
  const [universeId, setUniverseId] = useState<UniverseId>("tech");
  const [mode, setMode] = useState<Mode>("random");
  const [meme, setMeme] = useState<Meme | null>(null);
  const [customOptions, setCustomOptions] = useState<Meme[] | null>(null);
  const [customInput, setCustomInput] = useState("");
  const [count, setCount] = useState(0);
  const [glitching, setGlitching] = useState(false);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });
  const [isFleeing, setIsFleeing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [bsod, setBsod] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const audioCtx = useRef<AudioContext | null>(null);

  const currentUniverse = UNIVERSES.find((u) => u.id === universeId)!;

  const initAudio = useCallback(() => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtx.current.state === "suspended") audioCtx.current.resume();
    return audioCtx.current;
  }, []);

  const playSound = useCallback(
    (type: "click" | "glitch" | "error" | "win") => {
      try {
        const ctx = initAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.0001, now);

        if (type === "click") {
          osc.type = "square";
          osc.frequency.setValueAtTime(800 + Math.random() * 200, now);
          gain.gain.exponentialRampToValueAtTime(0.18, now + 0.005);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
          osc.start(now);
          osc.stop(now + 0.13);
        } else if (type === "glitch") {
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(120, now);
          osc.frequency.linearRampToValueAtTime(600 + Math.random() * 400, now + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.2, now + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.26);
        } else if (type === "error") {
          osc.type = "square";
          osc.frequency.setValueAtTime(220, now);
          osc.frequency.setValueAtTime(150, now + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.25, now + 0.005);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
          osc.start(now);
          osc.stop(now + 0.51);
        } else {
          osc.type = "triangle";
          osc.frequency.setValueAtTime(400, now);
          osc.frequency.exponentialRampToValueAtTime(900, now + 0.12);
          gain.gain.exponentialRampToValueAtTime(0.2, now + 0.005);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
          osc.start(now);
          osc.stop(now + 0.31);
        }
      } catch {}
    },
    [initAudio]
  );

  const generateRandom = useCallback(() => {
    playSound("click");
    setGlitching(true);
    setTimeout(() => setGlitching(false), 180);

    const next = count + 1;
    setCount(next);

    if (next % 10 === 0) {
      setBsod(true);
      playSound("error");
      setTimeout(() => setBsod(false), 1400);
    }

    if (next % 5 === 0) {
      setIsFleeing(true);
      setButtonOffset({ x: (Math.random() - 0.5) * 160, y: (Math.random() - 0.5) * 80 });
    } else {
      setIsFleeing(false);
      setButtonOffset({ x: 0, y: 0 });
    }

    setTimeout(() => {
      setMeme(generateMeme(universeId, meme));
      setCustomOptions(null);
      playSound("win");
    }, 220);
  }, [count, meme, universeId, playSound]);

  const generateCustom = useCallback(() => {
    if (!customInput.trim()) {
      setToast("Digite um contexto primeiro!");
      setTimeout(() => setToast(null), 2000);
      return;
    }
    playSound("click");
    setGlitching(true);
    setTimeout(() => setGlitching(false), 180);

    const next = count + 1;
    setCount(next);

    setTimeout(() => {
      const options = generateCustomOptions(universeId, customInput.trim(), 6);
      setCustomOptions(options);
      setMeme(null);
      playSound("win");
    }, 220);
  }, [customInput, count, universeId, playSound]);

  const selectOption = (option: Meme) => {
    setMeme(option);
    setCustomOptions(null);
    playSound("click");
  };

  const handleButtonHover = () => {
    if (!isFleeing) return;
    playSound("glitch");
    setButtonOffset({ x: (Math.random() - 0.5) * 220, y: (Math.random() - 0.5) * 120 });
  };

  const copyText = async () => {
    if (!meme) return;
    const text = `SITUAÇÃO: ${meme.situacao}\nDESCULPA: ${meme.desculpa}\nIA: ${meme.respostaIA}\nSTATUS: ${meme.status.emoji} ${meme.status.label} [${meme.id}]`;
    try {
      await navigator.clipboard.writeText(text);
      setToast("COPIADO!");
    } catch {
      setToast("Não consegui copiar");
    }
    playSound("click");
    setTimeout(() => setToast(null), 2000);
  };

  const share = async () => {
    if (!meme) return;
    const text = `SITUAÇÃO: ${meme.situacao}\nDESCULPA: "${meme.desculpa}"\nIA: "${meme.respostaIA}"\nSTATUS: ${meme.status.emoji} ${meme.status.label}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "BugMeme", text });
        setToast("Compartilhado!");
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
      const link = document.createElement("a");
      link.download = `bugmeme-${meme.id}.png`;
      link.href = dataUrl;
      link.click();
      setToast("IMAGEM BAIXADA!");
      playSound("win");
      setTimeout(() => setToast(null), 2000);
    } catch {
      setToast("Erro ao gerar imagem");
      setTimeout(() => setToast(null), 2000);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        if (mode === "random") {
          e.preventDefault();
          generateRandom();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [generateRandom, mode]);

  // Reset meme when universe changes
  useEffect(() => {
    setMeme(null);
    setCustomOptions(null);
  }, [universeId]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07070b]" />
      <div className="pointer-events-none absolute -top-24 -left-24 w-[420px] h-[420px] bg-fuchsia-600/20 rounded-full blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-[90px]" />
      <div className="pointer-events-none absolute top-0 left-0 w-full h-[2px] scanline" />

      <AnimatePresence>
        {bsod && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0000AA] text-white font-mono flex items-center justify-center p-6"
          >
            <div className="max-w-[720px] w-full text-[15px] leading-[1.4]">
              <div className="bg-white text-[#0000AA] inline-block px-2 font-bold mb-6">Windows</div>
              <p className="mb-4">Ocorreu um erro. Seu sistema de desculpas parou de responder.</p>
              <p className="mb-4">*** STOP: 0x000000D1</p>
              <p className="mb-4">DRIVER_IRQL_NOT_LESS_OR_EQUAL - mas foi o estagiário, juro.</p>
              <p className="mt-8 opacity-70">Coletando informações para o Jira que ninguém vai ler...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-[1040px] mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-16">
        <div className="rounded-[10px] border border-white/10 bg-[#12131a]/80 backdrop-blur-xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_80px_rgba(0,0,0,0.6)]">
          {/* Title bar */}
          <div className="flex items-center justify-between px-3 sm:px-4 h-[36px] bg-[#1a1c26] border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex gap-[6px]">
                <span className="w-[10px] h-[10px] rounded-full bg-red-400/80" />
                <span className="w-[10px] h-[10px] rounded-full bg-yellow-300/80" />
                <span className="w-[10px] h-[10px] rounded-full bg-emerald-300/80" />
              </div>
              <div className="flex items-center gap-2 ml-2 sm:ml-4 text-[11px] tracking-wide">
                <Terminal className="w-3.5 h-3.5 text-cyan-300" />
                <span className="text-zinc-400">bug_generator.exe</span>
                <span className="hidden sm:inline text-zinc-600">—</span>
                <span className="hidden sm:inline text-zinc-300">{currentUniverse.emoji} {currentUniverse.shortName}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-zinc-500">
              <span className="hidden sm:flex items-center gap-1">
                <Cpu className="w-3 h-3" /> CPU: 98%
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> ONLINE
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row">
            {/* Sidebar */}
            <div className="sm:w-[220px] border-b sm:border-b-0 sm:border-r border-white/10 bg-[#0e0f16]/60 p-3 sm:p-4 flex sm:flex-col gap-3 sm:gap-4">
              <div className="min-w-[120px] sm:min-w-0">
                <div className="text-[10px] tracking-[0.18em] text-zinc-500">BUGS GERADOS</div>
                <div className="font-display font-bold text-[28px] leading-none text-white mt-1 tabular-nums">
                  {String(count).padStart(3, "0")}
                </div>
                <div className="mt-2 h-[4px] w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-300 to-fuchsia-400 transition-all duration-300"
                    style={{ width: `${Math.min(100, (count % 20) * 5 + 10)}%` }}
                  />
                </div>
              </div>

              <div className="min-w-[160px] sm:min-w-0 bg-[#151724] rounded-[8px] border border-white/5 p-2.5">
                <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> LOG
                </div>
                <div className="mt-1.5 space-y-1 text-[11px] leading-[1.3] text-zinc-400">
                  <div>{'>'} sistema pronto...</div>
                  <div className="text-cyan-300/80">
                    {'>'} {count === 0 ? "aguardando" : `#${meme?.id || "..."}`}
                  </div>
                  {isFleeing && <div className="text-yellow-300">{'>'} botão instável!</div>}
                </div>
              </div>

              <div className="hidden sm:block pt-2 border-t border-white/5 text-[10px] text-zinc-500 leading-[1.4]">
                Universo: <span className="text-white">{currentUniverse.name}</span>
              </div>
            </div>

            {/* Main */}
            <div className="flex-1 p-4 sm:p-7">
              <div className={`transition ${glitching ? "glitch-active" : ""}`}>
                <h1 className="font-display font-bold tracking-tight leading-[0.9] text-[28px] sm:text-[40px]">
                  <span className="block text-zinc-500 text-[12px] sm:text-[13px] tracking-[0.25em] font-mono mb-2">
                    v3.0 // MULTI-UNIVERSO
                  </span>
                  <span data-text="BUGMEME" className="glitch-text relative inline-block text-white">
                    BUGMEME
                  </span>
                  <br />
                  <span className={`bg-gradient-to-r ${currentUniverse.accent} bg-clip-text text-transparent`}>
                    {currentUniverse.name.toUpperCase()}
                  </span>
                </h1>
                <p className="mt-2 text-[13px] text-zinc-400 max-w-[520px]">
                  {currentUniverse.description}. Desculpas absurdas + status caótico.
                </p>
              </div>

              {/* Universe selector */}
              <div className="mt-5 flex flex-wrap gap-2">
                {UNIVERSES.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setUniverseId(u.id);
                      playSound("click");
                    }}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition ${
                      universeId === u.id
                        ? "bg-white text-black border-white"
                        : "bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {u.emoji} {u.shortName}
                  </button>
                ))}
              </div>

              {/* Mode toggle */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setMode("random")}
                  className={`px-4 py-2 rounded-[9px] text-[13px] font-bold transition ${
                    mode === "random"
                      ? "bg-white text-black"
                      : "bg-[#1d1f2d] text-zinc-300 border border-white/10"
                  }`}
                >
                  Aleatório
                </button>
                <button
                  onClick={() => setMode("custom")}
                  className={`px-4 py-2 rounded-[9px] text-[13px] font-bold transition flex items-center gap-2 ${
                    mode === "custom"
                      ? "bg-white text-black"
                      : "bg-[#1d1f2d] text-zinc-300 border border-white/10"
                  }`}
                >
                  <Sparkles className="w-4 h-4" /> Personalizado
                </button>
              </div>

              {/* Custom input */}
              {mode === "custom" && (
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && generateCustom()}
                    placeholder="Ex: perdi o jogo no último minuto, deploy quebrou..."
                    className="flex-1 h-[48px] px-4 rounded-[10px] bg-[#0b0c12] border border-white/10 text-white text-[14px] placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400/50"
                  />
                  <button
                    onClick={generateCustom}
                    className="h-[48px] px-6 rounded-[10px] bg-white text-black font-bold text-[14px] hover:bg-zinc-100 active:scale-[0.98] transition"
                  >
                    Gerar opções
                  </button>
                </div>
              )}

              {/* Random button */}
              {mode === "random" && (
                <div className="mt-6 relative h-[120px] sm:h-[140px] rounded-[14px] bg-[#0b0c12] border border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.04) 2px 3px)",
                      }}
                    />
                  </div>
                  <motion.button
                    onMouseEnter={handleButtonHover}
                    onTouchStart={handleButtonHover}
                    onClick={generateRandom}
                    animate={{ x: buttonOffset.x, y: buttonOffset.y }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative px-8 sm:px-10 h-[60px] sm:h-[64px] rounded-[12px] bg-white text-black font-display font-bold tracking-[0.04em] text-[16px] sm:text-[17px] shadow-[0_0_0_1px_rgba(255,255,255,0.6),0_10px_30px_rgba(0,255,255,0.25)] hover:shadow-[0_0_0_1px_white,0_12px_40px_rgba(255,0,255,0.35)] active:scale-[0.98] transition-shadow cursor-pointer select-none"
                  >
                    <span className="flex items-center gap-3">
                      <Zap className="w-5 h-5 group-active:rotate-12 transition" />
                      {count === 0 ? "GERAR DESCULPA" : "GERAR OUTRO"}
                    </span>
                    {isFleeing && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-yellow-300 text-black text-[10px] font-bold animate-float">
                        TENTA PEGAR
                      </span>
                    )}
                  </motion.button>
                </div>
              )}

              {/* Custom options grid */}
              <AnimatePresence>
                {customOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6"
                  >
                    <div className="text-[12px] tracking-widest text-zinc-500 mb-3">
                      ESCOLHA UMA OPÇÃO ({customOptions.length})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {customOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => selectOption(opt)}
                          className="text-left p-4 rounded-[12px] bg-[#12131b] border border-white/10 hover:border-cyan-400/40 hover:bg-[#171925] transition active:scale-[0.98]"
                        >
                          <div className="text-[10px] text-cyan-300 tracking-wider mb-1">
                            {opt.status.emoji} {opt.status.label}
                          </div>
                          <div className="font-display font-bold text-[14px] text-white leading-tight mb-2">
                            {opt.situacao}
                          </div>
                          <div className="text-[12px] text-zinc-400 italic line-clamp-2">
                            "{opt.desculpa}"
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Selected meme card */}
              <AnimatePresence mode="wait">
                {meme && (
                  <motion.div
                    key={meme.id}
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <div
                      ref={cardRef}
                      className="rounded-[14px] border border-white/10 bg-[#12131b] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative"
                    >
                      <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${meme.status.bg}`} />

                      <div className="flex items-center justify-between px-4 sm:px-5 h-[42px] border-b border-white/10 bg-[#171925]">
                        <div className="flex items-center gap-2 text-[11px] tracking-widest text-zinc-400">
                          <TriangleAlert className="w-4 h-4 text-yellow-300" />
                          MEME • #{meme.id} • {currentUniverse.emoji}
                        </div>
                        <div className="text-[10px] text-zinc-500">{count} bugs</div>
                      </div>

                      <div className="p-4 sm:p-6 space-y-4">
                        <div>
                          <div className="text-[10px] tracking-[0.22em] text-cyan-300 mb-1.5">SITUAÇÃO REAL</div>
                          <div className="font-display text-[18px] sm:text-[22px] leading-[1.15] text-white font-bold">
                            {meme.situacao.toUpperCase()}
                          </div>
                        </div>

                        <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                        <div className="rounded-[10px] bg-[#0a0b10] border border-white/[0.06] p-3 sm:p-4 relative overflow-hidden">
                          <div className="absolute -right-10 -top-10 w-[120px] h-[120px] bg-fuchsia-500/10 rounded-full blur-[20px]" />
                          <div className="text-[10px] tracking-[0.22em] text-fuchsia-300 mb-2 flex items-center gap-2">
                            <Skull className="w-3.5 h-3.5" /> DESCULPA
                          </div>
                          <div className="text-[16px] sm:text-[18px] leading-[1.3] font-medium text-zinc-100">
                            "{meme.desculpa}"
                          </div>
                        </div>

                        <div className="rounded-[10px] bg-[#0a0b10] border border-white/[0.06] p-3 sm:p-4">
                          <div className="text-[10px] tracking-[0.22em] text-yellow-200 mb-2">RESPOSTA DA IA</div>
                          <div className="text-[14px] sm:text-[15px] leading-[1.45] text-zinc-300 italic">
                            “{meme.respostaIA}”
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className={`text-[11px] sm:text-[12px] tracking-widest font-bold ${meme.status.color}`}>
                            STATUS: {meme.status.emoji} {meme.status.label}
                          </div>
                          <div className="text-[10px] text-zinc-600">id:{meme.id}</div>
                        </div>
                      </div>

                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex flex-wrap gap-2">
                        <button onClick={copyText} className="h-[38px] px-4 rounded-[9px] bg-white text-black text-[13px] font-bold flex items-center gap-2 hover:bg-zinc-100 active:scale-[0.98] transition">
                          <Copy className="w-4 h-4" /> Copiar
                        </button>
                        <button onClick={share} className="h-[38px] px-4 rounded-[9px] bg-[#1d1f2d] border border-white/10 text-zinc-200 text-[13px] font-bold flex items-center gap-2 hover:bg-[#242738] active:scale-[0.98] transition">
                          <Share2 className="w-4 h-4" /> Compartilhar
                        </button>
                        <button onClick={downloadImage} className="h-[38px] px-4 rounded-[9px] bg-[#1d1f2d] border border-white/10 text-zinc-200 text-[13px] font-bold flex items-center gap-2 hover:bg-[#242738] active:scale-[0.98] transition">
                          <Download className="w-4 h-4" /> Baixar
                        </button>
                        <button
                          onClick={mode === "random" ? generateRandom : () => { setMeme(null); setCustomOptions(null); }}
                          className="h-[38px] px-4 rounded-[9px] bg-[#1d1f2d] border border-white/10 text-zinc-300 text-[13px] font-bold flex items-center gap-2 hover:bg-[#242738] active:scale-[0.98] transition sm:ml-auto"
                        >
                          <RefreshCw className="w-4 h-4" /> {mode === "random" ? "Outro" : "Voltar"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!meme && !customOptions && mode === "random" && (
                <div className="mt-5 rounded-[14px] border border-dashed border-white/15 bg-[#0e0f16]/50 p-5 text-zinc-500 text-[13px]">
                  <div className="flex items-center gap-2 text-zinc-300 font-bold tracking-wide text-[12px]">
                    <Terminal className="w-4 h-4 text-cyan-300" /> AGUARDANDO PRIMEIRO BUG
                  </div>
                  <div className="mt-2">
                    Escolha o universo e clique em gerar. Ou mude para <span className="text-white">Personalizado</span> e digite um contexto.
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-2 text-[10px] text-zinc-600">
                <span>feito com ódio de deploy na sexta • multi-universo edition</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-white text-black text-[12px] font-bold tracking-wide shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
