'use client';

import { useEffect, useState } from 'react';
import { createClient, Session } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Area = {
  id: number;
  slug: string;
  name: string;
  enabled: boolean;
  sort: number;
};

const ADMIN_EMAIL = 'jonatancastellanosabogado@gmail.com'; // ⚠️ cambia si es otro

export default function AdminAreasPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [areas, setAreas] = useState<Area[]>([]);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');

  // Cargar sesión
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) =>
      setSession(s)
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  // Cargar TODAS las áreas (esta vista es para admin)
  async function loadAreas() {
    const { data, error } = await supabase
      .from('service_areas')
      .select('id, slug, name, enabled, sort')
      .order('sort', { ascending: true });

    if (!error) setAreas(data || []);
  }

  useEffect(() => {
    loadAreas();
  }, []);

  const isAdmin = session?.user?.email === ADMIN_EMAIL;

  async function toggleEnabled(area: Area) {
    setSavingId(area.id);
    const { error } = await supabase
      .from('service_areas')
      .update({ enabled: !area.enabled })
      .eq('id', area.id);

    setSavingId(null);
    if (!error) loadAreas();
    else alert(error.message);
  }

  async function updateSort(area: Area, nextSort: number) {
    setSavingId(area.id);
    const { error } = await supabase
      .from('service_areas')
      .update({ sort: nextSort })
      .eq('id', area.id);

    setSavingId(null);
    if (!error) loadAreas();
    else alert(error.message);
  }

  async function createArea() {
    if (!newName.trim() || !newSlug.trim()) return;
    setCreating(true);

    const { error } = await supabase.from('service_areas').insert({
      name: newName.trim(),
      slug: newSlug.trim().toLowerCase(),
      enabled: false,
      sort: (areas[areas.length - 1]?.sort || 0) + 1,
    });

    setCreating(false);
    if (error) return alert(error.message);

    setNewName('');
    setNewSlug('');
    loadAreas();
  }

  if (loading) {
    return (
      <main className="main section">
        <div className="wrap">Cargando…</div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="main section">
        <div className="wrap" style={{ maxWidth: 600 }}>
          <h1 className="h1">Áreas de servicio</h1>
          <p className="muted">
            Para administrar las áreas debes iniciar sesión.
          </p>
          <a className="btn btn--primary" href="/cliente/acceso">
            Iniciar sesión
          </a>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="main section">
        <div className="wrap" style={{ maxWidth: 600 }}>
          <h1 className="h1">Áreas de servicio</h1>
          <p className="error">
            Esta sección es solo para administradores.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="main section">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <h1 className="h1">Áreas de servicio (Admin)</h1>
        <p className="muted">
          Activa/desactiva lo que se ofrece en la página de agenda. <br />
          <strong>Nota:</strong> Los usuarios solo ven las áreas con
          <code> enabled = true</code>.
        </p>

        {/* Crear nueva */}
        <div className="panel" style={{ margin: '16px 0', display: 'grid', gap: 10 }}>
          <h3>Nueva área</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8 }}>
            <input
              placeholder="Nombre visible (ej: Penal)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              placeholder="slug (ej: penal)"
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
            />
            <button className="btn" onClick={createArea} disabled={creating}>
              {creating ? 'Creando…' : 'Crear'}
            </button>
          </div>
        </div>

        {/* Lista */}
        <div className="panel" style={{ display: 'grid', gap: 8 }}>
          {areas.map((a) => (
            <div
              key={a.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 160px 140px 120px',
                gap: 8,
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{a.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>/{a.slug}</div>
              </div>

              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <label className="muted">Orden</label>
                <input
                  type="number"
                  defaultValue={a.sort}
                  onBlur={(e) => {
                    const v = parseInt(e.target.value || '0', 10);
                    if (v !== a.sort) updateSort(a, v);
                  }}
                  style={{ width: 70 }}
                />
              </div>

              <button
                className="btn"
                onClick={() => toggleEnabled(a)}
                disabled={savingId === a.id}
              >
                {savingId === a.id
                  ? 'Guardando…'
                  : a.enabled
                  ? 'Desactivar'
                  : 'Activar'}
              </button>

              <span
                className="muted"
                style={{
                  color: a.enabled ? 'var(--green-700)' : 'var(--text-muted)',
                  fontWeight: 600,
                }}
              >
                {a.enabled ? 'ACTIVA' : 'INACTIVA'}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <a className="btn btn--ghost" href="/agenda">Ir a agenda</a>
        </div>
      </div>
    </main>
  );
}
