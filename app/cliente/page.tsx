'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-browser';

type Appointment = { id: string; start_at?: string; starts_at?: string };
type Update = { id: string; visible_to_client: boolean };
type ClientProfile = { full_name: string; id: string; email?: string };
type ClientDocument = { id: string };

export default function ClienteDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [documents, setDocuments] = useState<ClientDocument[]>([]);

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
        const [{ data: a }, { data: u }, { data: d }] = await Promise.all([
          supabase.from('appointments').select('id,start_at').eq('client_profile_id', p.id),
          supabase
            .from('client_case_updates')
            .select('id,visible_to_client')
            .eq('visible_to_client', true)
            .eq('client_profile_id', p.id),
          supabase
            .from('client_documents')
            .select('id')
            .eq('visible_to_client', true)
            .eq('client_profile_id', p.id),
        ]);

        setAppointments((a ?? []) as Appointment[]);
        setUpdates((u ?? []) as Update[]);
        setDocuments((d ?? []) as ClientDocument[]);
      }
    })();
  }, [router]);

  const upcoming = useMemo(
    () =>
      appointments.filter((a) => {
        const dt = new Date(a.start_at ?? a.starts_at ?? '').getTime();
        return Number.isFinite(dt) && dt >= Date.now();
      }).length,
    [appointments]
  );

  async function logout() {
    await supabase.auth.signOut();
    router.push('/cliente/login');
  }

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <p className="font-semibold text-ink">Portal Cliente · Castellanos Abogados</p>
          <button onClick={logout} className="btn-secondary px-4 py-2 text-sm">Cerrar sesión</button>
        </div>
      </header>

      <section className="container section-shell space-y-6">
        <article className="card-shell bg-white p-5">
          <p className="pill w-fit">Resumen</p>
          <h1 className="mt-3 text-2xl font-semibold text-ink">Bienvenido{profile?.full_name ? `, ${profile.full_name}` : ''}</h1>
          <p className="mt-2 text-sm text-muted">Aquí puedes revisar tus citas, actualizaciones y documentos disponibles.</p>
        </article>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="card-shell bg-white p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Próximas citas</p>
            <p className="mt-1 text-2xl font-semibold text-ink">{upcoming}</p>
            <Link href="/cliente/citas" className="mt-3 inline-flex text-sm font-semibold text-ink hover:underline">Ver citas</Link>
          </article>

          <article className="card-shell bg-white p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Actualizaciones visibles</p>
            <p className="mt-1 text-2xl font-semibold text-ink">{updates.length}</p>
            <Link href="/cliente/actualizaciones" className="mt-3 inline-flex text-sm font-semibold text-ink hover:underline">Ver actualizaciones</Link>
          </article>

          <article className="card-shell bg-white p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Documentos disponibles</p>
            <p className="mt-1 text-2xl font-semibold text-ink">{documents.length}</p>
            <Link href="/cliente/documentos" className="mt-3 inline-flex text-sm font-semibold text-ink hover:underline">Ver documentos</Link>
          </article>

          <article className="card-shell bg-white p-4">
            <p className="text-xs uppercase tracking-[0.12em] text-muted">Perfil</p>
            <p className="mt-1 text-base font-semibold text-ink">{profile?.email ?? 'Sin email'}</p>
            <p className="text-sm text-muted">Acceso a información de tu caso.</p>
          </article>
        </section>
      </section>
    </main>
  );
}
