'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

type Appointment = {
  id: string;
  title: string;
  starts_at?: string;
  ends_at?: string;
  start_at?: string;
  end_at?: string;
  status: string;
};

export default function ClienteCitasPage() {
  const router = useRouter();
  const [items, setItems] = useState<Appointment[]>([]);

  useEffect(() => {
    (async () => {
      const { data: s } = await supabase.auth.getSession();
      if (!s.session) {
        router.push('/cliente/login');
        return;
      }

      const { data: p } = await supabase.from('client_profiles').select('id').maybeSingle();
      if (!p?.id) return;

      const { data } = await supabase
        .from('appointments')
        .select('id,title,start_at,end_at,status')
        .eq('client_profile_id', p.id)
        .order('start_at', { ascending: true });

      setItems((data ?? []) as Appointment[]);
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
          <p className="font-semibold text-ink">Portal Cliente · Citas</p>
          <button onClick={logout} className="btn-secondary px-4 py-2 text-sm">Cerrar sesión</button>
        </div>
      </header>

      <section className="container section-shell">
        <article className="card-shell bg-white p-5">
          <h1 className="text-xl font-semibold text-ink">Mis citas</h1>
          <div className="mt-4 space-y-3">
            {items.map((it) => (
              <article key={it.id} className="rounded-2xl border border-border bg-surface p-4 text-sm text-ink">
                <p className="font-semibold text-ink">{it.title}</p>
                <p className="mt-1 text-muted">{new Date(it.start_at ?? it.starts_at ?? '').toLocaleString('es-CO')} → {new Date(it.end_at ?? it.ends_at ?? '').toLocaleString('es-CO')}</p>
                <p className="mt-2 text-xs text-muted">Estado: {it.status}</p>
              </article>
            ))}
            {items.length === 0 && <p className="text-sm text-muted">No tienes citas programadas aún.</p>}
          </div>
        </article>
      </section>
    </main>
  );
}
