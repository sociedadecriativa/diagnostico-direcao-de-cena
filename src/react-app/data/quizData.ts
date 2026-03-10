export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    letter: string;
    text: string;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Qual das frases abaixo mais descreve onde você está agora?",
    options: [
      { letter: "A", text: "Tenho uma ideia clara mas não consigo fazer ela existir no mundo" },
      { letter: "B", text: "Estou postando conteúdo mas não estou convertendo em clientes ou receita" },
      { letter: "C", text: "Sei o que faço mas não sei como me posicionar pra ser encontrado" },
      { letter: "D", text: "Já tentei várias estratégias e nenhuma funcionou como eu esperava" },
    ],
  },
  {
    id: 2,
    question: "Quando você pensa no seu projeto, qual é a sensação dominante?",
    options: [
      { letter: "A", text: "Ansiedade — tenho medo de começar errado" },
      { letter: "B", text: "Frustração — já começo mas não consigo terminar" },
      { letter: "C", text: "Confusão — não sei por onde começar" },
      { letter: "D", text: "Cansaço — já tentei muito e ainda não deu certo" },
    ],
  },
  {
    id: 3,
    question: "Você tem clareza de quem é o seu cliente ideal?",
    options: [
      { letter: "A", text: "Sim, sei exatamente pra quem é" },
      { letter: "B", text: "Tenho uma ideia, mas é vaga" },
      { letter: "C", text: "Não — tento falar com todo mundo" },
      { letter: "D", text: "Acho que sei, mas nunca validei" },
    ],
  },
  {
    id: 4,
    question: "Qual é o principal problema do seu perfil no Instagram (ou site) hoje?",
    options: [
      { letter: "A", text: "A bio não explica bem o que eu faço" },
      { letter: "B", text: "Posto conteúdo mas não recebo DMs nem clientes" },
      { letter: "C", text: "Não sei como estruturar o funil de vendas" },
      { letter: "D", text: "O perfil não reflete quem eu sou de verdade" },
    ],
  },
  {
    id: 5,
    question: "Com que frequência você publica conteúdo?",
    options: [
      { letter: "A", text: "Todo dia ou quase todo dia" },
      { letter: "B", text: "2 a 3 vezes por semana" },
      { letter: "C", text: "Quando me sinto inspirado — sem consistência" },
      { letter: "D", text: "Raramente ou nunca — esse é o problema" },
    ],
  },
  {
    id: 6,
    question: "Você já investiu em cursos, mentorias ou estratégias de conteúdo antes?",
    options: [
      { letter: "A", text: "Sim, vários — e nada funcionou como eu esperava" },
      { letter: "B", text: "Sim, alguns — aprendi bastante mas ainda tenho gaps" },
      { letter: "C", text: "Pouco — prefiro aprender na prática" },
      { letter: "D", text: "Não — é minha primeira vez buscando ajuda" },
    ],
  },
  {
    id: 7,
    question: "O que você mais precisa agora?",
    options: [
      { letter: "A", text: "Clareza — entender o que está travando e por quê" },
      { letter: "B", text: "Estratégia — saber exatamente o que fazer e em que ordem" },
      { letter: "C", text: "Execução — alguém que me ajude a fazer acontecer, não só planejar" },
      { letter: "D", text: "Resultado rápido — preciso de retorno em semanas, não meses" },
    ],
  },
  {
    id: 8,
    question: "Se você resolvesse esse travamento agora, o que mudaria na sua vida?",
    options: [
      { letter: "A", text: "Começaria a gerar receita com o que já sei fazer" },
      { letter: "B", text: "Pararia de desperdiçar tempo e energia em estratégias que não funcionam" },
      { letter: "C", text: "Me sentiria confiante pra aparecer e falar do meu trabalho" },
      { letter: "D", text: "Finalmente lançaria o projeto que está na minha cabeça há meses (ou anos)" },
    ],
  },
];

export type DiagnosisType = "projeto-travado" | "criador-nao-converte" | "especialista-invisivel";

export interface DiagnosisResult {
  type: DiagnosisType;
  title: string;
  description: string[];
}

export const diagnosisResults: Record<DiagnosisType, DiagnosisResult> = {
  "projeto-travado": {
    type: "projeto-travado",
    title: "O Projeto Travado",
    description: [
      "Você tem o projeto. Tem o conhecimento. Tem a vontade.",
      "O que falta não é inspiração — é estrutura.",
      "",
      "O padrão que identifico aqui: a ideia existe com clareza na sua cabeça, mas na hora de fazer ela existir no mundo, algo trava. Não é bloqueio criativo. É ausência de direção.",
      "",
      "Você está tentando construir o destino sem ter o mapa. E isso esgota muito antes de chegar em algum lugar.",
    ],
  },
  "criador-nao-converte": {
    type: "criador-nao-converte",
    title: "O Criador que Posta mas Não Converte",
    description: [
      "Você está em campo. Está criando. Está aparecendo.",
      "Mas o esforço não está virando resultado — e isso é exaustivo.",
      "",
      "O padrão que identifico aqui: a estratégia de conteúdo está certa na superfície. O problema está mais fundo. Bio que tenta falar com todo mundo, conteúdo sem arco, CTA enterrado no final como se pedir ação fosse vergonhoso.",
      "",
      "Você está otimizando a distribuição de uma mensagem que ainda não está clara. E esse é um problema de posicionamento, não de conteúdo.",
    ],
  },
  "especialista-invisivel": {
    type: "especialista-invisivel",
    title: "O Especialista Invisível",
    description: [
      "Você sabe o que faz. Provavelmente sabe muito.",
      "O problema é que o mercado ainda não sabe disso.",
      "",
      "O padrão que identifico aqui: conhecimento profundo sem linguagem de mercado. Você tem autoridade real mas não tem uma forma de comunicá-la que faça o cliente certo te encontrar.",
      "",
      "Não é falta de talento. É falta de tradução. O que você sabe precisa ser dito de um jeito que a pessoa certa reconheça antes de você terminar a frase.",
    ],
  },
};

export function calculateDiagnosis(answers: Record<number, string>): DiagnosisType {
  const letterCounts = { A: 0, B: 0, C: 0, D: 0 };
  
  Object.values(answers).forEach((letter) => {
    if (letter in letterCounts) {
      letterCounts[letter as keyof typeof letterCounts]++;
    }
  });

  const acCount = letterCounts.A + letterCounts.C;
  const bdCount = letterCounts.B + letterCounts.D;

  // Type 1: Projeto Travado - majority A and C
  // Type 2: Criador que não converte - majority B and D
  // Type 3: Especialista Invisível - majority C and A (same as type 1 but different order check)
  
  if (bdCount > acCount) {
    return "criador-nao-converte";
  } else if (letterCounts.C >= letterCounts.A) {
    return "especialista-invisivel";
  } else {
    return "projeto-travado";
  }
}
