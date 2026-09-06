# Blueprint Completo — BugMeme (v2)

## 1. Visão Geral

**Nome:** BugMeme  
**Tagline:** Gerador de memes de tech que não funciona (e agora reage ao caos)

**Objetivo**  
Site público e viral que gera memes de desculpas de programador + respostas de IA + situações caóticas. Com animações e efeitos visuais/sonoros **condicionais ao status gerado**, exportação de GIF e figurinhas de WhatsApp.

**Problema que resolve**  
Falta de material rápido, visualmente impactante e “compartilhável” sobre o caos do dia a dia de quem trabalha com tecnologia.

**Público-alvo**  
Qualquer pessoa de tech (devs, QAs, PMs, designers, gestores, estudantes).

**Modelo de negócio**  
- Gratuito e aberto no lançamento (foco em viralização)
- Monetização futura: doações, Premium leve, anúncios discretos

**Nível de complexidade**  
Produto completo desde o início, com forte ênfase em experiência interativa e compartilhamento.

---

## 2. Personas e Perfis

| Perfil              | Permissões principais                                      |
|---------------------|------------------------------------------------------------|
| Visitante anônimo   | Gerar, baixar imagem/GIF, compartilhar, gerar wallpaper   |
| Usuário cadastrado  | + Favoritos, histórico, sugerir frases, votar             |
| Curador             | Aprovar/rejeitar frases (IA + humanas)                    |
| Administrador       | Tudo + métricas + configurações globais                   |

---

## 3. Arquitetura de Navegação

- **Público:** Home (Gerador) | Explorar | Sobre | Apoiar
- **Logado:** + Favoritos | Histórico | Enviar frase | Configurações
- Mobile-first com bottom navigation / drawer
- Auth completa (e-mail + Google + GitHub) + recuperação de senha

---

## 4. Módulos e Funcionalidades

### 4.1 Gerador Principal (o coração)
- Botão “GERAR BUG” com personalidade (foge, treme, muda de humor)
- Contador global + sessão
- **Sistema de Status Reativo**:
  - Cada status tem:
    - Cor dominante
    - Animação de entrada
    - Partículas / efeitos
    - Som específico
    - Variação de tipografia/glow
- Entrada cinematográfica do card do meme
- Micro-interações em todos os botões

### 4.2 Exportação Avançada
- Imagem estática (Stories 9:16, Feed 1:1 e 4:5, Twitter 16:9)
- **GIF / WebP animado** (loop de 2–3 segundos com o efeito do status)
- **Figurinha de WhatsApp** (estática + animada)
- Wallpaper (estático e versão animada opcional)
- Nome de arquivo inteligente + watermark discreto (removível no Premium)

### 4.3 Compartilhamento
- WhatsApp (texto + imagem/GIF/figurinha)
- Instagram (Stories/Feed)
- Twitter/X e LinkedIn
- Web Share API nativa
- Copiar texto formatado

### 4.4 Sistema de Conteúdo (IA + Curadoria)
- Pool inicial de alta qualidade
- Geração sob demanda com IA
- Sugestão de frases por usuários
- Moderação humana + votação
- Categorias e tags

### 4.5 Galeria / Explorar
- Mais gerados, mais compartilhados, mais recentes
- Filtro por status e categoria
- “Gerar a partir deste”

### 4.6 Conta, Moderação e Admin
- Favoritos, histórico, preferências (som, efeitos, animações)
- Fila de moderação
- Painel administrativo com métricas

---

## 5. Design System & Experiência Visual

### Cores (refinadas)
- Fundo base: `#07070b` → `#0a0b12`
- Accent principal: Ciano `#67e8f9` + Fúcsia `#e879f9`
- Status-specific:
  - Em Chamas → Vermelho/Laranja
  - Aguardando Milagre → Ciano/Dourado
  - Fantasma → Roxo/Transparente
  - etc.

### Tipografia
- Display: Space Grotesk
- Mono: JetBrains Mono
- Hierarquia clara e tracking intencional

### Animações (prioridade alta)
- Entrada do meme (scale + glitch + fade)
- Partículas e efeitos por status
- Transições suaves de estado
- Feedback tátil (quando possível)
- Modo “reduzir movimento” (acessibilidade)

### Som
- Sons contextuais por status
- Volume baixo por padrão
- Toggle fácil + preferência salva

---

## 6. Aspectos Legais (LGPD)
- Termos de Uso + Política de Privacidade
- Consentimento no cadastro
- Direitos do titular (acesso, exclusão, portabilidade)
- Moderação de conteúdo gerado por IA e usuários
- Cookie banner mínimo

---

## 7. Modelo de Dados (visão de alto nível)

- User
- Phrase (type, text, category, source, status, votes…)
- GeneratedMeme (com referência aos 4 elementos + unique_code)
- Favorite / Vote
- ExportLog (para métricas de download/compartilhamento)
- SystemConfig

---

## 8. Fluxos Principais
1. Visitante gera → vê animação do status → baixa GIF/figurinha → compartilha
2. Usuário salva favorito e sugere frase
3. Moderação de frases
4. Geração de Wallpaper / Sticker Pack
5. Auth completa + onboarding leve

---

## 9. Requisitos Técnicos
- Next.js + React + Tailwind + Framer Motion (animações)
- Canvas / html-to-image + biblioteca de GIF
- Auth (Clerk ou NextAuth + Google/GitHub)
- Banco: PostgreSQL (Neon/Supabase)
- IA para geração de frases
- Deploy: Vercel
- Rate limiting + proteção básica

---

## 10. Roadmap

**MVP (lançamento)**
- Gerador completo com status reativo + animações
- Download de imagem + GIF
- Figurinha de WhatsApp (pelo menos estática)
- Compartilhamento completo
- Auth + favoritos
- Pool inicial + geração com IA
- LGPD básico

**v1.0**
- Figurinhas animadas
- Galeria pública
- Sistema de votação e curadoria completo
- Wallpaper animado
- Painel de moderação

**Futuro**
- Premium (sem watermark, mais templates, API)
- Sticker Pack completo
- Versão em inglês
- Comunidade

---

## 11. Observações de Design
- A personalidade visual/sonora por status é o diferencial principal
- Tudo deve facilitar o compartilhamento (é o motor de crescimento)
- Manter o tom autêntico e “de quem sofre com deploy na sexta”
- Acessibilidade (reduzir movimento) não pode ser esquecida
