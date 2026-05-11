'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';
import BackButton from '@/components/BackButton';

type Update = { id: string; title: string; update_text?: string; body?: string; status: string; created_at: string };

export default function ClienteActualizacionesPage() {
  const router = useRouter();
  const [items, setItems] = useState<Update[]>([]);
  const [message, setMessage] = useState('Cargando actualizaciones...');

  useEffect(() => {
    (async () => {
      const { data: s } = await supabase.auth.getSession();
      const token = s.session?.access_token;
      if (!token) {
        router.push('/cliente/login');
        return;
      }

      const response = await fetch('/api/client/updates', {
        headers: { authorization: `Bearer ${token}` },
      });
      const payload = await response.json().catch(() => ({})) as {
        ok?: boolean;
        error?: string;
        linked?: boolean;
        canAccessPortal?: boolean;
        updates?: Update[];
      };

      if (!response.ok || payload.ok === false) {
        setMessage(payload.error ?? 'No se pudieron cargar las actualizaciones.');
        return;
      }

      if (payload.linked === false) {
        setMessage('No encontramos un perfil de cliente asociado a este correo.');
        setItems([]);
        return;
      }

      if (payload.canAccessPortal === false) {
        setMessage('Tu acceso al portal aún no está habilitado.');
        setItems([]);
        return;
      }

      setItems(payload.updates ?? []);
      setMessage('No hay actualizaciones disponibles aún.');
    })();
  }, [router]);

  async function logout() {
    await supabase.auth.signOut();
    router.push('/cliente/login');
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <BackButton />
            <span className="text-border">|</span>
            <p className="font-semibold text-ink">Actualizaciones</p>
          </div>
          <button onClick={logout} className="btn-secondary px-4 py-2 text-sm">Cerrar sesión</button>
        </div>
      </header>

      <section className="container section-shell">
        <article className="card-shell bg-white p-5">
          <h1 className="text-xl font-semibold text-ink">Actualizaciones</h1>
          <div className="mt-4 space-y-3">
            {items.map((it) => (
              <article key={it.id} className="rounded-2xl border border-border bg-surface p-4 text-sm text-ink">
                <p className="font-semibold text-ink">{it.title}</p>
                <p className="mt-1 text-muted">{it.update_text ?? it.body ?? ''}</p>
                <p className="mt-2 text-xs text-muted">Estado: {it.status} · {new Date(it.created_at).toLocaleString('es-CO')}</p>
              </article>
            ))}
            {items.length === 0 && <p className="text-sm text-muted">{message}</p>}
          </div>
        </article>
      </section>
    </main>
  );
}
