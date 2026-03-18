'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';
import type { Session } from '@supabase/supabase-js';

type ClientProfile = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  case_reference: string | null;
  can_access_portal: boolean;
};

type ClientAppointment = {
  id: string;
  title: string;
  description: string | null;
  start_at: string;
  end_at: string;
  status: string;
};

type ClientUpdate = {
  id: string;
  title: string;
  update_text: string;
  status: string;
  visible_to_client: boolean;
  created_at: string;
};

export default function ClientPanel() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [updates, setUpdates] = useState<ClientUpdate[]>([]);
  const [appointments, setAppointments] = useState<ClientAppointment[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user) return;

    (async () => {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;
      if (token) {
        await fetch('/api/client/link-profile', {
          method: 'POST',
          headers: { authorization: `Bearer ${token}` },
        });
      }

      const { data: profileData } = await supabase
        .from('client_profiles')
        .select('*')
        .maybeSingle();

      setProfile((profileData as ClientProfile) ?? null);

      const { data: updatesData } = await supabase
        .from('client_case_updates')
        .select('*')
        .eq('visible_to_client', true)
        .order('created_at', { ascending: false });

      setUpdates((updatesData ?? []) as ClientUpdate[]);

      if (profileData?.id) {
        const { data: appointmentsData } = await supabase
          .from('appointments')
          .select('id,title,description,start_at,end_at,status')
          .eq('client_profile_id', profileData.id)
          .order('start_at', { ascending: true });

        setAppointments((appointmentsData ?? []) as ClientAppointment[]);
      } else {
        setAppointments([]);
      }

      setLoading(false);
    })();
  }, [session]);

  const lastUpdate = useMemo(() => updates[0], [updates]);

  if (!session) {
    if (typeof window !== 'undefined') window.location.href = '/cliente/login';
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 md:px-8">
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Portal cliente · CastellanosAbogados</p>
          <h1 className="text-2xl font-semibold text-slate-900">Estado de mi proceso</h1>
          <p className="text-sm text-slate-600">Cuenta: {session.user.email}</p>
        </header>

        {loading && <p className="rounded-xl border bg-white p-4 text-sm text-slate-600">Cargando información…</p>}

        {!loading && !profile && (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
            Tu acceso aún no está habilitado por el despacho. Te notificaremos cuando el perfil del caso esté disponible.
          </p>
        )}

        {!loading && profile && (
          <>
            <section className="grid gap-3 md:grid-cols-3">
              <Stat title="Cliente" value={profile.full_name} />
              <Stat title="Referencia" value={profile.case_reference || 'Sin referencia'} />
              <Stat title="Estado portal" value={profile.can_access_portal ? 'Habilitado' : 'Restringido'} />
            </section>


            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Mis citas</h2>
              <div className="space-y-2">
                {appointments.map((appointment) => (
                  <article key={appointment.id} className="rounded-lg border border-slate-200 p-3">
                    <p className="font-semibold text-slate-900">{appointment.title}</p>
                    <p className="text-sm text-slate-700">{appointment.description || 'Sin descripción'}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(appointment.start_at).toLocaleString('es-CO')} → {new Date(appointment.end_at).toLocaleString('es-CO')} · {appointment.status}
                    </p>
                  </article>
                ))}
                {appointments.length === 0 && <p className="text-sm text-slate-500">No tienes citas asignadas por ahora.</p>}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">Actualizaciones del proceso</h2>

              {lastUpdate && (
                <div className="mb-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">Última novedad: {lastUpdate.title}</p>
                  <p>{lastUpdate.update_text}</p>
                  <p className="text-xs text-slate-500">Estado: {lastUpdate.status} · {new Date(lastUpdate.created_at).toLocaleString('es-CO')}</p>
                </div>
              )}

              <div className="space-y-2">
                {updates.map((update) => (
                  <article key={update.id} className="rounded-lg border border-slate-200 p-3">
                    <p className="font-semibold text-slate-900">{update.title}</p>
                    <p className="text-sm text-slate-700">{update.update_text}</p>
                    <p className="text-xs text-slate-500">Estado: {update.status} · Fecha: {new Date(update.created_at).toLocaleString('es-CO')}</p>
                  </article>
                ))}
                {updates.length === 0 && <p className="text-sm text-slate-500">No hay actualizaciones publicadas por el momento.</p>}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{title}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </article>
  );
}
