import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Layout } from "../components/Layout";

interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "textarea";
  required?: boolean;
  prefilled?: boolean;
}

const sections: { title: string; fields: FormField[] }[] = [
  {
    title: "SEU PROJETO",
    fields: [
      {
        id: "projectDescription",
        label: "Descreva o que você faz em uma frase",
        placeholder: "Ajudo X a alcançar Y através de Z",
        required: true,
      },
      {
        id: "mainProduct",
        label: "Qual é o seu produto ou serviço principal?",
        placeholder: "Seja específico: nome, formato, preço, para quem é",
        type: "textarea",
        required: true,
      },
      {
        id: "idealClient",
        label: "Quem é o cliente que você quer atrair?",
        placeholder: "Descreva a pessoa, não o nicho",
        type: "textarea",
        required: true,
      },
      {
        id: "clientBenefit",
        label: "O que essa pessoa ganha ao trabalhar com você?",
        placeholder: "O resultado concreto, não a promessa genérica",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    title: "SEU PERFIL HOJE",
    fields: [
      {
        id: "currentMetrics",
        label: "Como estão suas métricas hoje?",
        placeholder: "Seguidores, engajamento, DMs por semana, vendas por mês",
        type: "textarea",
        required: true,
      },
      {
        id: "bestContent",
        label: "Qual conteúdo seu performou melhor? Por que você acha que foi?",
        type: "textarea",
        required: true,
        placeholder: "",
      },
      {
        id: "worstContent",
        label: "Qual conteúdo ficou abaixo do esperado?",
        type: "textarea",
        required: true,
        placeholder: "",
      },
    ],
  },
  {
    title: "O PROBLEMA REAL",
    fields: [
      {
        id: "currentBlocker",
        label: "O que você acredita que está travando seu perfil ou projeto agora?",
        placeholder: "Pode ser honesto — não precisa parecer profissional aqui",
        type: "textarea",
        required: true,
      },
      {
        id: "idealResult",
        label: "Qual seria o resultado ideal depois de 30 dias trabalhando juntos?",
        placeholder: "Seja específico: DMs, vendas, seguidores, clareza, lançamento...",
        type: "textarea",
        required: true,
      },
      {
        id: "dontTouch",
        label: "Tem alguma coisa que você NÃO quer que eu fale ou mexa?",
        placeholder: "Opcional — mas importante saber",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    title: "ACESSO",
    fields: [
      {
        id: "instagramLink",
        label: "Link do seu Instagram",
        placeholder: "@seuinstagram",
        prefilled: true,
        required: true,
      },
      {
        id: "siteLink",
        label: "Link do seu site (se tiver)",
        placeholder: "seusite.com.br",
        required: false,
      },
      {
        id: "additionalInfo",
        label: "Há algo mais que eu precisaria saber antes da sessão?",
        placeholder: "Contexto, histórico, tentativas anteriores...",
        type: "textarea",
        required: false,
      },
    ],
  },
];

export function BriefingScreen() {
  const { userData, briefingData, setBriefingData, setCurrentStep } = useApp();
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // Initialize prefilled fields
  const getFieldValue = (fieldId: string) => {
    if (fieldId === "instagramLink" && !briefingData.instagramLink) {
      return userData.instagram;
    }
    return briefingData[fieldId as keyof typeof briefingData] || "";
  };

  const handleChange = (fieldId: string, value: string) => {
    setBriefingData({ [fieldId]: value });
    if (errors[fieldId]) {
      setErrors((prev) => ({ ...prev, [fieldId]: false }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    let isValid = true;

    sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.required) {
          const value = getFieldValue(field.id);
          if (!value || value.trim() === "") {
            newErrors[field.id] = true;
            isValid = false;
          }
        }
      });
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Make sure instagram is saved
    if (!briefingData.instagramLink) {
      setBriefingData({ instagramLink: userData.instagram });
    }
    
    if (validateForm()) {
      setCurrentStep(5);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">

        {/* Welcome message */}
        <div className="max-w-2xl mx-auto mb-10 border border-gold/40 bg-gold/5 p-6 md:p-8">
          <p className="font-body text-xs text-gold uppercase tracking-widest mb-3">
            Compra confirmada ✓
          </p>
          <p className="font-body text-base text-foreground leading-relaxed mb-2">
            Boa escolha, <strong>{userData.name}</strong>.
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            João Paulo lê o briefing antes de tocar no seu perfil. As respostas abaixo moldam o diagnóstico inteiro — não existe resposta certa ou errada, existe resposta honesta. Leva uns 10 minutos. Vale cada um.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="font-body text-xs text-muted-foreground uppercase tracking-widest">
              Progresso do briefing
            </p>
            <p className="font-body text-xs text-gold">
              {sections.length} seções
            </p>
          </div>
          <div className="flex gap-1">
            {sections.map((s, i) => (
              <div
                key={i}
                className="flex-1 h-1 transition-colors duration-300"
                style={{
                  backgroundColor: i <= Math.floor(
                    Object.values(briefingData).filter(v => v && v.trim()).length /
                    (sections.reduce((acc, sec) => acc + sec.fields.filter(f => f.required).length, 0) / sections.length)
                  ) ? 'var(--color-gold, #C9A84C)' : 'var(--color-border, #2a2a2a)'
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {sections.map((s, i) => (
              <p key={i} className="font-body text-xs text-muted-foreground/60" style={{ fontSize: '10px' }}>
                {s.title.split(' ')[0]}
              </p>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          {sections.map((section, sectionIndex) => (
            <div key={section.title} className={sectionIndex > 0 ? "mt-12" : ""}>
              <div className="flex items-center gap-3 mb-6">
                <span className="font-display text-gold/50 text-sm">
                  {String(sectionIndex + 1).padStart(2, '0')}
                </span>
                <h2 className="font-display text-lg text-gold tracking-wider">
                  {section.title}
                </h2>
                <span className="font-body text-xs text-muted-foreground">
                  de {sections.length}
                </span>
              </div>
              
              <div className="space-y-6">
                {section.fields.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block font-body text-sm text-foreground mb-2"
                    >
                      {field.label}
                      {!field.required && (
                        <span className="text-muted-foreground ml-1">(opcional)</span>
                      )}
                    </label>
                    
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.id}
                        value={getFieldValue(field.id)}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        rows={4}
                        className={`w-full px-4 py-3.5 bg-card border rounded-sm font-body text-base text-foreground
                          placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                          transition-colors resize-none ${
                            errors[field.id] ? "border-deep-red" : "border-border-subtle"
                          }`}
                      />
                    ) : (
                      <input
                        type="text"
                        id={field.id}
                        value={getFieldValue(field.id)}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className={`w-full px-4 py-3.5 bg-card border rounded-sm font-body text-base text-foreground
                          placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                          transition-colors ${
                            errors[field.id] ? "border-deep-red" : "border-border-subtle"
                          }`}
                      />
                    )}
                    
                    {errors[field.id] && (
                      <p className="mt-1.5 text-sm text-deep-red font-body">
                        Este campo é obrigatório
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Submit button */}
          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-4 bg-gold text-deep-black font-display text-lg tracking-wider hover:bg-gold/90 transition-colors"
            >
              ENVIAR BRIEFING E AGENDAR →
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
