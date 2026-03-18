'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

type Update = { id: string; title: string; update_text?: string; body?: string; status: string; created_at: string };

export default function PortalActualizacionesPage() {
  const router = useRouter();
  const [items, setItems] = useState<Update[]>([]);

  useEffect(() => {
    (async () => {
      const { data: s } = await supabase.auth.getSession();
      if (!s.session) {
        router.push('/login');
        return;
      }

      const { data: p } = await supabase.from('client_profiles').select('id').maybeSingle();
      if (!p?.id) return;

      const { data } = await supabase
        .from('client_case_updates')
        .select('id,title,update_text,status,created_at')
        .eq('client_profile_id', p.id)
        .eq('visible_to_client', true)
        .order('created_at', { ascending: false });

      setItems((data ?? []) as Update[]);
    })();
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Actualizaciones</h1>
        <div className="mt-4 space-y-2">
          {items.map((it) => (
            <article key={it.id} className="rounded-lg border border-slate-200 p-3 text-sm">
              <p className="font-semibold">{it.title}</p>
              <p>{it.update_text ?? it.body ?? ''}</p>
              <p className="text-slate-600">Estado: {it.status} · {new Date(it.created_at).toLocaleString('es-CO')}</p>
            </article>
          ))}
          {items.length === 0 && <p className="text-sm text-slate-600">No hay actualizaciones disponibles aún.</p>}
        </div>
      </div>
    </main>
  );
}
