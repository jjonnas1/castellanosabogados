// app/panel/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Utilidad simple
const fmt = (d: Date) =>
  d.toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" });

const WEEKDAYS = [
  { i: 1, label: "Lun" },
  { i: 2, label: "Mar" },
  { i: 3, label: "Mié" },
  { i: 4, label: "Jue" },
  { i: 5, label: "Vie" },
  { i: 6, label: "Sáb" },
  { i: 0, label: "Dom" },
];

type AvRow = {
  id: string;
  user_id: string;
  weekday: number | null;
  start_time: string | null; // "09:00:00"
  end_time: string | null;   // "17:00:00"
  date_override: string | null; // "2025-10-26"
  available: boolean;
  note: string | null;
};

export default function LawyerPanelPage() {
  const [tab, setTab] = useState<"agenda" | "history" | "availability">(
    "availability"
  );
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, []);

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 980 }}>
        <header
          className="panel"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div>
            <div className="muted" style={{ fontWeight: 700 }}>
              Mi panel
            </div>
            <SessionEmail />
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <a href="/convocatorias" className="btn btn--ghost">
              Convocatorias
            </a>
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
          <TabButton active={tab === "agenda"} onClick={() => setTab("agenda")}>
            Próximas
          </TabButton>
          <TabButton
            active={tab === "history"}
            onClick={() => setTab("history")}
          >
            Historial
          </TabButton>
          <TabButton
            active={tab === "availability"}
            onClick={() => setTab("availability")}
          >
            Disponibilidad
          </TabButton>
        </div>

        {tab === "agenda" && <MockAgenda />}
        {tab === "history" && <MockHistory />}
        {tab === "availability" && userId && (
          <AvailabilityEditor userId={userId} />
        )}
      </div>
    </main>
  );
}

