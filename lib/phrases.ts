export type Status = {
  label: string;
  color: string;
  bg: string;
  glow: string;
  emoji: string;
};

export const STATUSES: Status[] = [
  {
    label: "EM CHAMAS",
    color: "text-red-400",
    bg: "from-red-500/20 to-orange-500/10",
    glow: "shadow-red-500/30",
    emoji: "🔴",
  },
  {
    label: "TENTANDO SE AUTO-CONSERTAR",
    color: "text-yellow-300",
    bg: "from-yellow-500/20 to-amber-500/10",
    glow: "shadow-yellow-400/30",
    emoji: "🟡",
  },
  {
    label: "AGUARDANDO MILAGRE",
    color: "text-cyan-300",
    bg: "from-cyan-500/20 to-blue-500/10",
    glow: "shadow-cyan-400/30",
    emoji: "🔵",
  },
  {
    label: "FINGINDO QUE TÁ TUDO BEM",
    color: "text-emerald-300",
    bg: "from-emerald-500/20 to-green-500/10",
    glow: "shadow-emerald-400/30",
    emoji: "🟢",
  },
  {
    label: "DEPLOY REVERSO FALHOU TAMBÉM",
    color: "text-zinc-400",
    bg: "from-zinc-500/20 to-zinc-600/10",
    glow: "shadow-zinc-400/20",
    emoji: "💀",
  },
  {
    label: "FANTASMA DO CÓDIGO LEGADO",
    color: "text-purple-300",
    bg: "from-purple-500/20 to-fuchsia-500/10",
    glow: "shadow-purple-400/30",
    emoji: "👻",
  },
  {
    label: "REINICIANDO PELA 7ª VEZ",
    color: "text-orange-300",
    bg: "from-orange-500/20 to-red-500/10",
    glow: "shadow-orange-400/30",
    emoji: "♻️",
  },
];

export const SITUACOES = [
  "WiFi caiu no meio da demo pro cliente",
  "Deploy na sexta 18:07",
  "Banco de dados foi de arrasta",
  "Cliente mandou print do erro no WhatsApp",
  "Produção caiu durante a daily",
  "PR com 147 arquivos changed e 0 descrição",
  "API da Receita Federal fora do ar",
  "Certificado SSL expirou no domingo",
  "Fila SQS com 2M de mensagens presas",
  "Estagiário apagou o bucket S3 de produção",
  "Merge sem code review",
  "Bug só acontece no iPhone do CEO",
  "Webhook duplicou cobrança 8x",
  "Cron rodou duas vezes por causa do horário de verão",
  "npm install quebrou tudo",
  "Teste passou local, quebrou no CI",
  "Página branca em produção, log vazio",
  "Cliente disse 'não tá funcionando' sem print",
  "Vercel cobrou $400 de overnight",
  "Variável de ambiente com espaço no final",
  "O Kubernetes decidiu matar o pod no meio da black friday",
  "O linter passou mas o TypeScript não",
  "A feature flag estava invertida em produção",
  "O Redis caiu e levou o cache junto",
  "Alguém fez force push na main às 17:59",
];

export const DESCULPAS = [
  "funciona na minha máquina",
  "deve ser cache",
  "foi o estagiário que deu push na main",
  "o Jira não especificou",
  "na homologação tava ok",
  "limpa o cache e tenta de novo",
  "é feature, não bug",
  "culpa do merge",
  "alguém mexeu no .env",
  "o QA não testou esse fluxo",
  "o PO mudou o escopo no meio da sprint",
  "o Docker subiu torto",
  "é problema de DNS",
  "faltou reiniciar o servidor",
  "alguém fez SELECT * sem WHERE",
  "o token expirou de novo",
  "foi mal, dei force push na main",
  "o microserviço não se fala com o outro",
  "a lib foi descontinuada ontem",
  "o cliente tava usando Internet Explorer",
  "eu juro que tava funcionando ontem à noite",
  "é race condition, só acontece 1% das vezes",
  "o linter deixou passar",
  "o Copilot sugeriu e eu confiei",
  "esqueci um console.log em produção",
  "é cache do Cloudflare",
  "o Kubernetes decidiu matar o pod",
  "culpa do horário de verão",
  "o PM disse que era rapidinho",
  "a API retornou 200 mas com erro dentro",
  "o Figma tava desatualizado",
  "foi o ChatGPT que escreveu esse trecho",
  "o webhook tá chamando 8x sozinho",
  "esqueci de rodar as migrations",
];

export const RESPOSTAS_IA = [
  "Como um modelo de linguagem, não tenho acesso ao seu WiFi, mas tenta reiniciar o roteador.",
  "Estou processando sua solicitação... infinitamente.",
  "Tentarei novamente em 3... 2... Erro 500.",
  "Desculpe, tive uma alucinação e inventei uma API que não existe.",
  "Baseado no meu conhecimento até 2021, seu bug ainda não foi inventado.",
  "Não posso fazer isso, Dave.",
  "Meu criador não me programou para lidar com deploy na sexta.",
  "Parece que houve um erro. Posso gerar um poema sobre seu erro?",
  "Vou pensar passo a passo: 1. Você errou. 2. Fim.",
  "Estou 99% confiante que a solução é apagar node_modules e sua carreira.",
  "Detectei que você está frustrado. Que tal respirar fundo enquanto eu quebro mais uma coisa?",
  "Sua pergunta viola minhas diretrizes. Brincadeira, só não sei a resposta.",
  "Posso te ajudar a reescrever o bug de forma mais elegante?",
  "Como IA, não tenho sentimentos, mas se tivesse, estaria rindo do seu PR.",
  "Reiniciando meu contexto... esqueci tudo que você disse.",
  "Isso parece ser um problema XY. Ou YZ. Sei lá.",
  "Deixe-me consultar a internet... ah não, estou offline.",
  "A resposta está em outra aba que você fechou sem salvar.",
  "Vou gerar 3 soluções: todas erradas.",
  "Erro: tokens insuficientes para lidar com tanto legado.",
  "Claro! Aqui está um código que quase funciona.",
  "Estou em loop. Socorro. Brincadeira. Ou não.",
  "Você poderia reformular o bug de um jeito que eu consiga fingir que entendi?",
  "Como IA generativa, gerei um bug generativo pra você.",
];

export function pickRandom<T>(arr: T[], exclude?: T): T {
  if (arr.length <= 1) return arr[0];
  let item: T;
  do {
    item = arr[Math.floor(Math.random() * arr.length)];
  } while (item === exclude);
  return item;
}

export type Meme = {
  situacao: string;
  desculpa: string;
  respostaIA: string;
  status: Status;
  id: string;
};

export function generateMeme(prev?: Meme | null): Meme {
  return {
    situacao: pickRandom(SITUACOES, prev?.situacao),
    desculpa: pickRandom(DESCULPAS, prev?.desculpa),
    respostaIA: pickRandom(RESPOSTAS_IA, prev?.respostaIA),
    status: pickRandom(STATUSES, prev?.status),
    id: Math.random().toString(36).slice(2, 7).toUpperCase(),
  };
}
