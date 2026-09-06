# BugMeme

**Gerador de memes e desculpas absurdas para qualquer caos da vida.**

Formato:

> **Situação real** + **Desculpa** + **Resposta da IA** + **Status caótico**

Layout de aplicativo (mobile-first), com uma tela para cada universo.

---

## Telas

- `/` — Início com os 8 universos
- `/u/[universo]` — Gerador daquele universo (Aleatório + Personalizado)
- `/custom` — Modo personalizado global
- `/favoritos` — Memes salvos neste aparelho
- `/config` — Som e reduzir movimento

## Universos

Tech · Futebol · Trabalho / CLT · Relacionamento · Faculdade · Games · Brasil / Cotidiano · Família

## Stack

Next.js 15 + React + Tailwind + Framer Motion · Deploy na Vercel

## Como rodar

```bash
git clone https://github.com/jadiel054/bugmeme.git
cd bugmeme
npm install
npm run dev
```

## Próximo

- Botão de favoritar no card do meme
- GIF e figurinhas
- Auth + favoritos na nuvem
- Geração com IA real

Documentação de produto: [BLUEPRINT.md](./BLUEPRINT.md)
