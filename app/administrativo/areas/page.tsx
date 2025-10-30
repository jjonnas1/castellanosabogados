// app/admin/areas/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Area = {
  id: string;
  slug: string;
  name: string;
  enabled: boolean;
  sort: number;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminAreasPage() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("service_areas")
      .select("id, slug, name, enabled, sort")
      .order("sort", { ascending: true });
    if (error) setError(error.message);
    setAreas(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleEnabled(area: Area) {
    setSaving(area.id);
    setError(null);
    const { error } = await supabase
      .from("service_areas")
      .update({ enabled: !area.enabled })
      .eq("id", area.id);
    if (error) setError(error.message);
    await load();
    setSaving(null);
  }

  return (
    <div className="wrap" style={{ maxWidth: 720, margin: "40px auto" }}>
      <h1 className="h2" style={{ marginBottom: 16 }}>Áreas de servicio</h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>
        Activa o desactiva las áreas que quieres ofrecer al público.
      </p>

      {error && (
        <div style={{ background: "#fee", border: "1px solid #f99", padding: 12, borderRadius: 8, marginBottom: 12 }}>
          {error}
        </div>
      )}

      {loading ? (
        <div>Cargando…</div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {areas.map((a) => (
            <div key={a.id} style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:12, border:"1px solid #eee", borderRadius:12}}>
              <div>
                <div style={{fontWeight:600}}>{a.name}</div>
                <div style={{fontSize:12, opacity:0.7}}>{a.slug}</div>
              </div>
              <button
                onClick={() => toggleEnabled(a)}
                disabled={saving === a.id}
                className={a.enabled ? "btn btn--primary" : "btn btn--ghost"}
              >
                {saving === a.id ? "Guardando…" : a.enabled ? "Activo" : "Inactivo"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
