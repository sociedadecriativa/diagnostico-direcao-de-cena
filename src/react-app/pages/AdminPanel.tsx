import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import type { Lead, Briefing, AvailabilitySlot } from "../lib/supabase";

// Admin password from env var — set VITE_ADMIN_PASSWORD in Cloudflare Pages
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;
const SESSION_KEY = "ddc_admin_auth";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function packageLabel(pkg: string | null) {
  if (pkg === "analise") return "Análise de Perfil";
  if (pkg === "analise-implementacao") return "Análise + Implementação";
  return "—";
}

// ─── Password Gate ────────────────────────────────────────────────────────────

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = ADMIN_PASSWORD || "admin123";
    if (input === correct) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onAuth();
    } else {
      setError(true);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <p className="font-body text-xs text-gold uppercase tracking-widest mb-2 text-center">
          Diagnóstico Direção de Cena
        </p>
        <h1 className="font-display text-2xl text-foreground tracking-wider mb-8 text-center">
          PAINEL ADMIN
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="Senha"
            autoFocus
            className={`w-full px-4 py-3.5 bg-card border font-body text-base text-foreground
              placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold
              transition-colors ${error ? "border-red-700" : "border-border-subtle"}`}
          />
          {error && (
            <p className="text-sm text-red-500 font-body">Senha incorreta.</p>
          )}
          <button
            type="submit"
            className="w-full py-4 bg-gold text-deep-black font-display tracking-wider hover:bg-gold/90 transition-colors"
          >
            ENTRAR →
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Briefing Modal ───────────────────────────────────────────────────────────

function BriefingModal({
  briefing,
  lead,
  onClose,
}: {
  briefing: Briefing;
  lead: Lead;
  onClose: () => void;
}) {
  const fields: { label: string; key: keyof Briefing }[] = [
    { label: "Descreva o que você faz em uma frase", key: "project_description" },
    { label: "Produto ou serviço principal", key: "main_product" },
    { label: "Cliente ideal", key: "ideal_client" },
    { label: "O que o cliente ganha", key: "client_benefit" },
    { label: "Métricas atuais", key: "current_metrics" },
    { label: "Conteúdo que melhor performou", key: "best_content" },
    { label: "Conteúdo abaixo do esperado", key: "worst_content" },
    { label: "O que está travando", key: "current_blocker" },
    { label: "Resultado ideal após 30 dias", key: "ideal_result" },
    { label: "O que não mexer", key: "dont_touch" },
    { label: "Instagram", key: "instagram_link" },
    { label: "Site", key: "site_link" },
    { label: "Informações adicionais", key: "additional_info" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 overflow-y-auto py-8 px-4"
      onClick={onClose}
    >
      <div
        className="bg-background border border-border-subtle max-w-2xl w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="font-body text-xs text-gold uppercase tracking-widest mb-1">
              Briefing completo
            </p>
            <h2 className="font-display text-xl text-foreground">
              {lead.name}
            </h2>
            <p className="font-body text-sm text-muted-foreground mt-1">
              {lead.instagram} · {formatDate(briefing.created_at)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="font-display text-2xl text-muted-foreground hover:text-foreground transition-colors leading-none"
          >
            ×
          </button>
        </div>

        <div className="space-y-5">
          {fields.map(({ label, key }) => {
            const val = briefing[key] as string | null;
            if (!val) return null;
            return (
              <div key={key} className="border-b border-border-subtle pb-4">
                <p className="font-body text-xs text-gold/70 uppercase tracking-widest mb-1">
                  {label}
                </p>
                <p className="font-body text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {val}
                </p>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full py-3 border border-border-subtle font-body text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

// ─── Leads Tab ────────────────────────────────────────────────────────────────

function LeadsTab() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [briefings, setBriefings] = useState<Record<string, Briefing>>({});
  const [loading, setLoading] = useState(true);
  const [selectedBriefing, setSelectedBriefing] = useState<{
    briefing: Briefing;
    lead: Lead;
  } | null>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    (async () => {
      const { data: leadsData } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (leadsData) {
        setLeads(leadsData as Lead[]);

        const { data: briefingsData } = await supabase
          .from("briefings")
          .select("*")
          .in(
            "lead_id",
            leadsData.map((l) => l.id)
          );

        if (briefingsData) {
          const map: Record<string, Briefing> = {};
          (briefingsData as Briefing[]).forEach((b) => {
            map[b.lead_id] = b;
          });
          setBriefings(map);
        }
      }
      setLoading(false);
    })();
  }, []);

  if (!supabase) {
    return (
      <div className="text-center py-16">
        <p className="font-body text-sm text-muted-foreground">
          Supabase não configurado. Adicione{" "}
          <code className="text-gold">VITE_SUPABASE_URL</code> e{" "}
          <code className="text-gold">VITE_SUPABASE_ANON_KEY</code> nas
          variáveis de ambiente do Cloudflare Pages.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="font-body text-sm text-muted-foreground animate-pulse">
          Carregando...
        </p>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-body text-sm text-muted-foreground">
          Nenhum lead ainda.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-body text-sm">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="py-3 pr-4 text-xs text-muted-foreground uppercase tracking-widest font-normal">
                Nome
              </th>
              <th className="py-3 pr-4 text-xs text-muted-foreground uppercase tracking-widest font-normal hidden md:table-cell">
                Instagram
              </th>
              <th className="py-3 pr-4 text-xs text-muted-foreground uppercase tracking-widest font-normal hidden lg:table-cell">
                WhatsApp
              </th>
              <th className="py-3 pr-4 text-xs text-muted-foreground uppercase tracking-widest font-normal">
                Diagnóstico
              </th>
              <th className="py-3 pr-4 text-xs text-muted-foreground uppercase tracking-widest font-normal hidden md:table-cell">
                Pacote
              </th>
              <th className="py-3 pr-4 text-xs text-muted-foreground uppercase tracking-widest font-normal hidden sm:table-cell">
                Data
              </th>
              <th className="py-3 text-xs text-muted-foreground uppercase tracking-widest font-normal">
                Briefing
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const hasBriefing = !!briefings[lead.id];
              return (
                <tr
                  key={lead.id}
                  className="border-b border-border-subtle hover:bg-card/50 transition-colors"
                >
                  <td className="py-3 pr-4 text-foreground">{lead.name}</td>
                  <td className="py-3 pr-4 text-muted-foreground hidden md:table-cell">
                    {lead.instagram || "—"}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground hidden lg:table-cell">
                    {lead.whatsapp || "—"}
                  </td>
                  <td className="py-3 pr-4">
                    <span className="text-gold text-xs">
                      {lead.diagnosis_type || "—"}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground hidden md:table-cell">
                    {packageLabel(lead.selected_package)}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground hidden sm:table-cell">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="py-3">
                    {hasBriefing ? (
                      <button
                        onClick={() =>
                          setSelectedBriefing({
                            briefing: briefings[lead.id],
                            lead,
                          })
                        }
                        className="text-xs text-gold hover:underline"
                      >
                        Ver →
                      </button>
                    ) : (
                      <span className="text-xs text-muted-foreground/40">
                        Pendente
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedBriefing && (
        <BriefingModal
          briefing={selectedBriefing.briefing}
          lead={selectedBriefing.lead}
          onClose={() => setSelectedBriefing(null)}
        />
      )}
    </>
  );
}

// ─── Availability Tab ─────────────────────────────────────────────────────────

function AvailabilityTab() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSlot, setNewSlot] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from("availability")
      .select("*")
      .order("slot_datetime", { ascending: true });
    if (data) setSlots(data as AvailabilitySlot[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const addSlot = async () => {
    if (!supabase || !newSlot) return;
    setSaving(true);
    const { error } = await supabase.from("availability").insert({
      slot_datetime: new Date(newSlot).toISOString(),
      is_available: true,
    });
    if (!error) {
      setNewSlot("");
      await load();
    }
    setSaving(false);
  };

  const toggleSlot = async (slot: AvailabilitySlot) => {
    if (!supabase) return;
    await supabase
      .from("availability")
      .update({ is_available: !slot.is_available })
      .eq("id", slot.id);
    await load();
  };

  const deleteSlot = async (id: string) => {
    if (!supabase) return;
    await supabase.from("availability").delete().eq("id", id);
    await load();
  };

  if (!supabase) {
    return (
      <div className="text-center py-16">
        <p className="font-body text-sm text-muted-foreground">
          Supabase não configurado.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Add slot */}
      <div className="flex gap-3 mb-8">
        <input
          type="datetime-local"
          value={newSlot}
          onChange={(e) => setNewSlot(e.target.value)}
          className="flex-1 px-4 py-3 bg-card border border-border-subtle font-body text-sm text-foreground
            focus:outline-none focus:ring-2 focus:ring-gold transition-colors"
        />
        <button
          onClick={addSlot}
          disabled={!newSlot || saving}
          className={`px-6 py-3 font-display text-sm tracking-wider transition-colors ${
            newSlot && !saving
              ? "bg-gold text-deep-black hover:bg-gold/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {saving ? "..." : "ADICIONAR"}
        </button>
      </div>

      {/* Slots list */}
      {loading ? (
        <p className="font-body text-sm text-muted-foreground animate-pulse">
          Carregando...
        </p>
      ) : slots.length === 0 ? (
        <p className="font-body text-sm text-muted-foreground">
          Nenhum horário cadastrado.
        </p>
      ) : (
        <div className="space-y-2">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center justify-between border border-border-subtle p-4"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`w-2 h-2 rounded-full ${
                    slot.is_available ? "bg-green-500" : "bg-muted"
                  }`}
                />
                <span
                  className={`font-body text-sm ${
                    slot.is_available
                      ? "text-foreground"
                      : "text-muted-foreground line-through"
                  }`}
                >
                  {formatDate(slot.slot_datetime)}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => toggleSlot(slot)}
                  className="font-body text-xs text-muted-foreground hover:text-gold transition-colors"
                >
                  {slot.is_available ? "Desativar" : "Ativar"}
                </button>
                <button
                  onClick={() => deleteSlot(slot.id)}
                  className="font-body text-xs text-muted-foreground hover:text-red-400 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────

export function AdminPanel() {
  const [authed, setAuthed] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  });
  const [activeTab, setActiveTab] = useState<"leads" | "availability">("leads");

  if (!authed) {
    return <PasswordGate onAuth={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border-subtle">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <span className="font-body text-xs text-gold uppercase tracking-widest">
              Admin
            </span>
            <h1 className="font-display text-lg text-foreground tracking-wider">
              DIAGNÓSTICO DDC
            </h1>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem(SESSION_KEY);
              setAuthed(false);
            }}
            className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border-subtle">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {(["leads", "availability"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 font-body text-sm transition-colors border-b-2 ${
                  activeTab === tab
                    ? "border-gold text-gold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "leads" ? "Leads" : "Disponibilidade"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "leads" ? <LeadsTab /> : <AvailabilityTab />}
      </div>
    </div>
  );
}
