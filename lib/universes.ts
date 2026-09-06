export type Status = {
  label: string;
  color: string;
  bg: string;
  emoji: string;
};

export type UniverseId =
  | "tech"
  | "futebol"
  | "trabalho"
  | "relacionamento"
  | "faculdade"
  | "games"
  | "brasil"
  | "familia";

export type Universe = {
  id: UniverseId;
  name: string;
  shortName: string;
  emoji: string;
  description: string;
  accent: string;
};

export const UNIVERSES: Universe[] = [
  {
    id: "tech",
    name: "Tech",
    shortName: "Tech",
    emoji: "💻",
    description: "Deploy, cache e culpa do estagiário",
    accent: "from-cyan-400 to-fuchsia-400",
  },
  {
    id: "futebol",
    name: "Futebol",
    shortName: "Futebol",
    emoji: "⚽",
    description: "Juiz, VAR e técnico",
    accent: "from-green-400 to-emerald-500",
  },
  {
    id: "trabalho",
    name: "Trabalho / CLT",
    shortName: "Trabalho",
    emoji: "💼",
    description: "Reunião, alinhamento e e-mail",
    accent: "from-blue-400 to-indigo-500",
  },
  {
    id: "relacionamento",
    name: "Relacionamento",
    shortName: "Rela",
    emoji: "💕",
    description: "Mensagem não vista e drama",
    accent: "from-pink-400 to-rose-500",
  },
  {
    id: "faculdade",
    name: "Faculdade",
    shortName: "Facul",
    emoji: "🎓",
    description: "Prova, professor e trabalho em grupo",
    accent: "from-amber-400 to-orange-500",
  },
  {
    id: "games",
    name: "Games",
    shortName: "Games",
    emoji: "🎮",
    description: "Lag, servidor e ranked",
    accent: "from-violet-400 to-purple-500",
  },
  {
    id: "brasil",
    name: "Brasil / Cotidiano",
    shortName: "Brasil",
    emoji: "🇧🇷",
    description: "PIX, luz, trânsito e vida real",
    accent: "from-yellow-400 to-green-500",
  },
  {
    id: "familia",
    name: "Família",
    shortName: "Família",
    emoji: "🏠",
    description: "WhatsApp da família e churrasco",
    accent: "from-orange-400 to-red-500",
  },
];

export const STATUSES: Status[] = [
  { label: "EM CHAMAS", color: "text-red-400", bg: "from-red-500/20 to-orange-500/10", emoji: "🔴" },
  { label: "TENTANDO SE AUTO-CONSERTAR", color: "text-yellow-300", bg: "from-yellow-500/20 to-amber-500/10", emoji: "🟡" },
  { label: "AGUARDANDO MILAGRE", color: "text-cyan-300", bg: "from-cyan-500/20 to-blue-500/10", emoji: "🔵" },
  { label: "FINGINDO QUE TÁ TUDO BEM", color: "text-emerald-300", bg: "from-emerald-500/20 to-green-500/10", emoji: "🟢" },
  { label: "DEU RUIM DE VEZ", color: "text-zinc-400", bg: "from-zinc-500/20 to-zinc-600/10", emoji: "💀" },
  { label: "FANTASMA DO PASSADO", color: "text-purple-300", bg: "from-purple-500/20 to-fuchsia-500/10", emoji: "👻" },
  { label: "REINICIANDO A VIDA", color: "text-orange-300", bg: "from-orange-500/20 to-red-500/10", emoji: "♻️" },
];

// ========== TECH ==========
const TECH_SITUACOES = [
  "WiFi caiu no meio da demo pro cliente",
  "Deploy na sexta 18:07",
  "Banco de dados foi de arrasta",
  "Cliente mandou print do erro no WhatsApp",
  "Produção caiu durante a daily",
  "PR com 147 arquivos changed e 0 descrição",
  "Certificado SSL expirou no domingo",
  "Estagiário apagou o bucket S3 de produção",
  "Merge sem code review",
  "Bug só acontece no iPhone do CEO",
  "Webhook duplicou cobrança 8x",
  "npm install quebrou tudo",
  "Teste passou local, quebrou no CI",
  "Página branca em produção, log vazio",
  "Variável de ambiente com espaço no final",
];

