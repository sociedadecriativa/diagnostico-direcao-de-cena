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
    question: "Qual das frases abaixo mais descreve onde vocÃª estÃ¡ agora?",
    options: [
      { letter: "A", text: "Tenho uma ideia clara mas nÃ£o consigo fazer ela existir no mundo" },
      { letter: "B", text: "Estou postando conteÃºdo mas nÃ£o estou convertendo em clientes ou receita" },
      { letter: "C", text: "Sei o que faÃ§o mas nÃ£o sei como me posicionar pra ser encontrado" },
      { letter: "D", text: "JÃ¡ tentei vÃ¡rias estratÃ©gias e nenhuma funcionou como eu esperava" },
    ],
  },
  {
    id: 2,
    question: "Quando vocÃª pensa no seu projeto, qual Ã© a sensaÃ§Ã£o dominante?",
    options: [
      { letter: "A", text: "Ansiedade â tenho medo de comeÃ§ar errado" },
      { letter: "B", text: "FrustraÃ§Ã£o â jÃ¡ comeÃ§o mas nÃ£o consigo terminar" },
      { letter: "C", text: "ConfusÃ£o â nÃ£o sei por onde comeÃ§ar" },
      { letter: "D", text: "CansaÃ§o â jÃ¡ tentei muito e ainda nÃ£o deu certo" },
    ],
  },
  {
    id: 3,
    question: "VocÃª tem clareza de quem Ã© o seu cliente ideal?",
    options: [
      { letter: "A", text: "Sim, sei exatamente pra quem Ã©" },
      { letter: "B", text: "Tenho uma ideia, mas Ã© vaga" },
      { letter: "C", text: "NÃ£o â tento falar com todo mundo" },
      { letter: "D", text: "Acho que sei, mas nunca validei" },
    ],
  },
  {
    id: 4,
    question: "Qual Ã© o principal problema do seu perfil no Instagram (ou site) hoje?",
    options: [
      { letter: "A", text: "A bio nÃ£o explica bem o que eu faÃ§o" },
      { letter: "B", text: "Posto conteÃºdo mas nÃ£o recebo DMs nem clientes" },
      { letter: "C", text: "NÃ£o sei como estruturar o funil de vendas" },
      { letter: "D", text: "O perfil nÃ£o reflete quem eu sou de verdade" },
    ],
  },
  {
    id: 5,
    question: "Com que frequÃªncia vocÃª publica conteÃºdo?",
    options: [
      { letter: "A", text: "Todo dia ou quase todo dia" },
      { letter: "B", text: "2 a 3 vezes por semana" },
      { letter: "C", text: "Quando me sinto inspirado â sem consistÃªncia" },
      { letter: "D", text: "Raramente ou nunca â esse Ã© o problema" },
    ],
  },
  {
    id: 6,
    question: "VocÃª jÃ¡ investiu em cursos, mentorias ou estratÃ©gias de conteÃºdo antes?",
    options: [
      { letter: "A", text: "Sim, vÃ¡rios â e nada funcionou como eu esperava" },
      { letter: "B", text: "Sim, alguns â aprendi bastante mas ainda tenho gaps" },
      { letter: "C", text: "Pouco â prefiro aprender na prÃ¡tica" },
      { letter: "D", text: "NÃ£o â Ã© minha primeira vez buscando ajuda" },
    ],
  },
  {
    id: 7,
    question: "O que vocÃª mais precisa agora?",
    options: [
      { letter: "A", text: "Clareza â entender o que estÃ¡ travando e por quÃª" },
      { letter: "B", text: "EstratÃ©gia â saber exatamente o que fazer e em que ordem" },
      { letter: "C", text: "ExecuÃ§Ã£o â alguÃ©m que me ajude a fazer acontecer, nÃ£o sÃ³ planejar" },
      { letter: "D", text: "Resultado rÃ¡pido â preciso de retorno em semanas, nÃ£o meses" },
    ],
  },
  {
    id: 8,
    question: "Se vocÃª resolvesse esse travamento agora, o que mudaria na sua vida?",
    options: [
      { letter: "A", text: "ComeÃ§aria a gerar receita com o que jÃ¡ sei fazer" },
      { letter: "B", text: "Pararia de desperdiÃ§ar tempo e energia em estratÃ©gias que nÃ£o funcionam" },
      { letter: "C", text: "Me sentiria confiante pra aparecer e falar do meu trabalho" },
      { letter: "D", text: "Finalmente lanÃ§aria o projeto que estÃ¡ na minha cabeÃ§a hÃ¡ meses (ou anos)" },
    ],
  },
];

export type DiagnosisType = "projeto-travado" | "criador-nao-converte" | "especialista-invisivel";

export interface DiagnosisResult {
  type: DiagnosisType;
  title: string;
  subtitle: string;
  description: string[];
  costOfInaction: string[];
}

