import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL não configurada. Veja docs/BACKEND.md");
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export type Db = ReturnType<typeof getDb>;
