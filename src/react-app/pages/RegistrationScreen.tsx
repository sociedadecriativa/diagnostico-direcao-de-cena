import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Layout } from "../components/Layout";

function formatPhone(value: string): string {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  }
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const numbers = phone.replace(/\D/g, "");
  return numbers.length >= 10 && numbers.length <= 11;
}

export function RegistrationScreen() {
  const { userData, setUserData, setCurrentStep } = useApp();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: string, value: string) => {
    if (field === "whatsapp") {
      value = formatPhone(value);
    }
    setUserData({ [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case "name":
        if (!userData.name.trim()) {
          newErrors.name = "Nome é obrigatório";
        } else if (userData.name.trim().length < 2) {
          newErrors.name = "Nome muito curto";
        } else {
          newErrors.name = "";
        }
        break;
      case "whatsapp":
        if (!userData.whatsapp) {
          newErrors.whatsapp = "WhatsApp é obrigatório";
        } else if (!isValidPhone(userData.whatsapp)) {
          newErrors.whatsapp = "Número inválido";
        } else {
          newErrors.whatsapp = "";
        }
        break;
      case "email":
        if (!userData.email) {
          newErrors.email = "E-mail é obrigatório";
        } else if (!isValidEmail(userData.email)) {
          newErrors.email = "E-mail inválido";
        } else {
          newErrors.email = "";
        }
        break;
      case "instagram":
        if (!userData.instagram.trim()) {
          newErrors.instagram = "Instagram ou site é obrigatório";
        } else {
          newErrors.instagram = "";
        }
        break;
    }

    setErrors(newErrors);
    return !newErrors[field];
  };

  const validateAll = () => {
    const fields = ["name", "whatsapp", "email", "instagram"];
    let isValid = true;
    
    fields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    
    setTouched({ name: true, whatsapp: true, email: true, instagram: true });
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) {
      setCurrentStep(3);
    }
  };

  const isFormValid =
    userData.name.trim().length >= 2 &&
    isValidPhone(userData.whatsapp) &&
    isValidEmail(userData.email) &&
    userData.instagram.trim().length > 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12 flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="font-display text-3xl md:text-5xl text-foreground tracking-wider mb-4">
            QUASE LÁ
          </h1>
          <p className="font-body text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Para revelar o diagnóstico, preciso de algumas informações.
            <br />
            Prometo: sem spam, sem lista de e-mail, sem pitch imediato.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full flex-1 flex flex-col">
          <div className="space-y-5 flex-1">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block font-body text-sm text-muted-foreground mb-2">
                Nome
              </label>
              <input
                type="text"
                id="name"
                value={userData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder="Seu nome completo"
                className={`w-full px-4 py-3.5 bg-card border rounded-sm font-body text-base text-foreground
                  placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                  transition-colors ${
                    touched.name && errors.name ? "border-deep-red" : "border-border-subtle"
                  }`}
              />
              {touched.name && errors.name && (
                <p className="mt-1.5 text-sm text-deep-red font-body">{errors.name}</p>
              )}
            </div>

            {/* WhatsApp */}
            <div>
              <label htmlFor="whatsapp" className="block font-body text-sm text-muted-foreground mb-2">
                WhatsApp
              </label>
              <input
                type="tel"
                id="whatsapp"
                value={userData.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                onBlur={() => handleBlur("whatsapp")}
                placeholder="(31) 99999-9999"
                className={`w-full px-4 py-3.5 bg-card border rounded-sm font-body text-base text-foreground
                  placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                  transition-colors ${
                    touched.whatsapp && errors.whatsapp ? "border-deep-red" : "border-border-subtle"
                  }`}
              />
              {touched.whatsapp && errors.whatsapp && (
                <p className="mt-1.5 text-sm text-deep-red font-body">{errors.whatsapp}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-body text-sm text-muted-foreground mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={userData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="seu@email.com"
                className={`w-full px-4 py-3.5 bg-card border rounded-sm font-body text-base text-foreground
                  placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                  transition-colors ${
                    touched.email && errors.email ? "border-deep-red" : "border-border-subtle"
                  }`}
              />
              {touched.email && errors.email && (
                <p className="mt-1.5 text-sm text-deep-red font-body">{errors.email}</p>
              )}
            </div>

            {/* Instagram */}
            <div>
              <label htmlFor="instagram" className="block font-body text-sm text-muted-foreground mb-2">
                Instagram ou site
              </label>
              <input
                type="text"
                id="instagram"
                value={userData.instagram}
                onChange={(e) => handleChange("instagram", e.target.value)}
                onBlur={() => handleBlur("instagram")}
                placeholder="@seuinstagram ou seusite.com.br"
                className={`w-full px-4 py-3.5 bg-card border rounded-sm font-body text-base text-foreground
                  placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                  transition-colors ${
                    touched.instagram && errors.instagram ? "border-deep-red" : "border-border-subtle"
                  }`}
              />
              {touched.instagram && errors.instagram && (
                <p className="mt-1.5 text-sm text-deep-red font-body">{errors.instagram}</p>
              )}
            </div>
          </div>

          {/* Submit button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-4 font-display text-lg tracking-wider transition-all duration-200
                ${
                  isFormValid
                    ? "bg-gold text-deep-black hover:bg-gold/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
            >
              VER MEU DIAGNÓSTICO →
            </button>
          </div>

          {/* Footer text */}
          <p className="mt-6 text-center text-xs text-muted-foreground font-body leading-relaxed">
            Seus dados são usados apenas para personalizar o diagnóstico
            <br />e para que João Paulo possa entrar em contato.
          </p>
        </form>
      </div>
    </Layout>
  );
}
