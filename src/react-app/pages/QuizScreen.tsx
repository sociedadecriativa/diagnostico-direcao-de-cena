import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { quizQuestions, calculateDiagnosis } from "../data/quizData";
import { Layout } from "../components/Layout";

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

export function QuizScreen() {
  const { quizAnswers, setQuizAnswer, setCurrentStep, setDiagnosisType } = useApp();
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
      // Last question - save answer then show loading
      setQuizAnswer(question.id, letter);
      setShowLoading(true);
    }
  };

  const handleLoadingComplete = () => {
    const diagnosis = calculateDiagnosis(quizAnswers);
    setDiagnosisType(diagnosis);
    setCurrentStep(2);
  };

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
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-display text-3xl md:text-5xl text-foreground tracking-wider mb-4">
            DIAGNÓSTICO DO SEU PROJETO
          </h1>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            8 perguntas. 3 minutos. Você vai saber exatamente o que está travando.
          </p>
        </div>

        {/* Question counter */}
        <div className="text-center mb-6">
          <span className="text-gold font-display text-lg tracking-widest">
            {currentQuestion + 1} / {totalQuestions}
          </span>
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
