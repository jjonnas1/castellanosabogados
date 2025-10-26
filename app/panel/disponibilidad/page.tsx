// app/panel/disponibilidad/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type WeeklyRule = {
  id?: string;
  weekday: number;        // 0=Dom, 1=Lun,...6=Sáb
  start_time: string;     // "09:00"
  end_time: string;       // "17:00"
  enabled: boolean;       // UI helper (si existe regla ese día)
};

type ExceptionRule = {
  id?: string;
  date_override: string;  // "2025-10-26"
  available: boolean;     // false = bloquear ese día
  note?: string;
};

const DAYS = [
  { i: 1, label: "Lunes" },
  { i: 2, label: "Martes" },
  { i: 3, label: "Miércoles" },
  { i: 4, label: "Jueves" },
  { i: 5, label: "Viernes" },
  { i: 6, label: "Sábado" },
  { i: 0, label: "Domingo" },
];

export default function DisponibilidadPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [weekly, setWeekly] = useState<WeeklyRule[]>(
    DAYS.map((d) => ({
      weekday: d.i,
      start_time: "09:00",
      end_time: "17:00",
      enabled: false,
    }))
  );

  const [exceptions, setExceptions] = useState<ExceptionRule[]>([]);
  const [newException, setNewException] = useState<ExceptionRule>({
    date_override: "",
    available: false,
    note: "Día bloqueado",
  });

  // Cargar reglas y excepciones del usuario autenticado
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session) {
        setLoading(false);
        return;
      }

      // Traer reglas semanales (date_override IS NULL)
      const { data: weeklyRows, error: wErr } = await supabase
        .from("lawyer_availability")
        .select("id, weekday, start_time, end_time")
        .is("date_override", null);

      if (!wErr && weeklyRows) {
        setWeekly((prev) =>
          prev.map((r) => {
            const row = weeklyRows.find((x) => x.weekday === r.weekday);
            if (!row) return r;
            return {
              id: row.id,
              weekday: r.weekday,
              start_time: (row.start_time as string).slice(0, 5),
              end_time: (row.end_time as string).slice(0, 5),
              enabled: true,
            };
          })
        );
      }

      // Traer excepciones (date_override NOT NULL), próximas primero
      const { data: excRows, error: eErr } = await supabase
        .from("lawyer_availability")
        .select("id, date_override, available, note")
        .not("date_override", "is", null)
        .order("date_override", { ascending: true });

      if (!eErr && excRows) {
        setExceptions(
          excRows.map((x) => ({
            id: x.id,
            date_override: x.date_override as string,
            available: Boolean(x.available),
            note: x.note ?? "",
          }))
        );
      }

      setLoading(false);
    })();
  }, []);

  const canSave = useMemo(() => !saving && !loading, [saving, loading]);

  async function saveWeekly() {
    if (!canSave) return;
    setSaving(true);

    // estrategia simple: borrar reglas semanales actuales y volver a insertar según el UI
    const { error: delErr } = await supabase
      .from("lawyer_availability")
      .delete()
      .is("date_override", null);

    if (delErr) {
      alert("No pudimos actualizar reglas semanales: " + delErr.message);
      setSaving(false);
      return;
    }

    const rowsToInsert = weekly
      .filter((r) => r.enabled)
      .map((r) => ({
        weekday: r.weekday,
        start_time: r.start_time + ":00",
        end_time: r.end_time + ":00",
        date_override: null as any, // importante para que sea semanal
        available: true,
      }));

    if (rowsToInsert.length) {
      const { error: insErr } = await supabase
        .from("lawyer_availability")
        .insert(rowsToInsert);

      if (insErr) {
        alert("Error guardando reglas: " + insErr.message);
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    alert("Disponibilidad semanal guardada.");
  }

  async function addException() {
    if (!newException.date_override) {
      alert("Elige una fecha para la excepción.");
      return;
    }
    const { error } = await supabase.from("lawyer_availability").insert({
      date_override: newException.date_override,
      available: newException.available, // false = bloquear
      note: newException.note ?? "",
    });
    if (error) {
      alert("No pudimos crear la excepción: " + error.message);
      return;
    }
    setExceptions((prev) => [
      ...prev,
      { ...newException, id: Math.random().toString(36).slice(2) },
    ]);
    setNewException({ date_override: "", available: false, note: "Día bloqueado" });
  }

  async function removeException(id?: string) {
    if (!id) return;
    const { error } = await supabase
      .from("lawyer_availability")
      .delete()
      .eq("id", id);
    if (error) {
      alert("No pudimos eliminar la excepción: " + error.message);
      return;
    }
    setExceptions((prev) => prev.filter((e) => e.id !== id));
  }

  async function generateSlots() {
    if (generating) return;
    setGenerating(true);
    // genera slots para los próximos 14 días, de 20 minutos
    const { data, error } = await supabase.rpc("generate_slots_from_rules", {
      days_ahead: 14,
      slot_minutes: 20,
    });
    setGenerating(false);
    if (error) {
      alert("No pudimos generar los horarios: " + error.message);
      return;
    }
    alert(`Listo. Se generaron ${data ?? 0} slots de disponibilidad.`);
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 920 }}>
        <h1 className="h2">Disponibilidad</h1>
        <p className="muted">
          Configura tu horario semanal y bloquea días puntuales. Luego genera los
          slots visibles para los clientes.
        </p>

        {/* Reglas semanales */}
        <div className="panel" style={{ marginTop: 16 }}>
          <h3 className="h2" style={{ fontSize: "1.15rem" }}>Horario semanal</h3>
          <div className="grid" style={{ display: "grid", gap: 12 }}>
            {DAYS.map((d) => {
              const r = weekly.find((x) => x.weekday === d.i)!;
              return (
                <div key={d.i} className="card" style={{ padding: 16 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <input
                      type="checkbox"
                      checked={r.enabled}
                      onChange={(e) =>
                        setWeekly((prev) =>
                          prev.map((x) =>
                            x.weekday === d.i ? { ...x, enabled: e.target.checked } : x
                          )
                        )
                      }
                    />
                    <strong>{d.label}</strong>
                  </label>

                  <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                    <div>
                      <div style={{ fontSize: 12, opacity: 0.7 }}>Desde</div>
                      <input
                        type="time"
                        value={r.start_time}
                        disabled={!r.enabled}
                        onChange={(e) =>
                          setWeekly((prev) =>
                            prev.map((x) =>
                              x.weekday === d.i ? { ...x, start_time: e.target.value } : x
                            )
                          )
                        }
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, opacity: 0.7 }}>Hasta</div>
                      <input
                        type="time"
                        value={r.end_time}
                        disabled={!r.enabled}
                        onChange={(e) =>
                          setWeekly((prev) =>
                            prev.map((x) =>
                              x.weekday === d.i ? { ...x, end_time: e.target.value } : x
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 12 }}>
            <button className="btn btn--primary" disabled={!canSave} onClick={saveWeekly}>
              {saving ? "Guardando…" : "Guardar horario semanal"}
            </button>
          </div>
        </div>

        {/* Excepciones */}
        <div className="panel" style={{ marginTop: 16 }}>
          <h3 className="h2" style={{ fontSize: "1.15rem" }}>Excepciones (bloqueos / aperturas puntuales)</h3>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end" }}>
            <div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Fecha</div>
              <input
                type="date"
                value={newException.date_override}
                onChange={(e) =>
                  setNewException((s) => ({ ...s, date_override: e.target.value }))
                }
              />
            </div>
            <div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>¿Disponible?</div>
              <select
                value={newException.available ? "1" : "0"}
                onChange={(e) =>
                  setNewException((s) => ({ ...s, available: e.target.value === "1" }))
                }
              >
                <option value="0">Bloquear</option>
                <option value="1">Abrir</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Nota</div>
              <input
                type="text"
                placeholder="Motivo (opcional)"
                value={newException.note || ""}
                onChange={(e) =>
                  setNewException((s) => ({ ...s, note: e.target.value }))
                }
              />
            </div>
            <button className="btn btn--ghost" onClick={addException}>
              Agregar excepción
            </button>
          </div>

          {exceptions.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <ul className="list">
                {exceptions.map((ex) => (
                  <li key={ex.id} className="service" style={{ justifyContent: "space-between" }}>
                    <div>
                      <strong>{ex.date_override}</strong>{" "}
                      <span className="muted">
                        {ex.available ? "Disponible" : "Bloqueado"}
                        {ex.note ? ` · ${ex.note}` : ""}
                      </span>
                    </div>
                    <button className="btn btn--ghost" onClick={() => removeException(ex.id)}>
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Generar slots */}
        <div className="panel" style={{ marginTop: 16 }}>
          <h3 className="h2" style={{ fontSize: "1.15rem" }}>Publicar horarios</h3>
          <p className="muted">
            Esto creará los <em>slots</em> reales en tu agenda (tabla <code>availability_slots</code>) para
            los próximos 14 días, en intervalos de 20 minutos, respetando reglas y excepciones.
          </p>
          <button className="btn btn--primary" disabled={generating} onClick={generateSlots}>
            {generating ? "Generando…" : "Generar slots (14 días, 20 min)"}
          </button>
        </div>
      </div>
    </main>
  );
}
