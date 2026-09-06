# Blueprint Completo — BugMeme (v3)

## 1. Visão Geral

**Nome:** BugMeme  
**Tagline:** Gerador de memes e desculpas absurdas para qualquer caos da vida

**Objetivo**  
Site público e viral que gera memes no formato **Situação + Desculpa + Resposta da IA + Status caótico**.  
Agora com **múltiplos universos de humor** e modo **Personalizado** (digite um contexto e receba várias opções variadas, no estilo de busca de GIF).

**Problema que resolve**  
Falta de material rápido, visualmente impactante e prontamente compartilhável sobre os caos do dia a dia (trabalho, futebol, relacionamento, faculdade, games, etc.).

**Público-alvo**  
Qualquer pessoa no Brasil (e depois LATAM). Não é mais restrito a tech.

**Modelo de negócio**  
- Gratuito e aberto no lançamento (foco total em viralização)
- Monetização futura: doações, Premium leve, anúncios discretos

**Nível de complexidade**  
Produto completo desde o início, com forte ênfase em experiência interativa, multi-universo e compartilhamento.

---

## 2. Universos de Humor (desde o lançamento)

O sistema nasce com os seguintes universos (cada um com pool próprio de frases, status e personalidade visual):

| Universo              | Descrição curta                                      | Exemplos de tom                          |
|-----------------------|------------------------------------------------------|------------------------------------------|
| **Tech**              | O caos clássico de programação e deploy              | "funciona na minha máquina", "foi o estagiário" |
| **Futebol**           | Desculpas de torcedor, jogador e técnico             | "foi o juiz", "no VAR tava ok"           |
| **Trabalho / CLT**    | Escritório, reunião e chefes                         | "vamos alinhar", "foi o e-mail que não chegou" |
| **Relacionamento**    | Namoro, ficante e drama                              | "não vi a mensagem", "tava ocupado"      |
| **Faculdade**         | Provas, professores e trabalhos em grupo             | "o professor não explicou", "caí de cansaço" |
| **Games**            | Lag, servidor e ranked                               | "foi lag", "o servidor caiu"             |
| **Brasil / Cotidiano**| PIX, luz, trânsito, vida real brasileira            | "a luz caiu", "o PIX não caiu"           |
| **Família**          | Pais, tios, churrasco e WhatsApp da família          | "sua mãe ligou", "não repara a bagunça"  |

> Universos futuros possíveis: Academia, Internet/Brainrot, Séries/Filmes, Pets, etc.

Cada universo possui:
- Pool próprio de Situações, Desculpas, Respostas de IA e Status
- Cores e personalidade visual próprias
- Status reativos com animações e sons específicos

---

## 3. Personas e Perfis

| Perfil              | Permissões principais                                      |
|---------------------|------------------------------------------------------------|
| Visitante anônimo   | Gerar (aleatório + personalizado), baixar, compartilhar   |
| Usuário cadastrado  | + Favoritos, histórico, sugerir frases, votar             |
| Curador             | Aprovar/rejeitar frases (IA + humanas)                    |
| Administrador       | Tudo + métricas + configurações globais                   |

---

## 4. Arquitetura de Navegação

- **Público:** Home (Gerador) | Explorar | Sobre | Apoiar
- **Logado:** + Favoritos | Histórico | Enviar frase | Configurações
- Seletor de Universo sempre visível (chips ou dropdown)
- Mobile-first
- Auth completa (e-mail + Google + GitHub)

---

## 5. Módulos e Funcionalidades

### 5.1 Gerador Principal
- Seletor de **Universo**
- Dois modos:
  - **Aleatório** → gera 1 meme do universo escolhido
  - **Personalizado** → usuário digita um contexto e recebe **6 a 9 opções variadas** (estilo busca de GIF)
- Botão com personalidade (foge, treme, etc.)
- Contador global + sessão
- Sistema de **Status Reativo** (cor + animação + som por status)

### 5.2 Modo Personalizado (novo)
- Campo de texto livre (ex: "deploy quebrou na sexta", "perdi o jogo no último minuto", "minha mãe descobriu")
- Gera grade com 6–9 variações
- Usuário escolhe a favorita
- Depois pode baixar / compartilhar normalmente

### 5.3 Exportação
- Imagem estática (Stories, Feed, Twitter)
- GIF / WebP animado
- Figurinha de WhatsApp (estática + animada)
- Wallpaper

### 5.4 Compartilhamento
- WhatsApp, Instagram, Twitter/X, LinkedIn, nativo
- Copiar texto formatado

### 5.5 Sistema de Conteúdo
- Pools por universo
- Geração com IA + curadoria humana
- Sugestão de frases por usuários
- Votação e moderação

### 5.6 Galeria / Explorar
- Mais gerados, mais compartilhados, mais recentes
- Filtro por universo e status

### 5.7 Conta, Moderação e Admin
- Favoritos, histórico, preferências
- Fila de moderação
- Painel administrativo

---

## 6. Design System & Experiência Visual

- Fundo escuro vaporwave/glitch
- Tipografia: Space Grotesk (display) + JetBrains Mono
- Cores e glows diferentes por universo e por status
- Animações reativas ao status
- Modo "reduzir movimento" (acessibilidade)
- Sons contextuais

---

## 7. Aspectos Legais (LGPD)
- Termos de Uso + Política de Privacidade
- Consentimento no cadastro
- Direitos do titular
- Moderação de conteúdo
- Cookie banner mínimo

---

## 8. Modelo de Dados (visão de alto nível)

- User
- Universe (id, name, slug, colors, etc.)
- Phrase (universe_id, type, text, source, status, votes…)
- GeneratedMeme
- Favorite / Vote
- ExportLog
- SystemConfig

---

## 9. Fluxos Principais
1. Escolhe universo → Gera aleatório ou digita contexto (Personalizado) → Escolhe opção → Baixa/Compartilha
2. Usuário salva favorito e sugere frase
3. Moderação de frases
4. Auth completa

---

## 10. Requisitos Técnicos
- Next.js + React + Tailwind + Framer Motion
- html-to-image + biblioteca de GIF
- Auth (Clerk / NextAuth)
- PostgreSQL (Neon/Supabase)
- IA para geração contextual
- Deploy: Vercel

---

## 11. Roadmap

**MVP (lançamento)**
- Multi-universo (os 8 principais)
- Modo Aleatório + Modo Personalizado (grade de opções)
- Status reativo + animações básicas
- Download de imagem
- Compartilhamento
- Auth + favoritos
- Pool inicial de frases por universo

**v1.0**
- GIF e figurinhas
- Galeria pública
- Curadoria e votação completa
- Wallpaper

**Futuro**
- Premium
- Mais universos
- Sticker packs por universo
- Versão em inglês / espanhol
- Comunidade

---

## 12. Observações de Design
- A personalidade por universo e por status é o diferencial
- O modo Personalizado é o grande motor de engajamento
- Manter o tom autêntico e "de quem vive o caos"
- Facilitar ao máximo o compartilhamento
- Acessibilidade não pode ser esquecida