function SessionEmail() {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? "");
    });
  }, []);

  return (
    <div style={{ fontSize: 14 }}>
      Sesión iniciada como <strong>{email || "—"}</strong>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick(): void;
  children: React.ReactNode;
}) {
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

/* ------------ MOCKS de agenda/historial (igual a lo que ya tenías) ------------ */
function MockAgenda() {
  const items = [
    {
      when: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      area: "Laboral",
      client: "María R.",
      status: "Confirmada",
    },
    {
      when: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3.5),
      area: "Civil",
      client: "Carlos V.",
      status: "Pendiente",
    },
  ];
  return (
    <section style={{ marginTop: 16 }}>
      <h2 className="h2" style={{ marginBottom: 10 }}>
        Próximas asesorías
      </h2>
      <div style={{ display: "grid", gap: 14 }}>
        {items.map((it, i) => (
          <div key={i} className="panel">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{fmt(it.when)}</div>
                <div className="muted">
                  <strong>{it.area}</strong> · Cliente: {it.client}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span
                  className="badge"
                  style={{
                    background:
                      it.status === "Confirmada" ? "#eafaf0" : "#fff7e6",
                    color: it.status === "Confirmada" ? "#10733b" : "#8a6200",
                    fontWeight: 700,
                  }}
                >
                  {it.status}
                </span>
                <button className="btn btn--ghost">Ver detalle</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MockHistory() {
  const items = [
    {
      when: new Date(Date.now() - 1000 * 60 * 60 * 48),
      area: "Familia",
      client: "Diana P.",
      status: "Finalizada",
    },
  ];
  return (
    <section style={{ marginTop: 16 }}>
      <h2 className="h2" style={{ marginBottom: 10 }}>
        Historial
      </h2>
      <div style={{ display: "grid", gap: 14 }}>
        {items.map((it, i) => (
          <div key={i} className="panel">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{fmt(it.when)}</div>
                <div className="muted">
                  <strong>{it.area}</strong> · Cliente: {it.client}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span
                  className="badge"
                  style={{
                    background: "#eafaf0",
                    color: "#10733b",
                    fontWeight: 700,
                  }}
                >
                  {it.status}
                </span>
                <button className="btn btn--ghost">Resumen</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------ EDITOR DE DISPONIBILIDAD ------------------------ */

function AvailabilityEditor({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [weekly, setWeekly] = useState<
    { weekday: number; start: string; end: string; enabled: boolean; id?: string }[]
  >([]);
  const [overrides, setOverrides] = useState<
    { id?: string; date: string; available: boolean; note: string }[]
  >([]);

  // Cargar datos
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from<AvRow>("lawyer_availability")
        .select("*")
        .order("weekday", { ascending: true });

      if (!error) {
        // Weekly
        const wk: Record<number, AvRow | undefined> = {};
        data
          .filter((r) => r.date_override === null)
          .forEach((r) => (wk[(r.weekday ?? -1)] = r));

        const base = WEEKDAYS.map((d) => {
          const row = wk[d.i];
          return {
            id: row?.id,
            weekday: d.i,
            start: row?.start_time?.slice(0, 5) || "09:00",
            end: row?.end_time?.slice(0, 5) || "17:00",
            enabled: !!row,
          };
        });

        setWeekly(base);

        // Overrides
        const ov = data
          .filter((r) => r.date_override !== null)
          .map((r) => ({
            id: r.id,
            date: r.date_override!,
            available: r.available,
            note: r.note || "",
          }))
          .sort((a, b) => a.date.localeCompare(b.date));

        setOverrides(ov);
      }
      setLoading(false);
    })();
  }, []);

  const canSave = useMemo(
    () => !loading && !saving,
    [loading, saving]
  );

  async function saveAll() {
    if (!canSave) return;
    setSaving(true);

    // 1) Limpiar todas las filas del user y reinsertar (simple y robusto)
    const del = await supabase
      .from("lawyer_availability")
      .delete()
      .eq("user_id", userId);

    if (del.error) {
      alert("Error guardando disponibilidad.");
      setSaving(false);
      return;
    }

    // 2) Insertar weekly habilitados
    const weeklyRows = weekly
      .filter((w) => w.enabled)
      .map((w) => ({
        user_id: userId,
        weekday: w.weekday,
        start_time: w.start + ":00",
        end_time: w.end + ":00",
        available: true,
        date_override: null,
        note: null,
      }));

    // 3) Insertar overrides
    const overrideRows = overrides.map((o) => ({
      user_id: userId,
      weekday: null,
      start_time: null,
      end_time: null,
      available: o.available,
      date_override: o.date,
      note: o.note || null,
    }));

    const ins = await supabase
      .from("lawyer_availability")
      .insert([...weeklyRows, ...overrideRows]);

    if (ins.error) {
      alert("No pudimos guardar los cambios.");
    } else {
      alert("Disponibilidad actualizada ✅");
    }
    setSaving(false);
  }

  function addOverride() {
    const today = new Date().toISOString().slice(0, 10);
    setOverrides((arr) => [
      ...arr,
      { date: today, available: false, note: "" },
    ]);
  }

  function removeOverride(i: number) {
    setOverrides((arr) => arr.filter((_, idx) => idx !== i));
  }

  if (loading) {
    return (
      <section style={{ marginTop: 18 }}>
        <div className="panel">Cargando disponibilidad…</div>
      </section>
    );
  }

  return (
    <section style={{ marginTop: 18, display: "grid", gap: 18 }}>
      <h2 className="h2" style={{ marginBottom: -4 }}>
        Disponibilidad
      </h2>

      {/* Semanal */}
      <div className="panel">
        <h3 style={{ margin: 0, marginBottom: 10 }}>Horario semanal</h3>
        <p className="muted" style={{ marginTop: 6 }}>
          Activa los días en los que atiendes y ajusta tu rango de horas.
        </p>

        <div style={{ display: "grid", gap: 10 }}>
          {weekly.map((w, i) => (
            <div
              key={w.weekday}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 80px 100px 100px",
                gap: 10,
                alignItems: "center",
              }}
            >
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={w.enabled}
                  onChange={(e) =>
                    setWeekly((arr) =>
                      arr.map((row, idx) =>
                        idx === i ? { ...row, enabled: e.target.checked } : row
                      )
                    )
                  }
                />
                <strong>{WEEKDAYS.find((d) => d.i === w.weekday)?.label}</strong>
              </label>

              <span className="muted" style={{ fontSize: 13 }}>
                {w.enabled ? "Activo" : "Inactivo"}
              </span>

              <input
                type="time"
                value={w.start}
                disabled={!w.enabled}
                onChange={(e) =>
                  setWeekly((arr) =>
                    arr.map((row, idx) =>
                      idx === i ? { ...row, start: e.target.value } : row
                    )
                  )
                }
              />
              <input
                type="time"
                value={w.end}
                disabled={!w.enabled}
                onChange={(e) =>
                  setWeekly((arr) =>
                    arr.map((row, idx) =>
                      idx === i ? { ...row, end: e.target.value } : row
                    )
                  )
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bloqueos/Excepciones */}
      <div className="panel">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>Bloqueos / Excepciones por fecha</h3>
          <button className="btn btn--ghost" onClick={addOverride}>
            + Añadir fecha
          </button>
        </div>
        <p className="muted" style={{ marginTop: 6 }}>
          Útil para vacaciones, audiencias o ausencias puntuales.
        </p>

        <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
          {overrides.length === 0 && (
            <div className="muted">No hay excepciones registradas.</div>
          )}

          {overrides.map((o, i) => (
            <div
              key={i}
              className="panel"
              style={{ display: "grid", gridTemplateColumns: "160px 140px 1fr 80px", gap: 10, alignItems: "center" }}
            >
              <input
                type="date"
                value={o.date}
                onChange={(e) =>
                  setOverrides((arr) =>
                    arr.map((row, idx) =>
                      idx === i ? { ...row, date: e.target.value } : row
                    )
                  )
                }
              />
              <select
                value={o.available ? "1" : "0"}
                onChange={(e) =>
                  setOverrides((arr) =>
                    arr.map((row, idx) =>
                      idx === i
                        ? { ...row, available: e.target.value === "1" }
                        : row
                    )
                  )
                }
              >
                <option value="1">Disponible</option>
                <option value="0">Bloqueado</option>
              </select>
              <input
                type="text"
                placeholder="Nota (opcional)"
                value={o.note}
                onChange={(e) =>
                  setOverrides((arr) =>
                    arr.map((row, idx) =>
                      idx === i ? { ...row, note: e.target.value } : row
                    )
                  )
                }
              />
              <button
                className="btn btn--ghost"
                onClick={() => removeOverride(i)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button className="btn btn--ghost" onClick={() => location.reload()}>
          Descartar cambios
        </button>
        <button
          className="btn btn--primary"
          disabled={!canSave}
          onClick={saveAll}
        >
          {saving ? "Guardando…" : "Guardar disponibilidad"}
        </button>
      </div>
    </section>
  );
}
