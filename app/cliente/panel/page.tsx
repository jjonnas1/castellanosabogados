// app/cliente/panel/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Appt = {
  id: string;
  client_id: string;
  lawyer_id: string;
  status: string;           // pending|paid|confirmed|in_call|completed|cancelled|no_show
  created_at: string;
  meet_url: string | null;
  slot_id: string;
};

type Slot = { id: string; start_at: string; end_at: string };

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("es-CO", { dateStyle:"medium", timeStyle:"short" });

export default function ClientePanelPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [upcoming, setUpcoming] = useState<(Appt & {slot?: Slot})[]>([]);
  const [history, setHistory] = useState<(Appt & {slot?: Slot})[]>([]);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const id = u.user?.id ?? null;
      setUserId(id);
      setEmail(u.user?.email ?? "");
      if (!id) { setLoading(false); return; }

      // Trae citas del cliente
      const { data: appts } = await supabase
        .from("appointments")
        .select("*")
        .eq("client_id", id)
        .order("created_at", { ascending: false });

      // Asocia slot (hora)
      let withSlots: (Appt & {slot?: Slot})[] = appts || [];
      if (appts && appts.length) {
        const slotIds = Array.from(new Set(appts.map(a => a.slot_id)));
        const { data: slots } = await supabase
          .from("availability_slots")
          .select("id,start_at,end_at")
          .in("id", slotIds);
        const map = new Map((slots||[]).map(s => [s.id, s]));
        withSlots = appts.map(a => ({ ...a, slot: map.get(a.slot_id) }));
      }

      // separa próximas vs historial
      const now = Date.now();
      const up: (Appt & {slot?: Slot})[] = [];
      const past: (Appt & {slot?: Slot})[] = [];
      withSlots.forEach(a => {
        const endTs = a.slot?.end_at ? new Date(a.slot.end_at).getTime() : 0;
        if (["cancelled","completed","no_show"].includes(a.status) || endTs < now) past.push(a);
        else up.push(a);
      });

      setUpcoming(up);
      setHistory(past);
      setLoading(false);
    })();
  }, []);

  if (!userId) {
    return (
      <main className="section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="panel">
            <h1 className="h2" style={{ marginBottom: 6 }}>Tu panel</h1>
            <p className="muted">Para ver tus citas debes iniciar sesión.</p>
            <a href="/cliente/login" className="btn btn--primary">Acceder</a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <header className="panel" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
          <div>
            <div className="muted" style={{ fontWeight:700 }}>Mi panel</div>
            <div style={{ fontSize:14 }}>Sesión iniciada como <strong>{email || "—"}</strong></div>
          </div>
          <button
            className="btn btn--ghost"
            onClick={async ()=>{ await supabase.auth.signOut(); location.href="/"; }}
          >
            Cerrar sesión
          </button>
        </header>

        {/* Próximas */}
        <section style={{ marginTop:16 }}>
          <h2 className="h2" style={{ marginBottom: 10 }}>Próximas asesorías</h2>
          {loading ? (
            <div className="panel">Cargando…</div>
          ) : upcoming.length === 0 ? (
            <div className="panel" style={{ display:"grid", gap:6 }}>
              <div className="muted">Aún no tienes asesorías programadas.</div>
              <div>
                <a href="/agenda" className="btn btn--primary">Agendar asesoría</a>
              </div>
            </div>
          ) : (
            <div style={{ display:"grid", gap:14 }}>
              {upcoming.map(a => (
                <div key={a.id} className="panel" style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontWeight:700 }}>{a.slot?.start_at ? fmt(a.slot.start_at) : "—"}</div>
                    <div className="muted">Estado: <strong>{a.status}</strong></div>
                    {a.meet_url && <div className="muted" style={{ fontSize:14, marginTop:4 }}>Enlace: <a href={a.meet_url} target="_blank" rel="noreferrer">{a.meet_url}</a></div>}
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button className="btn btn--ghost" disabled>Reagendar</button>
                    <button className="btn btn--ghost" disabled>Cancelar</button>
                    <a className="btn btn--primary" href={a.meet_url || "#"} target="_blank" rel="noreferrer">Entrar a la llamada</a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Historial */}
        <section style={{ marginTop:24 }}>
          <h2 className="h2" style={{ marginBottom: 10 }}>Historial</h2>
          {loading ? (
            <div className="panel">Cargando…</div>
          ) : history.length === 0 ? (
            <div className="panel"><div className="muted">Sin registros.</div></div>
          ) : (
            <div style={{ display:"grid", gap:14 }}>
              {history.map(a => (
                <div key={a.id} className="panel" style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ fontWeight:700 }}>{a.slot?.start_at ? fmt(a.slot.start_at) : "—"}</div>
                    <div className="muted">Estado: <strong>{a.status}</strong></div>
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <button className="btn btn--ghost" disabled>Recibo</button>
                    <button className="btn btn--ghost" disabled>Resumen</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
