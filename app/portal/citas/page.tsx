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

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h1 className="text-xl font-semibold text-slate-900">Mis citas</h1>
        <div className="mt-4 space-y-2">
          {items.map((it) => (
            <article key={it.id} className="rounded-lg border border-slate-200 p-3 text-sm">
              <p className="font-semibold">{it.title}</p>
              <p>{new Date(it.start_at ?? it.starts_at ?? '').toLocaleString('es-CO')} → {new Date(it.end_at ?? it.ends_at ?? '').toLocaleString('es-CO')}</p>
              <p className="text-slate-600">Estado: {it.status}</p>
            </article>
          ))}
          {items.length === 0 && <p className="text-sm text-slate-600">No tienes citas programadas aún.</p>}
        </div>
      </div>
    </main>
  );
}
