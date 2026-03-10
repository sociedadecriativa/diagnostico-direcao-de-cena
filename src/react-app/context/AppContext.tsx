import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { DiagnosisType } from "../data/quizData";

export type PackageType = "analise" | "analise-implementacao" | null;
export type ThemeMode = "dark" | "light";

interface UserData {
  name: string;
  whatsapp: string;
  email: string;
  instagram: string;
}

interface BriefingData {
  projectDescription: string;
  mainProduct: string;
  idealClient: string;
  clientBenefit: string;
  currentMetrics: string;
  bestContent: string;
  worstContent: string;
  currentBlocker: string;
  idealResult: string;
  dontTouch: string;
  instagramLink: string;
  siteLink: string;
  additionalInfo: string;
}

interface AppState {
  currentStep: number;
  quizAnswers: Record<number, string>;
  userData: UserData;
  diagnosisType: DiagnosisType | null;
  selectedPackage: PackageType;
  briefingData: BriefingData;
  scheduledDateTime: string;
  themeMode: ThemeMode;
}

interface AppContextType extends AppState {
  setCurrentStep: (step: number) => void;
  setQuizAnswer: (questionId: number, answer: string) => void;
  setUserData: (data: Partial<UserData>) => void;
  setDiagnosisType: (type: DiagnosisType) => void;
  setSelectedPackage: (pkg: PackageType) => void;
  setBriefingData: (data: Partial<BriefingData>) => void;
  setScheduledDateTime: (datetime: string) => void;
  setThemeMode: (mode: ThemeMode) => void;
  resetApp: () => void;
}

const initialState: AppState = {
  currentStep: 1,
  quizAnswers: {},
  userData: {
    name: "",
    whatsapp: "",
    email: "",
    instagram: "",
  },
  diagnosisType: null,
  selectedPackage: null,
  briefingData: {
    projectDescription: "",
    mainProduct: "",
    idealClient: "",
    clientBenefit: "",
    currentMetrics: "",
    bestContent: "",
    worstContent: "",
    currentBlocker: "",
    idealResult: "",
    dontTouch: "",
    instagramLink: "",
    siteLink: "",
    additionalInfo: "",
  },
  scheduledDateTime: "",
  themeMode: "dark",
};

const STORAGE_KEY = "direcao-de-cena-state";

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return { ...initialState, ...parsed };
        } catch {
          return initialState;
        }
      }
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(state.themeMode);
  }, [state.themeMode]);

  const setCurrentStep = (step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const setQuizAnswer = (questionId: number, answer: string) => {
    setState((prev) => ({
      ...prev,
      quizAnswers: { ...prev.quizAnswers, [questionId]: answer },
    }));
  };

  const setUserData = (data: Partial<UserData>) => {
    setState((prev) => ({
      ...prev,
      userData: { ...prev.userData, ...data },
    }));
  };

  const setDiagnosisType = (type: DiagnosisType) => {
    setState((prev) => ({ ...prev, diagnosisType: type }));
  };

  const setSelectedPackage = (pkg: PackageType) => {
    setState((prev) => ({ ...prev, selectedPackage: pkg }));
  };

  const setBriefingData = (data: Partial<BriefingData>) => {
    setState((prev) => ({
      ...prev,
      briefingData: { ...prev.briefingData, ...data },
    }));
  };

  const setScheduledDateTime = (datetime: string) => {
    setState((prev) => ({ ...prev, scheduledDateTime: datetime }));
  };

  const setThemeMode = (mode: ThemeMode) => {
    setState((prev) => ({ ...prev, themeMode: mode }));
  };

  const resetApp = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setCurrentStep,
        setQuizAnswer,
        setUserData,
        setDiagnosisType,
        setSelectedPackage,
        setBriefingData,
        setScheduledDateTime,
        setThemeMode,
        resetApp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
