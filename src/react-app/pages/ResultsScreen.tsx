import { useState } from "react";
import { useApp, PackageType } from "../context/AppContext";
import { Layout } from "../components/Layout";
import { diagnosisResults } from "../data/quizData";

const PACKAGE_LINKS = {
  analise: "https://pay.kiwify.com.br/e6EpYu8",
  "analise-implementacao": "https://pay.kiwify.com.br/9dR7DzV",
};

// ─── Diagnosis Block ──────────────────────────────────────────────────────────

function DiagnosisBlock() {
  const { diagnosisType } = useApp();
  const result = diagnosisType ? diagnosisResults[diagnosisType] : null;

  if (!result) return null;

  return (
    <section className="mb-16 md:mb-24">
      <div className="text-center mb-8">
        <p className="font-body text-xs text-gold uppercase tracking-widest mb-3">
          Resultado do diagnóstico
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-foreground tracking-wider mb-3">
          {result.title}
        </h2>
        <p className="font-body text-base md:text-lg text-muted-foreground">
          {result.subtitle}
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <div className="bg-card border border-border-subtle p-6 md:p-10">
          {result.description.map((line, index) => (
            <p
              key={index}
              className={`font-body text-base md:text-lg leading-relaxed ${
                line === "" ? "h-4" : "text-foreground/90"
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="border border-red-900/40 bg-red-950/10 p-6 md:p-8">
          <p className="font-display text-xs text-red-400/80 uppercase tracking-widest mb-4">
            O que continua acontecendo se nada mudar
          </p>
          {result.costOfInaction.map((line, index) => (
            <p
              key={index}
              className={`font-body text-sm leading-relaxed ${
                line === "" ? "h-3" : "text-foreground/60"
              }`}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof Block ───────────────────────────────────────────────────────
// 💡 Atualize os números abaixo conforme seu histórico real de clientes.

function SocialProofBlock() {
  return (
    <section className="mb-16 md:mb-20 border-y border-border-subtle py-8 md:py-10">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        {[
          { num: "30+", label: "criadores analisados" },
          { num: "10", label: "dimensões por projeto" },
          { num: "100%", label: "análises feitas por João Paulo" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-display text-4xl md:text-5xl text-gold mb-1">{item.num}</p>
            <p className="font-body text-xs text-muted-foreground uppercase tracking-widest">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Testimonial placeholder — substitua pelo print/depoimento real */}
      <div className="max-w-lg mx-auto mt-8 border border-border-subtle p-6 text-center">
        <p className="font-body text-sm text-foreground/80 leading-relaxed italic mb-3">
          "Eu sabia que algo estava errado, mas não conseguia nomear. O João Paulo nomeou em 10 minutos de análise o que eu não consegui ver em 2 anos."
        </p>
        <p className="font-body text-xs text-gold uppercase tracking-widest">
          — Criadora de conteúdo, nicho de desenvolvimento pessoal
        </p>
      </div>
    </section>
  );
}

// ─── Bridge Block ─────────────────────────────────────────────────────────────

function BridgeBlock() {
  return (
    <section className="mb-16 md:mb-24 border-t border-border-subtle pt-16">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-body text-xs text-gold uppercase tracking-widest mb-4">
          O que muda com um diagnóstico real
        </p>
        <h2 className="font-display text-2xl md:text-4xl text-foreground tracking-wider mb-6">
          A diferença entre saber que tem um problema<br className="hidden md:block" /> e saber exatamente qual é.
        </h2>
        <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
          Você já sabe que algo não está funcionando. O diagnóstico que você acabou de fazer confirma isso.
        </p>
        <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
          O que a maioria das pessoas faz a seguir: busca mais conteúdo. Assiste mais aulas. Segue mais perfis. Testa mais estratégias no escuro.
        </p>
        <p className="font-body text-base text-foreground leading-relaxed font-medium">
          O que funciona de verdade: ter alguém que analisa o seu caso — o seu perfil, o seu conteúdo, o seu posicionamento — e te diz exatamente o que está travando e o que fazer primeiro.
        </p>
      </div>
    </section>
  );
}

// ─── Deliverables Block ───────────────────────────────────────────────────────

function DeliverableCard({
  number,
  title,
  tag,
  lines,
}: {
  number: string;
  title: string;
  tag: string;
  lines: string[];
}) {
  return (
    <div className="bg-card border border-border-subtle p-6 md:p-8">
      <div className="flex items-start justify-between mb-4">
        <span className="font-display text-gold text-4xl md:text-5xl leading-none">{number}</span>
        <span className="font-body text-xs text-muted-foreground uppercase tracking-wider border border-border-subtle px-2 py-1">
          {tag}
        </span>
      </div>
      <h3 className="font-display text-xl md:text-2xl text-foreground tracking-wider mb-4">
        {title}
      </h3>
      <div className="space-y-2">
        {lines.map((line, index) => (
          <p key={index} className="font-body text-sm text-foreground/80 leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function DeliverablesBlock() {
  return (
    <section className="mb-16 md:mb-24">
      <div className="text-center mb-10">
        <p className="font-body text-xs text-gold uppercase tracking-widest mb-3">
          O que você recebe
        </p>
        <h2 className="font-display text-2xl md:text-4xl text-foreground tracking-wider">
          ANÁLISE DE PERFIL
        </h2>
        <p className="font-body text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
          Não é uma mentoria genérica. Não é um curso. É uma análise cirúrgica do seu caso — com plano de ação real.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <DeliverableCard
          number="01"
          title="ROTEIRO ESTRATÉGICO"
          tag="PDF 30–50 páginas"
          lines={[
            "Análise completa do seu perfil em 10 dimensões: identidade criativa, posicionamento, redes sociais, conteúdo, marca pessoal, monetização, autoridade, audiência, crescimento e plano de ação.",
            "",
            "— Bio analisada e reescrita com duas propostas",
            "— Seus últimos 12 posts avaliados: o que funcionou e por quê",
            "— Funil mapeado: onde o visitante chega, o que faz, onde sai",
            "— Os 3 gaps estratégicos com 3 ações concretas cada",
            "— Pauta de 30 dias de conteúdo personalizada",
            "",
            "Você recebe este documento antes da sessão ao vivo.",
          ]}
        />
        <DeliverableCard
          number="02"
          title="CENA COMENTADA"
          tag="Vídeo 15–20 minutos"
          lines={[
            "João Paulo gravando a tela enquanto analisa o seu perfil em tempo real.",
            "",
            "Você vê exatamente o que ele vê quando chega no seu perfil. O que chamou atenção primeiro. O que travou o olhar. O que um visitante novo pensa antes de decidir seguir ou sair.",
            "",
            "É o diagnóstico em vídeo — mais direto que qualquer relatório.",
          ]}
        />
        <DeliverableCard
          number="03"
          title="SESSÃO DE DIREÇÃO"
          tag="1 hora ao vivo — Google Meet"
          lines={[
            "Você chega com o Roteiro Estratégico e a Cena Comentada em mãos. A sessão não é para explicar o diagnóstico — é para executar.",
            "",
            "Uma hora focada em responder suas dúvidas, ajustar a estratégia e sair com clareza total sobre o que fazer primeiro.",
            "",
            "Você sai da call sabendo exatamente o passo 1.",
          ]}
        />
      </div>
    </section>
  );
}

// ─── Analysis Areas Block ─────────────────────────────────────────────────────

const ANALYSIS_AREAS = [
  { num: "01", title: "Identidade Criativa", desc: "Quem você é, como pensa e como isso deve aparecer no seu conteúdo" },
  { num: "02", title: "Posicionamento", desc: "O que você oferece, para quem e como se diferencia de todos os outros" },
  { num: "03", title: "Auditoria de Redes", desc: "Instagram, TikTok, YouTube ou site — o que está funcionando e o que está afastando" },
  { num: "04", title: "Análise de Conteúdo", desc: "Seus 12 últimos posts avaliados: padrão, tom, arco narrativo e potencial de conversão" },
  { num: "05", title: "Marca Pessoal Visual", desc: "Identidade visual, consistência e se a estética está a serviço da mensagem" },
  { num: "06", title: "Estratégia de Monetização", desc: "Como você está gerando receita hoje e quais são os gaps que deixam dinheiro na mesa" },
  { num: "07", title: "Construção de Autoridade", desc: "Como você demonstra expertise e o que falta para ser reconhecido no seu nicho" },
  { num: "08", title: "Psicologia de Audiência", desc: "Quem está te seguindo, o que espera de você e por que não está comprando" },
  { num: "09", title: "Plano de Crescimento", desc: "Estratégia de curto, médio e longo prazo específica para o seu projeto" },
  { num: "10", title: "Próximos 7 Dias", desc: "As 3 ações concretas que você faz primeiro — sem opção de procrastinar" },
];

function AnalysisAreasBlock() {
  return (
    <section className="mb-16 md:mb-24 bg-card border border-border-subtle p-8 md:p-12">
      <div className="text-center mb-10">
        <p className="font-body text-xs text-gold uppercase tracking-widest mb-3">
          O que João Paulo analisa
        </p>
        <h2 className="font-display text-2xl md:text-3xl text-foreground tracking-wider">
          10 DIMENSÕES DO SEU PROJETO
        </h2>
        <p className="font-body text-sm text-muted-foreground mt-3">
          Nenhuma área fica de fora. O diagnóstico é completo.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {ANALYSIS_AREAS.map((area) => (
          <div key={area.num} className="flex gap-4 p-4 border border-border-subtle/50 hover:border-gold/30 transition-colors">
            <span className="font-display text-gold/60 text-sm flex-shrink-0 w-6">{area.num}</span>
            <div>
              <p className="font-display text-sm text-foreground tracking-wider mb-1">{area.title}</p>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">{area.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Guarantee Block ──────────────────────────────────────────────────────────

function GuaranteeBlock() {
  return (
    <section className="mb-16 md:mb-24">
      <div className="max-w-2xl mx-auto border border-gold/30 p-8 md:p-10 text-center">
        <p className="font-display text-gold text-xs uppercase tracking-widest mb-4">Garantia</p>
        <h3 className="font-display text-xl md:text-2xl text-foreground tracking-wider mb-4">
          SE VOCÊ SAIR SEM CLAREZA,<br />NÃO VALEU A PENA.
        </h3>
        <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
          A Análise de Perfil foi construída para entregar diagnóstico real e plano de ação concreto. Se você fizer a sessão e sentir que não recebeu clareza sobre o que está travando e o que fazer — João Paulo devolve o valor integralmente.
        </p>
        <p className="font-body text-sm text-foreground/60">
          Sem burocracia. Sem negociação. Você pede, ele devolve.
        </p>
      </div>
    </section>
  );
}

// ─── Pricing Block ────────────────────────────────────────────────────────────

function PricingCard({
  title,
  price,
  priceNote,
  description,
  features,
  buttonStyle,
  isFeatured,
  badge,
  onClick,
}: {
  title: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  buttonStyle: "outline" | "solid";
  isFeatured?: boolean;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <div
      className={`relative bg-card border p-6 md:p-8 flex flex-col ${
        isFeatured ? "border-gold" : "border-border-subtle"
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-6 bg-gold text-deep-black font-body text-xs font-medium px-3 py-1 uppercase tracking-wider">
          {badge}
        </span>
      )}

      <h3 className="font-display text-xl md:text-2xl text-foreground tracking-wider mb-2">
        {title}
      </h3>
      <div className="mb-1">
        <span className="font-display text-3xl md:text-4xl text-gold">{price}</span>
      </div>
      {priceNote && (
        <p className="font-body text-xs text-muted-foreground mb-4">{priceNote}</p>
      )}
      <p className="font-body text-sm text-muted-foreground mb-6 leading-relaxed">{description}</p>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="font-body text-sm text-foreground/80 flex items-start gap-2">
            <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        className={`w-full py-4 font-display text-base tracking-wider transition-all duration-200 ${
          buttonStyle === "solid"
            ? "bg-gold text-deep-black hover:bg-gold/90"
            : "border border-gold text-gold hover:bg-gold hover:text-deep-black"
        }`}
      >
        QUERO ESTA →
      </button>
    </div>
  );
}

function PurchaseModal({
  isOpen,
  onClose,
  onContinue,
}: {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/85" onClick={onClose} />
      <div className="relative bg-card border border-gold/50 p-8 max-w-md w-full">

        {/* Top indicator */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <p className="font-body text-xs text-gold uppercase tracking-widest">
            Pagamento aberto em nova aba
          </p>
        </div>

        <h3 className="font-display text-2xl text-foreground tracking-wider mb-3">
          Próximo passo: o briefing.
        </h3>
        <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
          João Paulo lê o briefing antes de tocar no seu perfil. Quanto mais você detalhar agora, mais cirúrgica fica a análise.
        </p>
        <p className="font-body text-sm text-foreground/70 leading-relaxed mb-8">
          Leva menos de 10 minutos. Você pode terminar o pagamento depois — o briefing fica salvo.
        </p>

        <button
          onClick={onContinue}
          className="w-full py-4 bg-gold text-deep-black font-display text-base tracking-wider hover:bg-gold/90 transition-colors mb-3"
        >
          PREENCHER BRIEFING AGORA →
        </button>

        <button
          onClick={onClose}
          className="w-full py-2 font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Terminar o pagamento primeiro
        </button>
      </div>
    </div>
  );
}

function PricingBlock() {
  const { setSelectedPackage, setCurrentStep } = useApp();
  const [showModal, setShowModal] = useState(false);

  const handlePackageSelect = (pkg: PackageType) => {
    setSelectedPackage(pkg);
    if (pkg) {
      window.open(PACKAGE_LINKS[pkg], "_blank");
    }
    setShowModal(true);
  };

  const handleContinueToBriefing = () => {
    setShowModal(false);
    setCurrentStep(4);
  };

  return (
    <section className="mb-16 md:mb-24">
      <div className="text-center mb-10">
        <p className="font-body text-xs text-gold uppercase tracking-widest mb-3">
          Escolha o que faz sentido pra você agora
        </p>
        <h2 className="font-display text-2xl md:text-4xl text-foreground tracking-wider">
          INVISTA NA CLAREZA
        </h2>
        <p className="font-body text-sm text-muted-foreground mt-3 max-w-lg mx-auto">
          O custo de continuar sem diagnóstico é maior que qualquer um dos dois preços abaixo.
        </p>
      </div>

      {/* Scarcity banner */}
      <div className="max-w-4xl mx-auto mb-6 border border-gold/40 bg-gold/5 px-6 py-4 flex items-center justify-center gap-3">
        <span className="text-gold text-sm">⚡</span>
        <p className="font-body text-sm text-foreground/80 text-center">
          A análise é feita manualmente por João Paulo. Máximo de{" "}
          <strong className="text-foreground">8 análises por mês</strong> — para garantir a qualidade de cada entrega.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <PricingCard
          title="ANÁLISE DE PERFIL"
          price="R$ 797"
          priceNote="pagamento único · valor de mercado: R$ 1.100"
          description="Para quem quer o diagnóstico completo e o plano de ação com clareza total."
          features={[
            "Roteiro Estratégico — PDF 30 a 50 páginas  →  R$ 500",
            "Análise de 10 dimensões do seu projeto",
            "Bio reescrita com 2 propostas",
            "Seus últimos 12 posts avaliados",
            "Pauta de 30 dias personalizada",
            "Cena Comentada — vídeo 15 a 20 min  →  R$ 200",
            "Sessão de Direção ao vivo — 1 hora  →  R$ 400",
            "Garantia de clareza ou devolução",
          ]}
          buttonStyle="outline"
          onClick={() => handlePackageSelect("analise")}
        />
        <PricingCard
          title="ANÁLISE + IMPLEMENTAÇÃO"
          price="R$ 1.197"
          priceNote="pagamento único · valor de mercado: R$ 1.700"
          description="Para quem quer o diagnóstico E sair da sessão com algo concreto feito — não só planejado."
          features={[
            "Tudo da Análise de Perfil  →  R$ 1.100",
            "Sessão de Implementação 90 minutos  →  R$ 600",
            "Você sai da call com algo construído na hora:",
            "— Bio reescrita ao vivo",
            "— OU funil desenhado",
            "— OU primeiro Reel roteirizado",
            "Implementação acontece durante a sessão",
            "Não depois. Na hora.",
          ]}
          buttonStyle="solid"
          isFeatured
          badge="Mais completo"
          onClick={() => handlePackageSelect("analise-implementacao")}
        />
      </div>

      <p className="text-center mt-8 font-body text-sm text-muted-foreground">
        Na Análise você sai sabendo o que fazer.
        <br />
        Na Análise + Implementação você sai com algo já feito.
      </p>

      <div className="text-center mt-8">
        <p className="font-body text-sm text-muted-foreground mb-2">
          Não tem certeza qual escolher?
        </p>
        <a
          href="https://wa.me/5531935008395"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-sm text-gold hover:underline"
        >
          Fala com João Paulo no WhatsApp →
        </a>
      </div>

      <PurchaseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onContinue={handleContinueToBriefing}
      />
    </section>
  );
}

// ─── FAQ Block ────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Em quanto tempo recebo o diagnóstico?",
    a: "João Paulo entrega o Roteiro Estratégico e a Cena Comentada em até 5 dias úteis após o briefing. A sessão ao vivo é agendada depois disso.",
  },
  {
    q: "É para qualquer tipo de criador?",
    a: "É para criadores que têm um projeto, produto ou serviço e querem construir um negócio real em torno disso. Não é para quem quer crescer no Instagram só por crescer.",
  },
  {
    q: "Precisa ter muitos seguidores?",
    a: "Não. A análise funciona independente do tamanho atual do perfil. O que importa é que você tenha algo a oferecer e queira fazer isso funcionar.",
  },
  {
    q: "Já fiz vários cursos e mentorias. Isso é diferente?",
    a: "Sim. Cursos ensinam frameworks genéricos. A Análise de Perfil analisa o seu caso específico — o seu projeto, o seu conteúdo, o seu posicionamento. O diagnóstico é só seu.",
  },
  {
    q: "E se eu não gostar do resultado?",
    a: "Se você fizer a sessão e sentir que não recebeu clareza sobre o que está travando e o que fazer, João Paulo devolve o valor integralmente. Sem negociação.",
  },
];

function FAQBlock() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mb-16 md:mb-24">
      <div className="text-center mb-10">
        <p className="font-body text-xs text-gold uppercase tracking-widest mb-3">
          Perguntas frequentes
        </p>
        <h2 className="font-display text-2xl md:text-3xl text-foreground tracking-wider">
          O QUE VOCÊ PRECISA SABER
        </h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-2">
        {FAQ_ITEMS.map((item, index) => (
          <div key={index} className="border border-border-subtle">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-card/50 transition-colors"
            >
              <span className="font-body text-sm md:text-base text-foreground">{item.q}</span>
              <span className="font-display text-gold text-lg flex-shrink-0">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5">
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Program Block (upsell) ───────────────────────────────────────────────────

function ProgramBlock() {
  return (
    <section className="border-t border-border-subtle pt-12 mb-12">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-body text-sm text-muted-foreground mb-4">
          Quer algo mais aprofundado?
        </p>
        <h3 className="font-display text-xl md:text-2xl text-foreground tracking-wider mb-4">
          PROGRAMA DE EXECUÇÃO CRIATIVA INDIVIDUAL
        </h3>
        <p className="font-body text-base text-muted-foreground mb-6">
          4 semanas de acompanhamento intenso.
          <br />
          Vamos tirar sua ideia da cabeça e colocar no mundo?
        </p>
        <a
          href="https://sociedadecriativa.com/programa-de-estrategia-criativa-individual-desbloqueio-criativo"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-sm text-gold hover:underline"
        >
          Saiba mais →
        </a>
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function ResultsScreen() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <DiagnosisBlock />
        <SocialProofBlock />
        <BridgeBlock />
        <DeliverablesBlock />
        <AnalysisAreasBlock />
        <GuaranteeBlock />
        <PricingBlock />
        <FAQBlock />
        <ProgramBlock />
      </div>
    </Layout>
  );
}
