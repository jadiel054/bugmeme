# Backend BugMeme — Fase C (Neon free)

## O que já está no código

- Schema Drizzle: `phrases`, `generated_memes`, `device_favorites`
- Client Neon serverless: `lib/db/`
- SQL de init: `drizzle/0000_init.sql`
- APIs:
  - `GET /api/health` — status do app + banco
  - `POST /api/memes` — grava meme gerado (quando DB estiver ligado)
  - `GET /api/memes` — lista recentes

Sem `DATABASE_URL`, o site **continua funcionando** só no cliente (como hoje).

---

## 1. Criar projeto no Neon (grátis)

1. Acesse [https://console.neon.tech](https://console.neon.tech) e crie conta
2. **New Project** → nome `bugmeme` → região próxima (ex.: São Paulo se disponível, senão US East)
3. No dashboard, abra **Connection details**
4. Copie:
   - **Pooled connection string** → `DATABASE_URL`
   - **Direct connection string** → `DATABASE_URL_UNPOOLED`

O hostname pooled costuma ter `-pooler` no meio.

---

## 2. Criar as tabelas

**Opção A — SQL Editor (mais simples)**  
No Neon: **SQL Editor** → cole o conteúdo de `drizzle/0000_init.sql` → Run.

**Opção B — Drizzle local**  
```bash
npm install
# .env.local com DATABASE_URL_UNPOOLED=...
npx drizzle-kit push
```

---

## 3. Variáveis no Vercel

No projeto **bugmeme** na Vercel:

1. **Settings → Environment Variables**
2. Adicione:
   - `DATABASE_URL` = connection string **pooled**
   - `DATABASE_URL_UNPOOLED` = connection string **direct** (opcional, útil p/ migrations)
3. **Redeploy** (Deployments → … → Redeploy)

---

## 4. Testar

Abra:

```
https://SEU-DOMINIO.vercel.app/api/health
```

Resposta esperada com banco ok:

```json
{ "ok": true, "app": "bugmeme", "database": "connected" }
```

Sem banco ainda:

```json
{ "ok": true, "app": "bugmeme", "database": "not_configured" }
```

---

## 5. Próximos passos depois do Neon ligado

1. Seed das frases do app para a tabela `phrases`
2. Gravar cada geração via `POST /api/memes`
3. Favoritos por `device_id` na nuvem
4. Auth (Clerk / NextAuth) quando quiser conta real

---

## Dependências

```bash
npm install @neondatabase/serverless drizzle-orm
npm install -D drizzle-kit
```
