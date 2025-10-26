"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// util
const fmt = (d: string | Date) =>
  new Date(d).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });

type Appt = {
  id: string;
  status: string;             // pending | paid | confirmed | in_call | completed | cancelled | no_show
  created_at: string;
  meet_url: string | null;
  duration_min: number;
  slot_id: string;
  lawyer_id: string;
};

type Slot = { id: string; start_at: string; end_at: string };
type Lawyer = { id: string; user_id: string };

export default function ClientePanelPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [appts, setAppts] = useState<
    (Appt & { slot?: Slot | null; lawyer?: Lawyer | null })[]
  >([]);
  const [err, setErr] = useState<string | null>(null);

  // estado de cancelación
  const [canceling, setCanceling] = useState<string | null>(null);
  const [reason, setReason] = useState("");

  // cargar sesión
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id ?? null);
      setEmail(data.user?.email ?? "");
    })();
  }, []);

  // cargar citas
  useEffect(() => {
    if (!userId) { setLoading(false); return; }

    (async () => {
      setLoading(true);
      setErr(null);

      // citas activas + historial
      const { data: apptsRaw, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("client_id", userId)
        .order("created_at", { ascending: false });

      if (error) { setErr(error.message); setLoading(false); return; }

      const withJoins = await Promise.all(
        (apptsRaw || []).map(async (a: Appt) => {
          const [{ data: slot }, { data: lawyer }] = await Promise.all([
            supabase.from("availability_slots").select("id,start_at,end_at").eq("id", a.slot_id).single(),
            supabase.from("lawyers").select("id,user_id").eq("id", a.lawyer_id).single(),
          ]);
          return { ...a, slot: slot || null, lawyer: lawyer || null };
        })
      );

      setAppts(withJoins);
      setLoading(false);
    })();
  }, [userId]);

  const upcoming = useMemo(
    () => appts.filter(a => !["completed", "cancelled", "no_show"].includes(a.status)),
    [appts]
  );
  const history = useMemo(
    () => appts.filter(a => ["completed", "cancelled", "no_show"].includes(a.status)),
    [appts]
  );

  async function handleCancel(apptId: string) {
    if (!reason.trim()) {
      alert("Cuéntanos brevemente el motivo de la cancelación.");
      return;
    }
    setCanceling(apptId);

    const { error } = await supabase
      .from("appointments")
      .update({
        status: "cancelled",
        cancelled_at: new Date().toISOString(),
        cancellation_reason: reason.trim(),
      })
      .eq("id", apptId);

    setCanceling(null);

    if (error) {
      // Mensaje del trigger de ventana mínima (si aplica)
      alert(error.message || "No pudimos cancelar la cita.");
      return;
    }

    // refrescar
    const next = appts.map(a => a.id === apptId ? { ...a, status: "cancelled" } : a);
    setAppts(next);
    setReason("");
    alert("Cita cancelada ✅");
  }

  // UI SIN sesión: pedir enlace
  if (!userId) {
    return (
      <main className="section">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <h1 className="h2">Tu panel</h1>
          <p className="muted">Para ver o cancelar tus citas, ingresa con el enlace mágico.</p>
          <RequestLinkCard />
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 960 }}>
        <div className="panel" style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div className="muted" style={{ fontWeight: 700 }}>Panel de cliente</div>
            <div style={{ fontSize: 14 }}>Sesión iniciada como <strong>{email}</strong></div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <a className="btn btn--ghost" href="/clientes/agenda">Solicitar nueva asesoría</a>
            <button
              className="btn btn--ghost"
              onClick={async () => { await supabase.auth.signOut(); location.reload(); }}
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Preferencias recientes (si guardamos algo en agenda) */}
        <ClientPrefHint />

        {loading ? (
          <div className="panel">Cargando…</div>
        ) : err ? (
          <div className="panel" style={{ background:"#fff5f5", borderColor:"#fed7d7" }}>
            ❌ {err}
          </div>
        ) : (
          <section style={{ display:"grid", gap:18, marginTop:18 }}>
            <div>
              <h2 className="h2" style={{ marginBottom: 10 }}>Próximas asesorías</h2>
              <div style={{ display:"grid", gap:12 }}>
                {upcoming.length === 0 && <div className="panel muted">Aún no tienes asesorías próximas.</div>}
                {upcoming.map((a) => (
                  <div key={a.id} className="panel" style={{ display:"grid", gap:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{a.slot?.start_at ? fmt(a.slot.start_at) : "Por asignar"}</div>
                        <div className="muted">
                          Estado: <strong>{a.status}</strong>
                          {a.duration_min ? ` · ${a.duration_min} min` : null}
                        </div>
                      </div>
                      <div style={{ display:"flex", gap:8 }}>
                        {a.meet_url && (
                          <a className="btn btn--ghost" href={a.meet_url} target="_blank">
                            Entrar a la videollamada
                          </a>
                        )}
                        <button
                          className="btn btn--ghost"
                          onClick={() => {
                            const msg = prompt("Escribe el motivo para cancelar:");
                            if (msg !== null) { setReason(msg); handleCancel(a.id); }
                          }}
                          disabled={canceling === a.id}
                        >
                          {canceling === a.id ? "Cancelando…" : "Cancelar"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="h2" style={{ marginBottom: 10 }}>Historial</h2>
              <div style={{ display:"grid", gap:12 }}>
                {history.length === 0 && <div className="panel muted">Sin historial aún.</div>}
                {history.map((a) => (
                  <div key={a.id} className="panel">
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <div>
                        <div style={{ fontWeight:700 }}>{a.slot?.start_at ? fmt(a.slot.start_at) : "Sin fecha"}</div>
                        <div className="muted">Estado: <strong>{a.status}</strong></div>
                      </div>
                      <div>
                        <button className="btn btn--ghost">Recibo</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function RequestLinkCard() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function send() {
    setLoading(true);
    setErr(null);
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const emailRedirectTo = `${origin}/cliente/panel`;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo },
      });
      if (error) throw error;
      setOk(true);
    } catch (e: any) {
      setErr(e?.message || "No pudimos enviar el enlace.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel" style={{ display:"grid", gap:10, maxWidth:480 }}>
      <label><strong>Tu correo</strong></label>
      <input
        type="email"
        placeholder="tucorreo@ejemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div style={{ display:"flex", gap:8 }}>
        <button className="btn btn--primary" onClick={send} disabled={loading}>
          {loading ? "Enviando…" : "Enviar enlace de acceso"}
        </button>
        <a href="/" className="btn btn--ghost">Volver</a>
      </div>
      {ok && <div className="panel" style={{ background:"#f6ffed", borderColor:"#c6f6d5" }}>✅ Revisa tu correo.</div>}
      {err && <div className="panel" style={{ background:"#fff5f5", borderColor:"#fed7d7" }}>❌ {err}</div>}
    </div>
  );
}

function ClientPrefHint() {
  const [hint, setHint] = useState<{ area?: string; pref?: string } | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("ca_client_pref");
      if (!raw) return;
      const obj = JSON.parse(raw);
      setHint({ area: obj.area, pref: obj.pref });
    } catch {}
  }, []);
  if (!hint?.area && !hint?.pref) return null;
  return (
    <div className="panel" style={{ marginTop: 12 }}>
      <strong>Tu preferencia más reciente:</strong>{" "}
      <span className="muted">
        {hint.area ? `Área ${hint.area}` : ""} {hint.pref ? `· ${hint.pref}` : ""}
      </span>
    </div>
  );
}
