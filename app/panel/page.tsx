"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PanelPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
      } else {
        setUser(user);
      }
      setLoading(false);
    }
    getUser();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando...</p>;
  if (!user) return null;

  return (
    <main className="section">
      <div className="wrap">
        <h1 className="h1">Bienvenido, {user.user_metadata?.nombre || "Abogado"}</h1>
        <p className="muted" style={{ marginBottom: 28 }}>
          Este es tu panel de gestión. Aquí podrás administrar tus asesorías, pagos y perfil.
        </p>

        <div className="tiles" style={{ marginTop: 22 }}>
          <div className="tile">
            <h3>🗓️ Próximas asesorías</h3>
            <p>Aquí aparecerán tus citas confirmadas con clientes.</p>
          </div>

          <div className="tile">
            <h3>💰 Pagos recibidos</h3>
            <p>Consulta los pagos generados por tus asesorías.</p>
          </div>

          <div className="tile">
            <h3>👤 Perfil profesional</h3>
            <p>Edita tu área de práctica, experiencia y datos de contacto.</p>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
            className="btn btn--ghost"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </main>
  );
}