export const diagnosisResults: Record<DiagnosisType, DiagnosisResult> = {
  "projeto-travado": {
    type: "projeto-travado",
    title: "O Projeto Travado",
    subtitle: "A ideia existe. A execuÃ§Ã£o some.",
    description: [
      "VocÃª tem o projeto. Tem o conhecimento. Tem a vontade.",
      "O que falta nÃ£o Ã© inspiraÃ§Ã£o â Ã© estrutura.",
      "",
      "O padrÃ£o que identifico aqui: a ideia existe com clareza na sua cabeÃ§a, mas na hora de fazer ela existir no mundo, algo trava. NÃ£o Ã© bloqueio criativo. Ã ausÃªncia de direÃ§Ã£o.",
      "",
      "VocÃª estÃ¡ tentando construir um destino sem ter o mapa. E isso esgota muito antes de chegar em algum lugar.",
      "",
      "A questÃ£o nÃ£o Ã© se vocÃª Ã© capaz. VocÃª claramente Ã©. A questÃ£o Ã© que capacidade sem direÃ§Ã£o vira um motor ligado sem ter para onde ir â consome tudo e nÃ£o sai do lugar.",
    ],
    costOfInaction: [
      "Mais seis meses de tentativas sem sistema. Outro curso que vocÃª comeÃ§a mas nÃ£o termina. A sensaÃ§Ã£o de que o projeto estÃ¡ sempre \"quase pronto\" mas nunca no ar.",
      "",
      "E o pior: cada mÃªs que passa, a janela de oportunidade fecha um pouco mais. NÃ£o porque o mercado mudou â porque vocÃª perdeu o impulso.",
    ],
  },
  "criador-nao-converte": {
    type: "criador-nao-converte",
    title: "O Criador que Posta mas NÃ£o Converte",
    subtitle: "O esforÃ§o estÃ¡ lÃ¡. O resultado, nÃ£o.",
    description: [
      "VocÃª estÃ¡ em campo. EstÃ¡ criando. EstÃ¡ aparecendo.",
      "Mas o esforÃ§o nÃ£o estÃ¡ virando resultado â e isso Ã© exaustivo.",
      "",
      "O padrÃ£o que identifico aqui: a estratÃ©gia de conteÃºdo parece certa na superfÃ­cie. O problema estÃ¡ mais fundo. Bio que tenta falar com todo mundo. ConteÃºdo sem arco narrativo. CTA enterrado no final como se pedir aÃ§Ã£o fosse vergonhoso.",
      "",
      "VocÃª estÃ¡ distribuindo bem uma mensagem que ainda nÃ£o estÃ¡ clara. E esse Ã© um problema de posicionamento, nÃ£o de conteÃºdo.",
      "",
      "Curtidas nÃ£o pagam boleto. Seguidores que nÃ£o viram clientes sÃ£o audiÃªncia, nÃ£o negÃ³cio.",
    ],
    costOfInaction: [
      "Continuar postando no escuro, queimando energia criativa sem retorno. A conta bancÃ¡ria nÃ£o sente os likes. E a cada mÃªs que passa sem conversÃ£o, a motivaÃ§Ã£o vai embora junto.",
      "",
      "Existe um ponto onde criadores talentosos param de criar porque nunca foi recompensado. VocÃª nÃ£o chegou lÃ¡ ainda â `mas estÃ¡ no caminho se o padrÃ£o nÃ£o mudar.",
    ],
  },
  "especialista-invisivel": {
    type: "especialista-invisivel",
    title: "O Especialista InvisÃ­vel",
    subtitle: "VocÃª sabe demais para estar invisÃ­vel.",
    description: [
      "VocÃª sabe o que faz. Provavelmente sabe muito.",
      "O problema Ã© que o mercado ainda nÃ£o sabe disso.",
      "",
      "O padrÃ£o que identifico aqui: conhecimento profundo sem linguagem de mercado. VocÃª tem autoridade real, mas nÃ£o tem uma forma de comunicÃ¡-la que faÃ§a o cliente certo te encontrar â e reconhecer o valor antes mesmo de perguntar o preÃ§o.",
      "",
      "NÃ£o Ã© falta de talento. Ã falta de traduÃ§Ã£o.",
      "",
      "O que vocÃª sabe precisa ser dito de um jeito que a pessoa certa reconheÃ§a antes de vocÃª terminar a frase. Hoje nÃ£o estÃ¡. E enquanto nÃ£o estiver, um profissional mais mediano com melhor posicionamento vai continuar levando os seus clientes.",
    ],
    costOfInaction: [
      "Continuar sendo subestimado por quem nÃ£o entende o que vocÃª faz â e aceitar isso como normal. Projetos abaixo do seu nÃ­vel. PreÃ§os abaixo do que vocÃª merece. Clientes que nÃ£o valorizam o que vocÃª entrega.",
      "",
      "A invisibilidade nÃ£o Ã© passiva. Ela custa. Custa em receita, em autoridade, em oportunidades que foram para outro lugar.",
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
  // Type 2: Criador que nÃ£o converte - majority B and D
  // Type 3: Especialista InvisÃ­vel - majority C and A (same as type 1 but different order check)
  
  if (bdCount > acCount) {
    return "criador-nao-converte";
  } else if (letterCounts.C >= letterCounts.A) {
    return "especialista-invisivel";
  } else {
    return "projeto-travado";
  }
}
