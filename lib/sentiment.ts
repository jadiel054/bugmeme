/** Análise leve de sentimento/emoção (client-side, sem API).\n * Serve para futuras cenas open-source e ranking de tom.\n */

export type Emotion =
  | "frustracao"
  | "ironia"
  | "desespero"
  | "raiva"
  | "resignacao"
  | "caos"
  | "humor"
  | "neutro";

export type SentimentResult = {
  emotion: Emotion;
  intensity: number; // 0–1
  keywords: string[];
};

const RULES: { emotion: Emotion; words: string[]; weight: number }[] = [
  {
    emotion: "raiva",
    words: ["odio", "ódio", "raiva", "absurdo", "injusto", "roubo", "hate", "tiltado", "rage"],
    weight: 1,
  },
  {
    emotion: "desespero",
    words: ["perdi", "acabou", "nunca", "impossível", "desisto", "morri", "destru", "fim"],
    weight: 0.9,
  },
  {
    emotion: "frustracao",
    words: ["não veio", "não funciona", "quebrou", "falhou", "erro", "bug", "lag", "atrasou", "sumiu"],
    weight: 0.85,
  },
  {
    emotion: "ironia",
    words: ["claro", "obvio", "óbvio", "normal", "perfeito", "como sempre", "surpresa"],
    weight: 0.7,
  },
  {
    emotion: "resignacao",
    words: ["faz parte", "é o brasil", "tanto faz", "beleza", "ok", "tanto", "seguir"],
    weight: 0.65,
  },
  {
    emotion: "caos",
    words: ["caos", "explodiu", "pegou fogo", "tudo junto", "ao mesmo tempo", "crise"],
    weight: 0.8,
  },
  {
    emotion: "humor",
    words: ["kkk", "rs", "lol", "meme", "piada", "zoeira"],
    weight: 0.6,
  },
];

export function analyzeSentiment(text: string): SentimentResult {
  const lower = text.toLowerCase();
  const scores: Partial<Record<Emotion, number>> = {};
  const found: string[] = [];

  for (const rule of RULES) {
    for (const w of rule.words) {
      if (lower.includes(w)) {
        scores[rule.emotion] = (scores[rule.emotion] || 0) + rule.weight;
        found.push(w);
      }
    }
  }

  let emotion: Emotion = "neutro";
  let best = 0;
  for (const [emo, score] of Object.entries(scores) as [Emotion, number][]) {
    if (score > best) {
      best = score;
      emotion = emo;
    }
  }

  return {
    emotion,
    intensity: Math.min(1, best / 2),
    keywords: [...new Set(found)].slice(0, 6),
  };
}

/** Prompt helper para cena futura (open-source image models) */
export function scenePromptHint(situacao: string, desculpa: string, emotion: Emotion): string {
  const mood: Record<Emotion, string> = {
    frustracao: "frustrated person, messy desk, dark moody lighting",
    ironia: "sarcastic smile, raised eyebrow, subtle comedy scene",
    desespero: "exhausted person holding head, dramatic low light",
    raiva: "angry expression, intense colors, high contrast",
    resignacao: "tired shrug, muted colors, quiet atmosphere",
    caos: "chaotic room, papers flying, cinematic chaos",
    humor: "funny exaggerated situation, cartoonish vibe",
    neutro: "everyday scene, clean composition, soft light",
  };
  return `Meme scene illustration, ${mood[emotion]}, about: ${situacao}. Excuse vibe: ${desculpa}. No text in image, vertical phone screenshot style.`;
}
