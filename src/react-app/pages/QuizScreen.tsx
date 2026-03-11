import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { quizQuestions, calculateDiagnosis } from "../data/quizData";
import { Layout } from "../components/Layout";

// âââ Loading Transition âââââââââââââââââââââââââââââââââââââââââââââââââââââââ

function LoadingTransition({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <p className="font-display text-2xl md:text-3xl text-foreground tracking-wider mb-8">
        Analisando suas respostas
      </p>
      <div className="flex space-x-2">
        <span className="w-3 h-3 rounded-full bg-gold animate-pulse-dot" />
        <span className="w-3 h-3 rounded-full bg-gold animate-pulse-dot-delay-1" />
        <span className="w-3 h-3 rounded-full bg-gold animate-pulse-dot-delay-2" />
      </div>
    </div>
  );
}

// âââ Intro Screen âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20 flex-1 flex flex-col items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">

          {/* Eyebrow */}
          <p className="font-body text-xs text-gold uppercase tracking-widest mb-6">
            DiagnÃ³stico gratuito Â· 3 minutos
          </p>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-6xl text-foreground tracking-wider mb-6 leading-tight">
            SEU PROJETO<br />
            <span className="text-gold">NÃO ESTÃ TRAVADO</span><br />
            POR ACASO.
          </h1>

          {/* Sub */}
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-4 max-w-lg mx-auto">
            Existe um padrÃ£o especÃ­fico por trÃ¡s de cada tipo de travamento. 8 perguntas sÃ£o suficientes para identificar o seu.
          </p>
          <p className="font-body text-base text-foreground leading-relaxed mb-10 max-w-lg mx-auto">
            No final, vocÃª recebe o diagnÃ³stico do seu caso â com o custo real de nÃ£o resolver isso agora.
          </p>

          {/* What you'll discover */}
          <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg mx-auto">
            {[
              { label: "Qual padrÃ£o estÃ¡ te travando" },
              { label: "Por que as tentativas anteriores nÃ£o funcionaram" },
              { label: "O que fazer primeiro para sair disso" },
            ].map((item, i) => (
              <div key={i} className="border border-border-subtle p-4 text-center">
                <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={onStart}
            className="w-full max-w-sm mx-auto block py-5 bg-gold text-deep-black font-display text-xl tracking-wider hover:bg-gold/90 transition-all duration-200"
          >
            COMEÃAR O DIAGNÃSTICO â
          </button>

          {/* Trust note */}
          <p className="font-body text-xs text-muted-foreground mt-5">
            Gratuito. Sem cadastro antes do resultado.
          </p>

        </div>
      </div>
    </Layout>
  );
}

// âââ Quiz Screen ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ

export function QuizScreen() {
  const { quizAnswers, setQuizAnswer, setCurrentStep, setDiagnosisType } = useApp();
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [fadeClass, setFadeClass] = useState("opacity-100");

  const question = quizQuestions[currentQuestion];
  const totalQuestions = quizQuestions.length;

  const handleAnswer = (letter: string) => {
    setQuizAnswer(question.id, letter);

    if (currentQuestion < totalQuestions - 1) {
      setIsTransitioning(true);
      setFadeClass("opacity-0 translate-x-4");

      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setFadeClass("opacity-0 -translate-x-4");

        setTimeout(() => {
          setFadeClass("opacity-100 translate-x-0");
          setIsTransitioning(false);
        }, 50);
      }, 300);
    } else {
      setQuizAnswer(question.id, letter);
      setShowLoading(true);
    }
  };

  const handleLoadingComplete = () => {
    const diagnosis = calculateDiagnosis(quizAnswers);
    setDiagnosisType(diagnosis);
    setCurrentStep(2);
  };

  // Show intro before quiz starts
  if (showIntro) {
    return <IntroScreen onStart={() => setShowIntro(false)} />;
  }

  if (showLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <LoadingTransition onComplete={handleLoadingComplete} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12 flex-1 flex flex-col">

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-xs text-muted-foreground uppercase tracking-widest">
              DiagnÃ³stico do seu projeto
            </span>
            <span className="font-display text-gold text-sm tracking-widest">
              {currentQuestion + 1} / {totalQuestions}
            </span>
          </div>
          <div className="w-full h-px bg-border-subtle">
            <div
              className="h-px bg-gold transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div
          className={`flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full transition-all duration-300 ease-out ${fadeClass}`}
        >
          <h2 className="font-body text-lg md:text-xl text-foreground text-center mb-8 md:mb-12 leading-relaxed">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 md:space-y-4">
            {question.options.map((option) => (
              <button
                key={option.letter}
                onClick={() => !isTransitioning && handleAnswer(option.letter)}
                disabled={isTransitioning}
                className="w-full text-left p-4 md:p-5 bg-card border border-border-subtle rounded-sm
                  hover:border-gold hover:bg-surface transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background
                  disabled:opacity-50 disabled:cursor-not-allowed
                  group"
              >
                <div className="flex items-start gap-4">
                  <span className="font-display text-gold text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                    {option.letter}
                  </span>
                  <span className="font-body text-sm md:text-base text-foreground leading-relaxed">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}
