// app/cliente/panel/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Appt = {
  id: string;
  client_id: string;
  lawyer_id: string;
  slot_id: string;
  status: "pending" | "paid" | "confirmed" | "in_call" | "completed" | "cancelled" | "no_show";
  duration_min: number;
  meet_url: string | null;
  created_at: string;
};

type PaymentRow = {
  id: string;
  status: "pending" | "approved" | "declined" | "refunded";
  amount_cop: number;
  receipt_url: string | null;
  appointment: {
    id: string;
    created_at: string;
    lawyer_id: string;
  } | null;
};

type LawyerLite = {
  id: string;
  full_name: string | null;
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });

export default function ClientePanelPage() {
  const [tab, setTab] = useState<"upcoming" | "history" | "receipts">("upcoming");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, []);

  if (!userId) {
    return (
      <main className="section">
        <div className="wrap">
          <div className="panel">Inicia sesión para ver tu panel.</div>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 980 }}>
        <header className="panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <div className="muted" style={{ fontWeight: 700 }}>Panel de cliente</div>
            <SessionEmail />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a className="btn btn--ghost" href="/agenda">Agendar nueva</a>
            <button
              className="btn btn--ghost"
              onClick={async () => { await supabase.auth.signOut(); location.href = "/"; }}
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <nav style={{ display: "flex", gap: 8, marginTop: 18 }}>
          <TabButton active={tab === "upcoming"} onClick={() => setTab("upcoming")}>Próximas</TabButton>
          <TabButton active={tab === "history"} onClick={() => setTab("history")}>Historial</TabButton>
          <TabButton active={tab === "receipts"} onClick={() => setTab("receipts")}>Recibos</TabButton>
        </nav>

        {tab === "upcoming" && <Upcoming userId={userId} />}
        {tab === "history" && <History userId={userId} />}
        {tab === "receipts" && <Receipts userId={userId} />}
      </div>
    </main>
  );
}

function SessionEmail() {
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? ""));
  }, []);
  return <div style={{ fontSize: 14 }}>Sesión: <strong>{email || "—"}</strong></div>;
}

