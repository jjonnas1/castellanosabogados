"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Cita = {
  id: string;
  fecha: string;        // ISO string
  cliente: string;
  especialidad: string;
  estado: "pendiente" | "confirmada" | "finalizada";
  enlace?: string;      // enlace de videollamada (futuro)
};

export default function PanelAbogadoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  // Datos de ejemplo (luego se reemplaza por Supabase)
  const [proximas, setProximas] = useState<Cita[]>([]);
  const [historial, setHistorial] = useState<Cita[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user ?? null;

      if (!user) {
        router.replace("/login");
        return;
      }

      setEmail(user.email ?? null);

      // Demo de citas
      const ahora = new Date();
      const demo: Cita[] = [
        {
          id: "c1",
          fecha: new Date(ahora.getTime() + 60 * 60 * 1000).toISOString(), // +1h
          cliente: "María R.",
          especialidad: "Laboral",
          estado: "confirmada",
        },
        {
          id: "c2",
          fecha: new Date(ahora.getTime() + 2 * 60 * 60 * 1000).toISOString(), // +2h
          cliente: "Carlos V.",
          especialidad: "Civil",
          estado: "pendiente",
        },
      ];

      const demoHist: Cita[] = [
        {
          id: "h1",
          fecha: new Date(ahora.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // -2d
          cliente: "Diana P.",
          especialidad: "Familia",
          estado: "finalizada",
        },
      ];

      setProximas(demo);
      setHistorial(demoHist);
      setLoading(false);
    })();
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (loading) {
    return (
      <main className="section">
        <div className="wrap">
          <div className="panel">Cargando tu panel…</div>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="wrap">
        <div className="cta" style={{ marginBottom: 18 }}>
          <div>
            <strong>Mi panel</strong>
            <div className="muted" style={{ marginTop: 4 }}>
              Sesión iniciada {email ? `como ${email}` : ""}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <a href="/trabaja" className="btn btn--ghost">Convocatorias</a>
            <button onClick={handleSignOut} className="btn btn--primary">
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Próximas asesorías */}
        <section style={{ marginBottom: 28 }}>
          <h2 className="h2" style={{ marginBottom: 10 }}>Próximas asesorías</h2>
          <div className="panel">
            {proximas.length === 0 ? (
              <div className="muted">No tienes asesorías programadas.</div>
            ) : (
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 12 }}>
                {proximas.map((c) => (
                  <li key={c.id} className="service" style={{ alignItems: "center" }}>
                    <div className="icon">🗓️</div>
                    <div style={{ flex: 1 }}>
                      <div><strong>{fmtFecha(c.fecha)}</strong> · {c.especialidad}</div>
                      <div className="muted">Cliente: {c.cliente}</div>
                    </div>
                    <EstadoPill estado={c.estado} />
                    <a href="#" className="btn btn--ghost" aria-disabled>Ver detalle</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Historial */}
        <section style={{ marginBottom: 28 }}>
          <h2 className="h2" style={{ marginBottom: 10 }}>Historial</h2>
          <div className="panel">
            {historial.length === 0 ? (
              <div className="muted">Aún no hay historial.</div>
            ) : (
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 12 }}>
                {historial.map((c) => (
                  <li key={c.id} className="service" style={{ alignItems: "center" }}>
                    <div className="icon">✅</div>
                    <div style={{ flex: 1 }}>
                      <div><strong>{fmtFecha(c.fecha)}</strong> · {c.especialidad}</div>
                      <div className="muted">Cliente: {c.cliente}</div>
                    </div>
                    <EstadoPill estado={c.estado} />
                    <a href="#" className="btn btn--ghost" aria-disabled>Resumen</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Pagos (placeholder) */}
        <section>
          <h2 className="h2" style={{ marginBottom: 10 }}>Pagos</h2>
          <div className="panel">
            <div className="muted">
              Próximamente verás tus pagos liquidados automáticamente por Wompi/Stripe.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function fmtFecha(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function EstadoPill({ estado }: { estado: Cita["estado"] }) {
  const map: Record<Cita["estado"], { bg: string; txt: string; label: string }> = {
    pendiente: { bg: "#fff7ed", txt: "#9a3412", label: "Pendiente" },
    confirmada: { bg: "#ecfeff", txt: "#155e75", label: "Confirmada" },
    finalizada: { bg: "#f0fdf4", txt: "#166534", label: "Finalizada" },
  };
  const s = map[estado];
  return (
    <span
      style={{
        background: s.bg,
        color: s.txt,
        borderRadius: 999,
        padding: "6px 10px",
        fontWeight: 700,
        fontSize: ".85rem",
        marginRight: 10,
        whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </span>
  );
}
