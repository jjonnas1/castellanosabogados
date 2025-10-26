// app/cliente/panel/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/** Tipos mínimos que usamos en UI */
type ApptStatus = "pending" | "paid" | "confirmed" | "in_call" | "completed" | "cancelled" | "no_show";
type Appt = {
  id: string;
  client_id: string;
  lawyer_id: string;
  slot_id: string;
  status: ApptStatus;
  duration_min: number;
  meet_url: string | null;
  created_at: string;
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });

export default function ClientePanelPage() {
  const [tab, setTab] = useState<"proximas" | "historial">("proximas");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [upcoming, setUpcoming] = useState<Appt[]>([]);
  const [history, setHistory] = useState<Appt[]>([]);

  // para cancelar
  const [cancelTarget, setCancelTarget] = useState<Appt | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id ?? null);
    })();
  }, []);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      setLoading(true);

      // Citas activas
      const upRes = await supabase
        .from("appointments")
        .select("*")
        .eq("client_id", userId)
        .in("status", ["pending", "paid", "confirmed", "in_call"]);
      const up = (upRes as unknown as { data: Appt[] | null }).data ?? [];
      setUpcoming(up);

      // Historial
      const histRes = await supabase
        .from("appointments")
        .select("*")
        .eq("client_id", userId)
        .in("status", ["completed", "cancelled", "no_show"]);
      const hi = (histRes as unknown as { data: Appt[] | null }).data ?? [];
      setHistory(hi);

      setLoading(false);
    })();
  }, [userId]);

  const canCancel = useMemo(() => !!cancelTarget && cancelReason.trim().length >= 6, [cancelTarget, cancelReason]);

  async function cancelAppt() {
    if (!cancelTarget) return;
    // esta actualización dispara el trigger SQL que valida la ventana de tiempo
    const res = await supabase
      .from("appointments")
      .update({
        status: "cancelled",
        // estos campos deben existir por el bloque SQL que agregaste:
        cancelled_at: new Date().toISOString(),
        cancellation_reason: cancelReason.trim(),
      })
      .eq("id", cancelTarget.id);

    if ((res as any).error) {
      alert((res as any).error.message || "No pudimos cancelar la cita.");
      return;
    }

    // refrescar listas
    const upRes = await supabase
      .from("appointments")
      .select("*")
      .eq("client_id", userId)
      .in("status", ["pending", "paid", "confirmed", "in_call"]);
    const up = (upRes as unknown as { data: Appt[] | null }).data ?? [];
    setUpcoming(up);

    const histRes = await supabase
      .from("appointments")
      .select("*")
      .eq("client_id", userId)
      .in("status", ["completed", "cancelled", "no_show"]);
    const hi = (histRes as unknown as { data: Appt[] | null }).data ?? [];
    setHistory(hi);

    setCancelTarget(null);
    setCancelReason("");
    alert("Cita cancelada ✅");
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 900 }}>
        <header className="panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <div className="muted" style={{ fontWeight: 700 }}>Panel de cliente</div>
            <UserEmail />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a href="/agenda" className="btn btn--ghost">Agendar nueva</a>
            <button
              className="btn btn--ghost"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/";
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
          <Tab active={tab === "proximas"} onClick={() => setTab("proximas")}>Próximas</Tab>
          <Tab active={tab === "historial"} onClick={() => setTab("historial")}>Historial y recibos</Tab>
        </div>

        {loading && <div className="panel" style={{ marginTop: 16 }}>Cargando…</div>}

        {!loading && tab === "proximas" && (
          <section style={{ marginTop: 16, display: "grid", gap: 12 }}>
            {upcoming.length === 0 && <div className="panel">No tienes asesorías próximas.</div>}

            {upcoming.map((a) => (
              <div key={a.id} className="panel" style={{ display: "grid", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{fmt(a.created_at)}</div>
                    <div className="muted">Estado: <strong>{a.status}</strong> · Duración: {a.duration_min} min</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {a.meet_url && (
                      <a href={a.meet_url} target="_blank" className="btn btn--ghost" rel="noreferrer">Entrar a la sala</a>
                    )}
                    <button className="btn btn--ghost" onClick={() => setCancelTarget(a)}>Cancelar</button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {!loading && tab === "historial" && (
          <section style={{ marginTop: 16, display: "grid", gap: 12 }}>
            {history.length === 0 && <div className="panel">Sin historial por ahora.</div>}

            {history.map((a) => (
              <div key={a.id} className="panel" style={{ display: "grid", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{fmt(a.created_at)}</div>
                    <div className="muted">Estado: <strong>{a.status}</strong> · Duración: {a.duration_min} min</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <a href={`/cliente/recibo/${a.id}`} className="btn btn--ghost">Recibo</a>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Modal simple de cancelación */}
        {cancelTarget && (
          <div
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,.3)",
              display: "grid", placeItems: "center", padding: 20, zIndex: 60
            }}
          >
            <div className="panel" style={{ maxWidth: 520, width: "100%", display: "grid", gap: 12 }}>
              <h3 style={{ margin: 0 }}>Cancelar asesoría</h3>
              <p className="muted" style={{ marginTop: 2 }}>
                Explica brevemente el motivo. Se aplican las políticas de cancelación
                (ventana mínima según el día/horario). Si ya no es posible cancelar, verás un error.
              </p>
              <textarea
                rows={5}
                placeholder="Motivo de cancelación (mínimo 6 caracteres)…"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <button className="btn btn--ghost" onClick={() => { setCancelTarget(null); setCancelReason(""); }}>
                  Volver
                </button>
                <button className="btn btn--primary" disabled={!canCancel} onClick={cancelAppt}>
                  Confirmar cancelación
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function UserEmail() {
  const [email, setEmail] = useState("");
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);
  return <div style={{ fontSize: 14 }}>Sesión: <strong>{email || "—"}</strong></div>;
}

function Tab({ active, onClick, children }: { active: boolean; onClick(): void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="btn"
      style={{
        borderRadius: 999,
        background: active ? "var(--brand-600)" : "#fff",
        color: active ? "#fff" : "var(--ink)",
        border: "1px solid #e6ebf8",
        boxShadow: active ? "var(--shadow-soft)" : "none",
      }}
    >
      {children}
    </button>
  );
}
