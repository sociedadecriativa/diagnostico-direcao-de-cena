import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { DiagnosisType } from "../data/quizData";
import { supabase } from "../lib/supabase";

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
  leadId: string | null;
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
  saveLeadToSupabase: () => Promise<string | null>;
  updateLeadDiagnosis: (
    leadId: string,
    diagnosisType: string,
    pkg: PackageType,
    answers: Record<number, string>
  ) => Promise<void>;
  saveBriefingToSupabase: (leadId: string) => Promise<void>;
  saveAppointmentToSupabase: (leadId: string, datetime: string) => Promise<void>;
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
  leadId: null,
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

  // ─── Supabase helpers ──────────────────────────────────────────────────────

  const saveLeadToSupabase = async (): Promise<string | null> => {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from("leads")
        .insert({
          name: state.userData.name,
          whatsapp: state.userData.whatsapp || null,
          email: state.userData.email || null,
          instagram: state.userData.instagram || null,
        })
        .select("id")
        .single();
      if (error) {
        console.error("[supabase] save lead:", error.message);
        return null;
      }
      const id = (data as { id: string }).id;
      setState((prev) => ({ ...prev, leadId: id }));
      return id;
    } catch (e) {
      console.error("[supabase] save lead exception:", e);
      return null;
    }
  };

  const updateLeadDiagnosis = async (
    leadId: string,
    diagnosisType: string,
    pkg: PackageType,
    answers: Record<number, string>
  ): Promise<void> => {
    if (!supabase || !leadId) return;
    try {
      const { error } = await supabase
        .from("leads")
        .update({
          diagnosis_type: diagnosisType,
          selected_package: pkg,
          quiz_answers: answers,
        })
        .eq("id", leadId);
      if (error) console.error("[supabase] update diagnosis:", error.message);
    } catch (e) {
      console.error("[supabase] update diagnosis exception:", e);
    }
  };

  const saveBriefingToSupabase = async (leadId: string): Promise<void> => {
    if (!supabase || !leadId) return;
    try {
      const { error } = await supabase.from("briefings").insert({
        lead_id: leadId,
        project_description: state.briefingData.projectDescription || null,
        main_product: state.briefingData.mainProduct || null,
        ideal_client: state.briefingData.idealClient || null,
        client_benefit: state.briefingData.clientBenefit || null,
        current_metrics: state.briefingData.currentMetrics || null,
        best_content: state.briefingData.bestContent || null,
        worst_content: state.briefingData.worstContent || null,
        current_blocker: state.briefingData.currentBlocker || null,
        ideal_result: state.briefingData.idealResult || null,
        dont_touch: state.briefingData.dontTouch || null,
        instagram_link: state.briefingData.instagramLink || null,
        site_link: state.briefingData.siteLink || null,
        additional_info: state.briefingData.additionalInfo || null,
      });
      if (error) console.error("[supabase] save briefing:", error.message);
    } catch (e) {
      console.error("[supabase] save briefing exception:", e);
    }
  };

  const saveAppointmentToSupabase = async (
    leadId: string,
    datetime: string
  ): Promise<void> => {
    if (!supabase || !leadId) return;
    try {
      const { error } = await supabase.from("appointments").insert({
        lead_id: leadId,
        slot_datetime: datetime ? new Date(datetime).toISOString() : null,
        status: "pending",
      });
      if (error) console.error("[supabase] save appointment:", error.message);
    } catch (e) {
      console.error("[supabase] save appointment exception:", e);
    }
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
        saveLeadToSupabase,
        updateLeadDiagnosis,
        saveBriefingToSupabase,
        saveAppointmentToSupabase,
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
