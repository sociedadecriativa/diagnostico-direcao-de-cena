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
        newErrors.name =
          !userData.name.trim()
            ? "Nome Ã© obrigatÃ³rio"
            : userData.name.trim().length < 2
            ? "Nome muito curto"
            : "";
        break;
      case "whatsapp":
        newErrors.whatsapp =
          !userData.whatsapp
            ? "WhatsApp Ã© obrigatÃ³rio"
            : !isValidPhone(userData.whatsapp)
            ? "NÃºmero invÃ¡lido"
            : "";
        break;
      case "email":
        newErrors.email =
          !userData.email
            ? "E-mail Ã© obrigatÃ³rio"
            : !isValidEmail(userData.email)
            ? "E-mail invÃ¡lido"
            : "";
        break;
    }
    setErrors(newErrors);
    return !newErrors[field];
  };

  const validateAll = () => {
    const fields = ["name", "whatsapp", "email"];
    let isValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) isValid = false;
    });
    setTouched({ name: true, whatsapp: true, email: true });
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAll()) setCurrentStep(3);
  };

  const isFormValid =
    userData.name.trim().length >= 2 &&
    isValidPhone(userData.whatsapp) &&
    isValidEmail(userData.email);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12 flex-1 flex flex-col">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="font-body text-xs text-gold uppercase tracking-widest mb-4">
            Quase pronto
          </p>
          <h1 className="font-display text-3xl md:text-5xl text-foreground tracking-wider mb-4">
            SEU DIAGNÃSTICO<br />ESTÃ PRONTO.
          </h1>
          <p className="font-body text-base text-muted-foreground max-w-sm mx-auto leading-relaxed">
            Para revelar o resultado, preciso de trÃªs dados. Sem spam. JoÃ£o Paulo lÃª pessoalmente â e pode entrar em contato se fizer sentido.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto w-full flex-1 flex flex-col">
          <div className="space-y-5 flex-1">

            {/* Name */}
            <div>
              <label htmlFor="name" className="block font-body text-sm text-muted-foreground mb-2">
                Seu nome
              </label>
              <input
                type="text"
                id="name"
                value={userData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder="Como vocÃª prefere ser chamado"
                className={`w-full px-4 py-3.5 bg-card border font-body text-base text-foreground
                  placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                  transition-colors ${touched.name && errors.name ? "border-red-700" : "border-border-subtle"}`}
              />
              {touched.name && errors.name && (
                <p className="mt-1.5 text-sm text-red-500 font-body">{errors.name}</p>
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
                className={`w-full px-4 py-3.5 bg-card border font-body text-base text-foreground
                  placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                  transition-colors ${touched.whatsapp && errors.whatsapp ? "border-red-700" : "border-border-subtle"}`}
              />
              {touched.whatsapp && errors.whatsapp && (
                <p className="mt-1.5 text-sm text-red-500 font-body">{errors.whatsapp}</p>
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
                className={`w-full px-4 py-3.5 bg-card border font-body text-base text-foreground
                  placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                  transition-colors ${touched.email && errors.email ? "border-red-700" : "border-border-subtle"}`}
              />
              {touched.email && errors.email && (
                <p className="mt-1.5 text-sm text-red-500 font-body">{errors.email}</p>
              )}
            </div>

          </div>

          {/* Submit */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-4 font-display text-lg tracking-wider transition-all duration-200
                ${isFormValid
                  ? "bg-gold text-deep-black hover:bg-gold/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
            >
              VER MEU DIAGNÃSTICO â
            </button>
          </div>

          <p className="mt-5 text-center text-xs text-muted-foreground font-body leading-relaxed">
            Seus dados sÃ£o usados apenas para personalizar o diagnÃ³stico<br />
            e para que JoÃ£o Paulo possa entrar em contato se fizer sentido.
          </p>
        </form>

      </div>
    </Layout>
  );
}
