import { useState } from "react";
import { useApp, PackageType } from "../context/AppContext";
import { Layout } from "../components/Layout";
import { diagnosisResults } from "../data/quizData";

const PACKAGE_LINKS = {
  analise: "https://pay.kiwify.com.br/e6EpYu8",
  "analise-implementacao": "https://pay.kiwify.com.br/9dR7DzV",
};

function DiagnosisBlock() {
  const { diagnosisType } = useApp();
  const result = diagnosisType ? diagnosisResults[diagnosisType] : null;

  if (!result) return null;

  return (
    <section className="mb-16 md:mb-24">
      <h2 className="font-display text-2xl md:text-4xl text-foreground tracking-wider mb-8 text-center">
        SEU DIAGNÓSTICO
      </h2>
      
      <div className="max-w-2xl mx-auto">
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
        
        <p className="mt-8 text-center font-body text-lg md:text-xl text-gold">
          A Direção de Cena existe para isso.
        </p>
      </div>
    </section>
  );
}

function ServiceCard({
  number,
  title,
  subtitle,
  content,
}: {
  number: string;
  title: string;
  subtitle: string;
  content: string[];
}) {
  return (
    <div className="bg-card border border-border-subtle p-6 md:p-8">
      <span className="font-display text-gold text-4xl md:text-5xl">{number}</span>
      <h3 className="font-display text-xl md:text-2xl text-foreground tracking-wider mt-4 mb-2">
        {title}
      </h3>
      <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-6">
        {subtitle}
      </p>
      <div className="space-y-3">
        {content.map((line, index) => (
          <p key={index} className="font-body text-sm text-foreground/80 leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function ServicesBlock() {
  return (
    <section className="mb-16 md:mb-24">
      <h2 className="font-display text-2xl md:text-4xl text-foreground tracking-wider mb-4 text-center">
        O QUE VOCÊ RECEBE
      </h2>
      <p className="font-body text-sm md:text-base text-muted-foreground text-center max-w-xl mx-auto mb-10">
        Uma análise estratégica completa do seu perfil — não um curso, não uma mentoria genérica. Um diagnóstico real com plano de ação.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <ServiceCard
          number="01"
          title="ROTEIRO ESTRATÉGICO"
          subtitle="PDF de 8 a 12 páginas"
          content={[
            "Tudo que está travando o seu perfil, mapeado por escrito.",
            "— Bio analisada e reescrita com duas propostas",
            "— Seus últimos 12 posts avaliados: o que funcionou, o que não funcionou e por quê",
            "— Funil mapeado: onde o visitante chega, o que ele faz, onde sai",
            "— Os 3 gaps estratégicos principais com 3 ações concretas cada",
            "— Pauta de 30 dias de conteúdo personalizada para o seu projeto",
            "",
            "Você recebe este documento antes da sessão ao vivo.",
          ]}
        />
        <ServiceCard
          number="02"
          title="CENA COMENTADA"
          subtitle="Vídeo gravado de 15 a 20 minutos"
          content={[
            "João Paulo gravando a tela enquanto analisa o seu perfil em tempo real.",
            "Você vê exatamente o que ele vê quando chega no seu perfil. O que chamou atenção primeiro. O que travou o olhar. O que um visitante novo pensa antes de decidir seguir ou sair.",
            "É o diagnóstico em vídeo — mais direto que qualquer relatório.",
          ]}
        />
        <ServiceCard
          number="03"
          title="SESSÃO DE DIREÇÃO"
          subtitle="30 min ao vivo via Google Meet"
          content={[
            "Você já chega com o Roteiro Estratégico e a Cena Comentada em mãos. A sessão não é para explicar o diagnóstico — é para executar.",
            "Você sai da call sabendo exatamente o que fazer primeiro.",
          ]}
        />
      </div>
    </section>
  );
}

function PricingCard({
  title,
  price,
  description,
  features,
  buttonStyle,
  isFeatured,
  onClick,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonStyle: "outline" | "solid";
  isFeatured?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`relative bg-card border p-6 md:p-8 flex flex-col ${
        isFeatured ? "border-gold" : "border-border-subtle"
      }`}
    >
      {isFeatured && (
        <span className="absolute -top-3 left-6 bg-gold text-deep-black font-body text-xs font-medium px-3 py-1 uppercase tracking-wider">
          Mais completo
        </span>
      )}
      
      <h3 className="font-display text-xl md:text-2xl text-foreground tracking-wider mb-2">
        {title}
      </h3>
      <p className="font-display text-3xl md:text-4xl text-gold mb-4">{price}</p>
      <p className="font-body text-sm text-muted-foreground mb-6">{description}</p>
      
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="font-body text-sm text-foreground/80 flex items-start gap-2">
            <span className="text-gold mt-0.5">✓</span>
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
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative bg-card border border-border-subtle p-8 max-w-md w-full">
        <h3 className="font-display text-2xl text-foreground tracking-wider mb-4">
          Ótima escolha.
        </h3>
        <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
          Enquanto você finaliza o pagamento na outra aba, preencha o briefing abaixo.
          João Paulo já chega preparado para a sua sessão.
        </p>
        <button
          onClick={onContinue}
          className="w-full py-4 bg-gold text-deep-black font-display text-base tracking-wider hover:bg-gold/90 transition-colors"
        >
          PREENCHER BRIEFING →
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
    
    // Open payment link
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
      <h2 className="font-display text-2xl md:text-4xl text-foreground tracking-wider mb-10 text-center">
        ESCOLHA O QUE FAZ SENTIDO PRA VOCÊ AGORA
      </h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <PricingCard
          title="ANÁLISE DE PERFIL"
          price="R$ 797"
          description="Para quem quer o diagnóstico completo e o plano de ação."
          features={[
            "Roteiro Estratégico (PDF 8–12 páginas)",
            "Cena Comentada (vídeo 15–20 min)",
            "Sessão de Direção ao vivo (30 min)",
            "Pauta de 30 dias personalizada",
            "Bio reescrita com 2 propostas",
          ]}
          buttonStyle="outline"
          onClick={() => handlePackageSelect("analise")}
        />
        <PricingCard
          title="ANÁLISE + IMPLEMENTAÇÃO"
          price="R$ 1.197"
          description="Para quem quer o diagnóstico E sair da sessão com algo concreto feito."
          features={[
            "Tudo da Análise de Perfil",
            "Sessão de Implementação de 90 minutos",
            "Você sai da call com algo construído na hora:",
            "— Bio reescrita ao vivo",
            "— OU funil desenhado",
            "— OU primeiro Reel roteirizado",
            "A implementação acontece durante a sessão — não depois",
          ]}
          buttonStyle="solid"
          isFeatured
          onClick={() => handlePackageSelect("analise-implementacao")}
        />
      </div>

      <p className="text-center mt-8 font-body text-sm text-muted-foreground">
        Na Análise você sai sabendo o que fazer.
        <br />
        Na Análise + Implementação você sai com algo já feito.
      </p>

      <div className="text-center mt-8">
        <p className="font-body text-sm text-muted-foreground mb-2">Não tem certeza qual escolher?</p>
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

function ProgramBlock() {
  return (
    <section className="border-t border-border-subtle pt-12">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-body text-sm text-muted-foreground mb-4">Quer algo mais aprofundado?</p>
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

export function ResultsScreen() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <DiagnosisBlock />
        <ServicesBlock />
        <PricingBlock />
        <ProgramBlock />
      </div>
    </Layout>
  );
}
