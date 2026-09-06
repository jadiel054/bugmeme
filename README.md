# BugMeme

**Gerador de memes e desculpas absurdas para qualquer caos da vida.**

Crie memes no formato clássico:

> **Situação real** + **Desculpa** + **Resposta da IA** + **Status caótico**

Agora com **múltiplos universos de humor** e modo **Personalizado** (digite um contexto e receba várias opções variadas, no estilo de busca de GIF).

---

## Universos disponíveis (desde o lançamento)

| Universo              | Vibe principal                              |
|-----------------------|---------------------------------------------|
| **Tech**              | Deploy na sexta, culpa do cache, IA em loop |
| **Futebol**           | "Foi o juiz", "no VAR tava ok"              |
| **Trabalho / CLT**    | Reunião que poderia ser e-mail              |
| **Relacionamento**    | "Não vi a mensagem", "tava ocupado"         |
| **Faculdade**         | "O professor não explicou"                  |
| **Games**            | "Foi lag", "o servidor caiu"                |
| **Brasil / Cotidiano**| PIX, luz, trânsito, vida real               |
| **Família**          | WhatsApp da família e churrasco             |

---

## Funcionalidades principais

- **Modo Aleatório** → gera um meme do universo escolhido
- **Modo Personalizado** → digite um contexto e receba 6–9 opções diferentes
- Status reativos (cores, animações e sons diferentes por status)
- Botão com personalidade (foge, treme, BSOD fake)
- Download de imagem
- Compartilhamento rápido (WhatsApp, Instagram, X, LinkedIn)
- Exportação futura de GIF e figurinhas de WhatsApp
- Visual vaporwave + terminal + glitch

---

## Stack

- **Frontend:** Next.js 15 + React + Tailwind CSS + Framer Motion
- **Exportação de imagem:** html-to-image
- **Deploy:** Vercel
- **Banco (futuro):** PostgreSQL (Neon / Supabase)
- **Auth (futuro):** Clerk ou NextAuth

---

## Status do projeto

🚧 Em construção ativa

- [x] Gerador base (Tech)
- [x] Blueprint completo
- [x] Multi-universo definido
- [x] Modo Personalizado definido
- [ ] Implementação dos demais universos
- [ ] Modo Personalizado (grade de opções)
- [ ] GIF e figurinhas
- [ ] Autenticação e favoritos
- [ ] Geração com IA + curadoria

---

## Documentação

O documento completo de produto, arquitetura e roadmap está em:

**[BLUEPRINT.md](./BLUEPRINT.md)**

---

## Como rodar localmente

```bash
git clone https://github.com/jadiel054/bugmeme.git
cd bugmeme
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

---

## Roadmap resumido

**MVP**
- Multi-universo (8 universos)
- Modo Aleatório + Personalizado
- Download de imagem + compartilhamento
- Status reativo e animações básicas

**v1.0**
- GIF e figurinhas de WhatsApp
- Galeria pública
- Auth + favoritos
- Curadoria de frases

**Futuro**
- Premium
- Mais universos
- Sticker packs
- Comunidade

---

## Contribuindo

O projeto ainda está em fase inicial. Sugestões de frases, novos universos e melhorias de UX são muito bem-vindas.

---

Feito com ódio de deploy na sexta (e de qualquer outro caos da vida).

**BugMeme** — porque a vida é um bug e a gente só tenta documentar.
