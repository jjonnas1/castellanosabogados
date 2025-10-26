"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Appt = {
  id: string;
  status:
    | "pending"
    | "paid"
    | "confirmed"
    | "in_call"
    | "completed"
    | "cancelled"
    | "no_show";
  duration_min: number;
  meet_url: string | null;
  created_at: string;
  slot_id: string;
  lawyer_id: string;
};

type Slot = { id: string; start_at: string; end_at: string };

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  });

export default function ClientePanel() {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [upcoming, setUpcoming] = useState<Array<Appt & { slot: Slot }>>([]);
  const [past, setPast] = useState<Array<Appt & { slot: Slot }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) {
        window.location.href = "/cliente/login";
        return;
      }

      setUserId(user.id);
      setEmail(user.email || "");

      // Asegura perfil client si el alta viene de Google
      await supabase
        .from("profiles")
        .upsert(
          { id: user.id, email: user.email, role: "client" },
          { onConflict: "id" }
        );

      await loadAppts(user.id);
      setLoading(false);
    })();
  }, []);

  async function loadAppts(uid: string) {
    const { data: apptsRaw } = await supabase
      .from("appointments")
      .select("*")
      .eq("client_id", uid)
      .order("created_at", { ascending: false });

    const appts = (apptsRaw as Appt[]) || [];

    if (appts.length === 0) {
      setUpcoming([]);
      setPast([]);
      return;
    }

    const slotIds = [...new Set(appts.map((a) => a.slot_id))];
    const { data: slotsRaw } = await supabase
      .from("availability_slots")
      .select("id,start_at,end_at")
      .in("id", slotIds);

    const slots = (slotsRaw as Slot[]) || [];
    const slotMap = new Map(slots.map((s) => [s.id, s]));

    const withSlots = appts
      .map((a) => {
        const slot = slotMap.get(a.slot_id);
        return slot ? ({ ...a, slot } as Appt & { slot: Slot }) : null;
      })
      .filter(Boolean) as Array<Appt & { slot: Slot }>;

    const nowIso = new Date().toISOString();
    setUpcoming(
      withSlots.filter(
        (a) => a.slot.start_at > nowIso && a.status !== "cancelled"
      )
    );
    setPast(
      withSlots.filter(
        (a) => a.slot.start_at <= nowIso || a.status === "cancelled"
      )
    );
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <main className="section">
        <div className="wrap">
          <div className="panel">Cargando…</div>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 980 }}>
        <header
          className="panel"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div className="muted" style={{ fontWeight: 700 }}>
              Mi panel (cliente)
            </div>
            <div style={{ fontSize: 13 }}>
              Sesión: <strong>{email}</strong>
            </div>
          </div>
          <button className="btn btn--ghost" onClick={logout}>
            Cerrar sesión
          </button>
        </header>

        {/* Próximas */}
        <section style={{ marginTop: 18 }}>
          <h2 className="h2" style={{ marginBottom: 10 }}>
            Próximas citas
          </h2>
          <div style={{ display: "grid", gap: 12 }}>
            {upcoming.length === 0 && (
              <div className="panel">No tienes citas próximas.</div>
            )}
            {upcoming.map((a) => (
              <div
                key={a.id}
                className="panel"
                style={{ display: "grid", gap: 6 }}
              >
                <div>
                  <strong>{fmt(a.slot.start_at)}</strong> · {a.duration_min} min
                </div>
                <div className="muted">Estado: {a.status}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {a.meet_url ? (
                    <a
                      href={a.meet_url}
                      className="btn btn--primary"
                      target="_blank"
                    >
                      Entrar a la videollamada
                    </a>
                  ) : (
                    <button className="btn btn--ghost" disabled>
                      Link de videollamada aún no disponible
                    </button>
                  )}
                  {a.status === "pending" && (
                    <button className="btn btn--primary">Pagar</button>
                  )}
                  <button className="btn btn--ghost">Reagendar</button>
                  <button className="btn btn--ghost">Cancelar</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Historial */}
        <section style={{ marginTop: 18 }}>
          <h2 className="h2" style={{ marginBottom: 10 }}>
            Historial
          </h2>
          <div style={{ display: "grid", gap: 12 }}>
            {past.length === 0 && (
              <div className="panel">Aún no tienes historial.</div>
            )}
            {past.map((a) => (
              <div
                key={a.id}
                className="panel"
                style={{ display: "grid", gap: 6 }}
              >
                <div>
                  <strong>{fmt(a.slot.start_at)}</strong> · {a.duration_min} min
                </div>
                <div className="muted">Estado: {a.status}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn--ghost">Recibo</button>
                  <button className="btn btn--ghost">Calificar</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
