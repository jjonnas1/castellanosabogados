'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

type Appointment = { id: string; start_at?: string; starts_at?: string };
type Update = { id: string; visible_to_client: boolean };
type ClientProfile = { full_name: string; id: string; email?: string };

export default function ClienteDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (!token) {
        router.push('/cliente/login');
        return;
      }

      await fetch('/api/client/link-profile', { method: 'POST', headers: { authorization: `Bearer ${token}` } });

      const { data: p } = await supabase.from('client_profiles').select('id,full_name,email').maybeSingle();
      setProfile((p as ClientProfile) ?? null);

      if (p?.id) {
        const { data: a } = await supabase
          .from('appointments')
          .select('id,start_at')
          .eq('client_profile_id', p.id);
        setAppointments((a ?? []) as Appointment[]);

        const { data: u } = await supabase
          .from('client_case_updates')
          .select('id,visible_to_client')
          .eq('visible_to_client', true)
          .eq('client_profile_id', p.id);
        setUpdates((u ?? []) as Update[]);
      }
    })();
  }, [router]);

  const upcoming = useMemo(() => appointments.filter((a) => {
    const dt = new Date(a.start_at ?? a.starts_at ?? '').getTime();
    return Number.isFinite(dt) && dt >= Date.now();
  }).length, [appointments]);

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Portal cliente</h1>
          <p className="text-slate-600">Bienvenido{profile?.full_name ? `, ${profile.full_name}` : ''}.</p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Próximas citas</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{upcoming}</p>
            <Link href="/cliente/citas" className="mt-3 inline-block text-sm text-slate-700 underline">Ver citas</Link>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Actualizaciones visibles</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{updates.length}</p>
            <Link href="/cliente/actualizaciones" className="mt-3 inline-block text-sm text-slate-700 underline">Ver actualizaciones</Link>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Perfil</p>
            <p className="mt-1 text-base font-semibold text-slate-900">{profile?.email ?? 'Sin email'}</p>
            <p className="text-sm text-slate-600">Acceso a información de tu caso.</p>
          </article>
        </section>
      </div>
    </main>
  );
}