function TabButton({ active, onClick, children }: { active: boolean; onClick(): void; children: React.ReactNode; }) {
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

/* ====================== Próximas (cancelar / solicitar reagendar) ====================== */

function Upcoming({ userId }: { userId: string }) {
  const [rows, setRows] = useState<Appt[]>([]);
  const [lawyers, setLawyers] = useState<Record<string, LawyerLite>>({});
  const [loading, setLoading] = useState(true);

  // modal reagendar
  const [openResched, setOpenResched] = useState<string | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);

      // citas del cliente con estado activo (no canceladas/completadas)
      const { data: appts } = await supabase
        .from<Appt>("appointments")
        .select("*")
        .eq("client_id", userId)
        .in("status", ["pending", "paid", "confirmed", "in_call"])
        .order("created_at", { ascending: true });

      setRows(appts || []);

      // obtener nombres de abogados
      const lawyerIds = [...new Set((appts || []).map((a) => a.lawyer_id))];
      if (lawyerIds.length) {
        const { data: law } = await supabase
          .from("lawyers")
          .select("id, user_id, profiles:profiles(full_name)")
          .in("id", lawyerIds);

        const map: Record<string, LawyerLite> = {};
        (law || []).forEach((l: any) => {
          map[l.id] = { id: l.id, full_name: l.profiles?.full_name ?? null };
        });
        setLawyers(map);
      }

      setLoading(false);
    })();
  }, [userId]);

  async function cancelAppt(id: string) {
    if (!confirm("¿Cancelar esta asesoría?")) return;
    const { error } = await supabase.from("appointments").update({ status: "cancelled" }).eq("id", id);
    if (error) alert("No pudimos cancelar. Intenta nuevamente.");
    else setRows((arr) => arr.filter((r) => r.id !== id));
  }

  async function requestReschedule(id: string, lawyerId: string) {
    if (!newDate || !newTime) {
      alert("Selecciona fecha y hora.");
      return;
    }
    // Creamos una "solicitud" en notifications, y dejamos que el equipo/abogado la procese.
    const payload = { appointment_id: id, request: "reschedule", desired: `${newDate} ${newTime}`, lawyer_id: lawyerId };
    const { error } = await supabase.from("notifications").insert({
      user_id: userId,
      channel: "email",
      template: "client_reschedule_request",
      payload,
    });
    if (error) alert("No pudimos enviar la solicitud.");
    else {
      alert("Solicitud de reagendamiento enviada ✅");
      setOpenResched(null);
      setNewDate("");
      setNewTime("");
    }
  }

  return (
    <section style={{ marginTop: 16, display: "grid", gap: 14 }}>
      <h2 className="h2" style={{ marginBottom: 8 }}>Próximas asesorías</h2>
      {loading && <div className="panel">Cargando…</div>}
      {!loading && rows.length === 0 && <div className="panel">No tienes asesorías próximas.</div>}

      {rows.map((r) => (
        <div key={r.id} className="panel" style={{ display: "grid", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 700 }}>{fmtDate(r.created_at)}</div>
              <div className="muted">
                Abogado: <strong>{lawyers[r.lawyer_id]?.full_name || "—"}</strong> · Estado: <strong>{r.status}</strong> · Duración: {r.duration_min} min
              </div>
              {r.meet_url && (
                <div style={{ marginTop: 6 }}>
                  <a className="btn btn--ghost" href={r.meet_url} target="_blank">Entrar a la sala</a>
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn--ghost" onClick={() => setOpenResched(r.id)}>Solicitar reagendar</button>
              <button className="btn btn--ghost" onClick={() => cancelAppt(r.id)}>Cancelar</button>
            </div>
          </div>

          {openResched === r.id && (
            <div className="panel" style={{ background: "var(--surface-tint)" }}>
              <div style={{ display: "grid", gap: 10, gridTemplateColumns: "160px 140px 1fr 120px", alignItems: "end" }}>
                <div>
                  <label><strong>Fecha deseada</strong></label>
                  <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                </div>
                <div>
                  <label><strong>Hora</strong></label>
                  <input type="time" step={1200} value={newTime} onChange={(e) => setNewTime(e.target.value)} />
                </div>
                <div className="muted" style={{ fontSize: 14 }}>
                  Te confirmaremos por correo según la disponibilidad del abogado.
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn--primary" onClick={() => requestReschedule(r.id, r.lawyer_id)}>Enviar</button>
                  <button className="btn btn--ghost" onClick={() => setOpenResched(null)}>Cerrar</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

/* ====================== Historial ====================== */

function History({ userId }: { userId: string }) {
  const [rows, setRows] = useState<Appt[]>([]);
  const [lawyers, setLawyers] = useState<Record<string, LawyerLite>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: appts } = await supabase
        .from<Appt>("appointments")
        .select("*")
        .eq("client_id", userId)
        .in("status", ["completed", "cancelled", "no_show"])
        .order("created_at", { ascending: false });

      setRows(appts || []);

      const lawyerIds = [...new Set((appts || []).map((a) => a.lawyer_id))];
      if (lawyerIds.length) {
        const { data: law } = await supabase
          .from("lawyers")
          .select("id, user_id, profiles:profiles(full_name)")
          .in("id", lawyerIds);
        const map: Record<string, LawyerLite> = {};
        (law || []).forEach((l: any) => {
          map[l.id] = { id: l.id, full_name: l.profiles?.full_name ?? null };
        });
        setLawyers(map);
      }
      setLoading(false);
    })();
  }, [userId]);

  return (
    <section style={{ marginTop: 16, display: "grid", gap: 14 }}>
      <h2 className="h2" style={{ marginBottom: 8 }}>Historial</h2>
      {loading && <div className="panel">Cargando…</div>}
      {!loading && rows.length === 0 && <div className="panel">Aún no tienes historial.</div>}
      {rows.map((r) => (
        <div key={r.id} className="panel" style={{ display: "grid", gap: 6 }}>
          <div style={{ fontWeight: 700 }}>{fmtDate(r.created_at)}</div>
          <div className="muted">
            Abogado: <strong>{lawyers[r.lawyer_id]?.full_name || "—"}</strong> · Estado: <strong>{r.status}</strong> · Duración: {r.duration_min} min
          </div>
        </div>
      ))}
    </section>
  );
}

/* ====================== Recibos ====================== */

function Receipts({ userId }: { userId: string }) {
  const [rows, setRows] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // Pagos de citas del cliente
      const { data } = await supabase
        .from<PaymentRow>("payments")
        .select("id,status,amount_cop,receipt_url,appointment:appointments(id,created_at,lawyer_id)")
        .eq("appointments.client_id", userId)
        .order("created_at", { ascending: false });

      setRows(data || []);
      setLoading(false);
    })();
  }, [userId]);

  return (
    <section style={{ marginTop: 16, display: "grid", gap: 14 }}>
      <h2 className="h2" style={{ marginBottom: 8 }}>Recibos</h2>
      {loading && <div className="panel">Cargando…</div>}
      {!loading && rows.length === 0 && <div className="panel">No hay pagos registrados aún.</div>}
      {rows.map((p) => (
        <div key={p.id} className="panel" style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 700 }}>
              {p.appointment?.created_at ? fmtDate(p.appointment.created_at) : "—"}
            </div>
            <div className="muted">Estado: <strong>{p.status}</strong> · Valor: ${p.amount_cop.toLocaleString("es-CO")}</div>
          </div>
          <div>
            {p.receipt_url ? (
              <a className="btn btn--ghost" href={p.receipt_url} target="_blank">Ver recibo</a>
            ) : (
              <span className="muted">Sin recibo</span>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
async function cancelAppt(id: string) {
  // Traer start_at del slot para calcular diferencia localmente
  const { data: a } = await supabase
    .from("appointments")
    .select("slot_id")
    .eq("id", id)
    .single();

  if (a?.slot_id) {
    const { data: s } = await supabase
      .from("availability_slots")
      .select("start_at")
      .eq("id", a.slot_id)
      .single();

    if (s?.start_at) {
      const start = new Date(s.start_at);
      const now = new Date();
      const sameDay = start.toDateString() === now.toDateString();
      const diffMs = +start - +now;
      const diffH = diffMs / (1000 * 60 * 60);

      const minH = sameDay ? 3 : 24;
      if (diffH < minH) {
        alert(
          `No puedes cancelar: faltan menos de ${minH} horas para tu cita (${
            sameDay ? "hoy" : "fecha próxima"
          }).`
        );
        return;
      }
    }
  }

  if (!confirm("¿Cancelar esta asesoría?")) return;

  const { error } = await supabase
    .from("appointments")
    .update({ status: "cancelled" })
    .eq("id", id);

  if (error) {
    // Mensaje de la BD (por si cambió el tiempo entre el check y el update)
    alert(error.message || "No pudimos cancelar. Intenta nuevamente.");
  } else {
    alert("Cita cancelada ✅");
    setRows((arr) => arr.filter((r) => r.id !== id));
  }
}
