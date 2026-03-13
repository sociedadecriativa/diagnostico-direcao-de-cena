import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

// Supabase client — null when env vars are not configured yet
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Lead {
  id: string;
  name: string;
  whatsapp: string | null;
  email: string | null;
  instagram: string | null;
  diagnosis_type: string | null;
  selected_package: string | null;
  quiz_answers: Record<string, string> | null;
  created_at: string;
}

export interface Briefing {
  id: string;
  lead_id: string;
  project_description: string | null;
  main_product: string | null;
  ideal_client: string | null;
  client_benefit: string | null;
  current_metrics: string | null;
  best_content: string | null;
  worst_content: string | null;
  current_blocker: string | null;
  ideal_result: string | null;
  dont_touch: string | null;
  instagram_link: string | null;
  site_link: string | null;
  additional_info: string | null;
  created_at: string;
}

export interface AvailabilitySlot {
  id: string;
  slot_datetime: string;
  is_available: boolean;
  created_at: string;
}

export interface Appointment {
  id: string;
  lead_id: string;
  slot_datetime: string | null;
  status: string;
  created_at: string;
}