const TECH_DESCULPAS = [
  "funciona na minha máquina",
  "deve ser cache",
  "foi o estagiário que deu push na main",
  "na homologação tava ok",
  "limpa o cache e tenta de novo",
  "é feature, não bug",
  "alguém mexeu no .env",
  "o QA não testou esse fluxo",
  "o Docker subiu torto",
  "é problema de DNS",
  "o token expirou de novo",
  "foi mal, dei force push na main",
  "o Copilot sugeriu e eu confiei",
  "esqueci um console.log em produção",
  "é cache do Cloudflare",
];

const TECH_IA = [
  "Como um modelo de linguagem, não tenho acesso ao seu WiFi, mas tenta reiniciar o roteador.",
  "Estou processando sua solicitação... infinitamente.",
  "Tentarei novamente em 3... 2... Erro 500.",
  "Desculpe, tive uma alucinação e inventei uma API que não existe.",
  "Meu criador não me programou para lidar com deploy na sexta.",
  "Estou 99% confiante que a solução é apagar node_modules e sua carreira.",
  "Isso parece ser um problema XY. Ou YZ. Sei lá.",
  "Vou gerar 3 soluções: todas erradas.",
  "Como IA generativa, gerei um bug generativo pra você.",
  "Reiniciando meu contexto... esqueci tudo que você disse.",
];

// ========== FUTEBOL ==========
const FUTEBOL_SITUACOES = [
  "Perdeu o jogo no último minuto",
  "O juiz inventou um pênalti",
  "O VAR demorou 8 minutos",
  "O técnico tirou o melhor jogador",
  "Choveu e o campo virou lama",
  "O goleiro deixou a bola passar por baixo das pernas",
  "O atacante perdeu um gol feito",
  "O time adversário só defendia",
  "O árbitro expulsou o errado",
  "A torcida invadiu o campo",
];

const FUTEBOL_DESCULPAS = [
  "foi o juiz",
  "no VAR tava ok",
  "o gramado tava ruim",
  "o técnico mandou",
  "faltou sorte",
  "o outro time só se defendia",
  "foi o vento",
  "o juiz é comprado",
  "não teve reposição de bola",
  "o médico liberou o jogador lesionado",
];

const FUTEBOL_IA = [
  "Como IA, eu não apito jogos, mas esse pênalti realmente foi inventado.",
  "Analisei 10 mil replays e continuo sem entender a decisão do VAR.",
  "Sugiro substituir o árbitro por uma inteligência artificial. Ou por um peixe.",
  "O algoritmo do juiz está com overfitting no time da casa.",
  "Detectei uma anomalia estatística chamada 'roubo descarado'.",
];

// ========== TRABALHO ==========
const TRABALHO_SITUACOES = [
  "Reunião que poderia ser um e-mail",
  "O chefe mandou mensagem no domingo",
  "Alguém marcou reunião às 18h de sexta",
  "O prazo era ontem e ninguém avisou",
  "O relatório sumiu do drive",
  "O cliente mudou tudo depois de aprovado",
  "A impressora travou na hora da apresentação",
  "O café acabou no meio da daily",
  "O RH mandou e-mail genérico de feedback",
  "Alguém respondeu all no e-mail errado",
];

const TRABALHO_DESCULPAS = [
  "vamos alinhar isso depois",
  "estava em outra reunião",
  "não vi o e-mail",
  "o prazo era flexível",
  "estava priorizando outra demanda",
  "o cliente mudou o escopo",
  "foi falta de comunicação",
  "estava no home office e caiu a internet",
  "o arquivo não abriu",
  "precisei sair mais cedo",
];

const TRABALHO_IA = [
  "Como IA, eu também odio reunião que poderia ser e-mail.",
  "Sugiro criar um ticket no Jira chamado 'Vida Pessoal' e nunca mais olhar.",
  "Detectei que sua produtividade cai 47% depois das 17h. Coincidência?",
  "A solução é simples: mude de emprego. Ou de planeta.",
  "Estou processando seu burnout... status: crônico.",
];

// ========== RELACIONAMENTO ==========
const RELA_SITUACOES = [
  "Deixou a mensagem no visualizado",
  "Esqueceu o aniversário",
  "Cancelou o encontro em cima da hora",
  "Postou story com outra pessoa",
  "Demorou 3 dias pra responder",
  "Chamou pelo nome do ex",
  "Sumiu depois do primeiro date",
  "Disse que estava trabalhando e estava no bar",
  "Não curtiu a foto nova",
  "Respondeu só com 'k'",
];

