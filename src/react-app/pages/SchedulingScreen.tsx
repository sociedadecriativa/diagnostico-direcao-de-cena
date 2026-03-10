import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Layout } from "../components/Layout";
import { diagnosisResults } from "../data/quizData";

const PACKAGE_LINKS = {
  analise: "https://pay.kiwify.com.br/e6EpYu8",
  "analise-implementacao": "https://pay.kiwify.com.br/9dR7DzV",
};

const PACKAGE_NAMES = {
  analise: "Análise de Perfil (R$ 797)",
  "analise-implementacao": "Análise + Implementação (R$ 1.197)",
};

export function SchedulingScreen() {
  const { userData, diagnosisType, selectedPackage, scheduledDateTime, setScheduledDateTime } = useApp();
  const [hasScheduled, setHasScheduled] = useState(false);
  const [hasSentWhatsApp, setHasSentWhatsApp] = useState(false);

  const diagnosisTitle = diagnosisType ? diagnosisResults[diagnosisType].title : "";
  const packageName = selectedPackage ? PACKAGE_NAMES[selectedPackage] : "";
  const paymentLink = selectedPackage ? PACKAGE_LINKS[selectedPackage] : "";

  const generateWhatsAppMessage = () => {
    const message = `Olá João Paulo! Me chamo ${userData.name}.

Fiz o diagnóstico Direção de Cena e escolhi o pacote ${packageName}.

Meu diagnóstico: ${diagnosisTitle}

Meu Instagram/site: ${userData.instagram}

Agendei para: ${scheduledDateTime || "A confirmar"}

Já preenchi o briefing completo. Aguardo sua confirmação!`;

    return encodeURIComponent(message);
  };

  const handleScheduleConfirm = () => {
    setHasScheduled(true);
  };

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/5531935008395?text=${generateWhatsAppMessage()}`;
    window.open(whatsappUrl, "_blank");
    setHasSentWhatsApp(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {!hasSentWhatsApp ? (
          <>
            {/* Scheduling Section */}
            <section className="mb-12 md:mb-16">
              <div className="text-center mb-8">
                <h1 className="font-display text-3xl md:text-5xl text-foreground tracking-wider mb-4">
                  AGENDE SUA SESSÃO
                </h1>
                <p className="font-body text-base md:text-lg text-muted-foreground max-w-lg mx-auto">
                  Escolha a data e horário que funcionam melhor pra você.
                </p>
              </div>

              <div className="max-w-xl mx-auto">
                <div className="bg-card border border-border-subtle p-6 md:p-8 mb-6">
                  <p className="font-body text-sm text-muted-foreground mb-4">
                    Pacote escolhido:
                  </p>
                  <p className="font-display text-xl text-gold mb-6">{packageName}</p>
                  
                  <p className="font-body text-sm text-muted-foreground mb-2">
                    Duração da sessão:
                  </p>
                  <p className="font-body text-base text-foreground mb-6">
                    {selectedPackage === "analise-implementacao" ? "90 minutos" : "30 minutos"}
                  </p>

                  <label className="block font-body text-sm text-muted-foreground mb-2">
                    Data e horário preferido:
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledDateTime}
                    onChange={(e) => setScheduledDateTime(e.target.value)}
                    className="w-full px-4 py-3.5 bg-background border border-border-subtle rounded-sm font-body text-base text-foreground
                      focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-colors"
                  />
                  
                  <p className="mt-4 font-body text-xs text-muted-foreground">
                    João Paulo confirmará a disponibilidade pelo WhatsApp.
                  </p>
                </div>

                {!hasScheduled ? (
                  <button
                    onClick={handleScheduleConfirm}
                    disabled={!scheduledDateTime}
                    className={`w-full py-4 font-display text-base tracking-wider transition-colors ${
                      scheduledDateTime
                        ? "bg-gold text-deep-black hover:bg-gold/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    CONFIRMAR HORÁRIO →
                  </button>
                ) : (
                  <div className="space-y-4">
                    {/* WhatsApp Button */}
                    <button
                      onClick={handleWhatsAppClick}
                      className="w-full py-4 bg-whatsapp text-white font-display text-base tracking-wider hover:bg-whatsapp/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      ENVIAR CONFIRMAÇÃO PARA JOÃO PAULO →
                    </button>

                    {/* Payment link if needed */}
                    {paymentLink && (
                      <div className="text-center">
                        <p className="font-body text-sm text-muted-foreground mb-2">
                          Ainda não finalizou o pagamento?
                        </p>
                        <a
                          href={paymentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-sm text-gold hover:underline"
                        >
                          FINALIZAR PAGAMENTO →
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          </>
        ) : (
          /* Confirmation Section */
          <section className="text-center py-12 md:py-20">
            <h1 className="font-display text-3xl md:text-5xl text-foreground tracking-wider mb-6">
              TUDO CERTO.
            </h1>
            <p className="font-body text-base md:text-lg text-muted-foreground max-w-lg mx-auto mb-12 leading-relaxed">
              João Paulo já recebeu sua mensagem e vai confirmar o agendamento em até 24 horas.
              <br /><br />
              Enquanto isso, acompanhe conteúdo que vai fazer sentido diferente depois da análise:
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <a
                href="https://www.instagram.com/joaopaulosico/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 border border-gold text-gold font-display text-base tracking-wider hover:bg-gold hover:text-deep-black transition-colors text-center"
              >
                VER NO INSTAGRAM →
              </a>
              <a
                href="https://wa.me/5531935008395"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-4 bg-whatsapp text-white font-display text-base tracking-wider hover:bg-whatsapp/90 transition-colors text-center"
              >
                FALAR PELO WHATSAPP →
              </a>
            </div>

            {/* Payment reminder */}
            {paymentLink && (
              <div className="mt-12 pt-8 border-t border-border-subtle max-w-md mx-auto">
                <p className="font-body text-sm text-muted-foreground mb-2">
                  Ainda não finalizou o pagamento?
                </p>
                <a
                  href={paymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-gold hover:underline"
                >
                  FINALIZAR PAGAMENTO →
                </a>
              </div>
            )}
          </section>
        )}
        
        {/* Support */}
        <div className="text-center mt-12 pt-8 border-t border-border-subtle">
          <p className="font-body text-xs text-muted-foreground">
            Precisa de ajuda? Entre em contato:{" "}
            <a href="mailto:contato@sociedadecriativa.com" className="text-gold hover:underline">
              contato@sociedadecriativa.com
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
