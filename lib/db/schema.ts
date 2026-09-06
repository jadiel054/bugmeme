import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  index,
  varchar,
} from "drizzle-orm/pg-core";

/** Tipos de frase no pool */
export const phraseTypeEnum = ["situacao", "desculpa", "resposta_ia"] as const;
export type PhraseType = (typeof phraseTypeEnum)[number];

export const phrases = pgTable(
  "phrases",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    universeId: varchar("universe_id", { length: 32 }).notNull(),
    type: varchar("type", { length: 32 }).notNull(), // situacao | desculpa | resposta_ia
    text: text("text").notNull(),
    source: varchar("source", { length: 32 }).default("seed").notNull(), // seed | user | ai
    approved: boolean("approved").default(true).notNull(),
    votes: integer("votes").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [{
    universeTypeIdx: index("phrases_universe_type_idx").on(t.universeId, t.type),
  }]
);

/** Log leve de memes gerados (analytics / galeria futura) */
export const generatedMemes = pgTable(
  "generated_memes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    publicCode: varchar("public_code", { length: 16 }).notNull(),
    universeId: varchar("universe_id", { length: 32 }).notNull(),
    situacao: text("situacao").notNull(),
    desculpa: text("desculpa").notNull(),
    respostaIa: text("resposta_ia").notNull(),
    statusLabel: varchar("status_label", { length: 64 }).notNull(),
    statusEmoji: varchar("status_emoji", { length: 16 }),
    emotion: varchar("emotion", { length: 32 }),
    deviceId: varchar("device_id", { length: 64 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [{
    universeIdx: index("generated_memes_universe_idx").on(t.universeId),
    createdIdx: index("generated_memes_created_idx").on(t.createdAt),
  }]
);

/** Favoritos por device (antes do login) */
export const deviceFavorites = pgTable(
  "device_favorites",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    deviceId: varchar("device_id", { length: 64 }).notNull(),
    memePublicCode: varchar("meme_public_code", { length: 16 }).notNull(),
    universeId: varchar("universe_id", { length: 32 }).notNull(),
    situacao: text("situacao").notNull(),
    desculpa: text("desculpa").notNull(),
    respostaIa: text("resposta_ia").notNull(),
    statusLabel: varchar("status_label", { length: 64 }).notNull(),
    statusEmoji: varchar("status_emoji", { length: 16 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [{
    deviceIdx: index("device_favorites_device_idx").on(t.deviceId),
  }]
);