const RELA_DESCULPAS = [
  "não vi a mensagem",
  "tava sem bateria",
  "tava ocupado",
  "esqueci o celular em casa",
  "pensei que já tinha respondido",
  "tava com a família",
  "caiu a internet",
  "não foi com má intenção",
  "tava resolvendo umas coisas",
  "depois a gente conversa",
];

const RELA_IA = [
  "Como IA, eu não tenho sentimentos, mas esse 'k' doeu até em mim.",
  "Sugiro uma conversa franca. Ou um bloqueio preventivo.",
  "Detectei padrão de comportamento chamado 'fantasma emocional'.",
  "A probabilidade de ele estar 'ocupado' é de 12%.",
  "Reiniciando meu módulo de esperança... falhou.",
];

// ========== FACULDADE ==========
const FACUL_SITUACOES = [
  "Prova surpresa na segunda de manhã",
  "O professor não postou o material",
  "Trabalho em grupo e só você fez",
  "A chamada foi no primeiro horário",
  "O arquivo do trabalho corrompeu",
  "O professor mudou a data da prova",
  "Caiu a energia na hora de enviar",
  "O monitor não respondeu",
  "A bibliografia era de 1987",
  "O seminário era hoje e ninguém avisou",
];

const FACUL_DESCULPAS = [
  "o professor não explicou",
  "não tinha o material",
  "o grupo não colaborou",
  "tava doente",
  "o ônibus atrasou",
  "o arquivo não abriu",
  "não vi o aviso no moodle",
  "tinha outro trabalho pro mesmo dia",
  "a internet caiu",
  "pensei que era na outra semana",
];

const FACUL_IA = [
  "Como IA, eu também teria pego DP nessa disciplina.",
  "Sugiro copiar do ChatGPT com mais elegância da próxima vez.",
  "Detectei que sua presença na aula é estatisticamente inexistente.",
  "A solução é simples: trancar a matrícula e abrir um food truck.",
  "Estou processando sua desculpa... nível de criatividade: 3/10.",
];

// ========== GAMES ==========
const GAMES_SITUACOES = [
  "Perdeu a ranked por lag",
  "O servidor caiu no meio da partida",
  "O time só ficou AFK",
  "Tomou one-shot de sniper",
  "O jogo atualizou e quebrou tudo",
  "A conta foi hackeada",
  "O amigo desistiu no ranking",
  "A internet caiu no clutch",
  "O patch nerfou a arma principal",
  "Ficou 40 minutos na fila e perdeu",
];

const GAMES_DESCULPAS = [
  "foi lag",
  "o servidor tava instável",
  "meu time é ruim",
  "a mira tava estranha",
  "o oponente tava com aimbot",
  "tava com o controle descarregando",
  "a internet caiu",
  "não era pra eu estar jogando agora",
  "o jogo tá pay to win",
  "foi o matchmaking",
];

const GAMES_IA = [
  "Como IA, eu também teria ragequit nessa partida.",
  "Sugiro culpar o lag. Sempre funciona.",
  "Detectei que seu K/D está em queda livre há 3 seasons.",
  "A solução é simples: desinstalar e tocar grama.",
  "Estou processando sua skill issue... confirmado.",
];

// ========== BRASIL ==========
const BRASIL_SITUACOES = [
  "A luz caiu no meio do jogo",
  "O PIX não caiu",
  "O ônibus não passou",
  "O ifood cancelou o pedido",
  "A internet da operadora caiu de novo",
  "O banco está em manutenção",
  "O trânsito de SP parou",
  "A chuva alagou a rua",
  "O cartão não passou",
  "O WhatsApp caiu nacionalmente",
];

const BRASIL_DESCULPAS = [
  "a luz caiu",
  "o PIX tá demorando",
  "o trânsito tá impossível",
  "a operadora é uma merda",
  "tá chovendo muito",
  "o banco tá instável",
  "o ifood cancelou sozinho",
  "não tinha passagem",
  "o WhatsApp não tava carregando",
  "é o Brasil, né",
];

const BRASIL_IA = [
  "Como IA, eu também sofro com a internet brasileira.",
  "Sugiro aceitar que é o Brasil e seguir em frente.",
  "Detectei instabilidade nacional. Status: normal.",
  "A solução é simples: reclamar no Twitter e nada muda.",
  "Estou processando sua reclamação... fila de espera: 47 anos.",
];

// ========== FAMILIA ==========
const FAMILIA_SITUACOES = [
  "A mãe ligou 14 vezes",
  "O tio mandou corrente no grupo",
  "Esqueceram de avisar do churrasco",
  "A vó perguntou quando vai casar",
  "O primo pediu dinheiro emprestado",
  "A irmã postou foto antiga",
  "O pai mudou a senha do WiFi",
  "A tia mandou fake news",
  "O grupo da família não para de notificar",
  "Alguém contou seu segredo na reunião",
];

const FAMILIA_DESCULPAS = [
  "não vi a ligação",
  "tava sem sinal",
  "pensei que não ia",
  "tinha compromisso",
  "não recebi o convite",
  "tava trabalhando",
  "o celular tava no silencioso",
  "depois eu explico",
  "não foi bem assim",
  "vocês exageraram",
];

const FAMILIA_IA = [
  "Como IA, eu também teria silenciado o grupo da família.",
  "Sugiro criar um grupo só com as pessoas que não mandam corrente.",
  "Detectei pressão familiar em níveis críticos.",
  "A solução é simples: mude de número. Ou de país.",
  "Estou processando a pergunta 'quando vai casar?'... erro 404.",
];

export const PHRASES: Record<
  UniverseId,
  { situacoes: string[]; desculpas: string[]; respostasIA: string[] }
> = {
  tech: { situacoes: TECH_SITUACOES, desculpas: TECH_DESCULPAS, respostasIA: TECH_IA },
  futebol: { situacoes: FUTEBOL_SITUACOES, desculpas: FUTEBOL_DESCULPAS, respostasIA: FUTEBOL_IA },
  trabalho: { situacoes: TRABALHO_SITUACOES, desculpas: TRABALHO_DESCULPAS, respostasIA: TRABALHO_IA },
  relacionamento: { situacoes: RELA_SITUACOES, desculpas: RELA_DESCULPAS, respostasIA: RELA_IA },
  faculdade: { situacoes: FACUL_SITUACOES, desculpas: FACUL_DESCULPAS, respostasIA: FACUL_IA },
  games: { situacoes: GAMES_SITUACOES, desculpas: GAMES_DESCULPAS, respostasIA: GAMES_IA },
  brasil: { situacoes: BRASIL_SITUACOES, desculpas: BRASIL_DESCULPAS, respostasIA: BRASIL_IA },
  familia: { situacoes: FAMILIA_SITUACOES, desculpas: FAMILIA_DESCULPAS, respostasIA: FAMILIA_IA },
};

export function pickRandom<T>(arr: T[], exclude?: T): T {
  if (arr.length <= 1) return arr[0];
  let item: T;
  do {
    item = arr[Math.floor(Math.random() * arr.length)];
  } while (item === exclude && arr.length > 1);
  return item;
}

export type Meme = {
  situacao: string;
  desculpa: string;
  respostaIA: string;
  status: Status;
  id: string;
  universeId: UniverseId;
};

export function generateMeme(universeId: UniverseId, prev?: Meme | null): Meme {
  const pool = PHRASES[universeId];
  return {
    situacao: pickRandom(pool.situacoes, prev?.situacao),
    desculpa: pickRandom(pool.desculpas, prev?.desculpa),
    respostaIA: pickRandom(pool.respostasIA, prev?.respostaIA),
    status: pickRandom(STATUSES, prev?.status),
    id: Math.random().toString(36).slice(2, 7).toUpperCase(),
    universeId,
  };
}

/** Gera várias opções (modo personalizado). Por enquanto usa o pool do universo + pequena variação. */
export function generateCustomOptions(
  universeId: UniverseId,
  context: string,
  count = 6
): Meme[] {
  const options: Meme[] = [];
  const usedIds = new Set<string>();

  // Tenta usar o contexto como situação se for curto o suficiente
  const contextAsSituacao = context.trim().length > 8 && context.trim().length < 80;

  for (let i = 0; i < count; i++) {
    let meme = generateMeme(universeId);
    if (contextAsSituacao && i < 2) {
      // As primeiras opções usam o texto do usuário como situação
      meme = { ...meme, situacao: context.trim() };
    }
    // Garante IDs únicos
    while (usedIds.has(meme.id)) {
      meme = { ...meme, id: Math.random().toString(36).slice(2, 7).toUpperCase() };
    }
    usedIds.add(meme.id);
    options.push(meme);
  }
  return options;
}
