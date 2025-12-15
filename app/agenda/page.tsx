'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';

import SiteHeader from '@/app/components/SiteHeader';
import { supabase } from '@/lib/supabase-browser';

type Area = { slug: string; name: string; };

export default function AgendaPage() {
  const [session, setSession] = useState<Session|null>(null);
  const [areas, setAreas] = useState<Area[]>([]);
  const [area, setArea] = useState('');
  const [slot, setSlot] = useState('Hoy 6:00 pm');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string>('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub?.subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('service_areas')
        .select('slug,name')
        .eq('enabled', true)
        .order('sort', { ascending: true });
      if (!error && data) {
        setAreas(data);
        if (data[0]) setArea(data[0].slug);
      }
    })();
  }, []);

  const email = session?.user?.email ?? '';

  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); setMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: 'Solicitud de agenda',
          email: email || 'sin-correo',
          message: `Nueva solicitud:
- Área: ${area}
- Horario preferido: ${slot}
- Correo: ${email || 'sin-correo'}
- Nota: ${note || '(sin nota)'}`,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'No se pudo enviar');
      setMsg('✅ Recibimos tu solicitud. Te escribiremos al correo.');
      setNote('');
    } catch (e:any) {
      setMsg('❌ ' + (e?.message ?? 'Error enviando la solicitud'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header className="border-b border-border bg-gradient-to-r from-ink via-ink/92 to-accent-700 text-white">
        <div className="container section-shell space-y-4">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Agenda</p>
          <h1 className="max-w-3xl text-white">Coordina tu asesoría con trazabilidad</h1>
          <p className="max-w-2xl text-slate-100">
            Mantenemos la agenda alineada a las áreas activas y a los flujos protegidos. Siempre puedes regresar al panel o al
            inicio.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15">
              Volver al inicio
            </Link>
            <Link href="/servicios" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15">
              Ver servicios
            </Link>
          </div>
        </div>
      </header>

      {!session ? (
        <section className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-4">
            <p className="pill w-fit">Paso previo</p>
            <h2>Inicia sesión para continuar</h2>
            <p className="max-w-2xl text-muted">
              Necesitamos tu sesión activa para asociar la solicitud a tu perfil. Puedes volver al Home, al panel o a contacto
              cuando quieras.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/cliente/acceso" className="btn-primary">
                Iniciar sesión / Registrarme
              </Link>
              <Link href="/contacto" className="btn-secondary">
                Contacto directo
              </Link>
            </div>
          </div>

          <div className="card-shell bg-white p-6 shadow-soft/40">
            <h3 className="text-ink">Acceso requerido</h3>
            <p className="mt-2 text-muted text-sm">
              Activa tu sesión con Google o credenciales para que podamos reservar el espacio correcto en agenda.
            </p>
            <div className="mt-4 grid gap-3 text-sm text-muted">
              <div className="rounded-xl bg-subtle px-4 py-3 ring-1 ring-border/60">Protegemos tu información.</div>
              <div className="rounded-xl bg-subtle px-4 py-3 ring-1 ring-border/60">Solo usamos áreas activas desde Supabase.</div>
              <div className="rounded-xl bg-subtle px-4 py-3 ring-1 ring-border/60">Puedes volver al inicio sin perder el flujo.</div>
            </div>
          </div>
        </section>
      ) : (
        <section className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-4">
            <p className="pill w-fit">Preferencias</p>
            <h2>Define área y horario preferido</h2>
            <p className="max-w-2xl text-muted">
              Mostramos únicamente áreas habilitadas desde Supabase. Ajusta el horario sugerido y deja una nota breve para el eq
uipo.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/cliente/panel" className="btn-secondary">
                Ir a mi panel
              </Link>
              <Link href="/contacto" className="btn-secondary">
                Contactar soporte
              </Link>
            </div>
            {msg && <p className="text-sm text-muted">{msg}</p>}
          </div>

          <form onSubmit={send} className="card-shell bg-white p-6 shadow-soft/40">
            <p className="pill w-fit">Solicitud</p>
            <h3 className="mt-2 text-ink">Agenda prioritaria</h3>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink" htmlFor="email">
                  Tu correo
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  readOnly
                  className="w-full rounded-xl border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-ink" htmlFor="area">
                    Tema / Área
                  </label>
                  <select
                    id="area"
                    value={area}
                    onChange={e=>setArea(e.target.value)}
                    className="w-full rounded-xl border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10"
                  >
                    {areas.map(a=>(
                      <option key={a.slug} value={a.slug}>{a.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-ink" htmlFor="slot">
                    Horario preferido
                  </label>
                  <select
                    id="slot"
                    value={slot}
                    onChange={e=>setSlot(e.target.value)}
                    className="w-full rounded-xl border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10"
                  >
                    <option>Hoy 6:00 pm</option>
                    <option>Mañana 8:30 am</option>
                    <option>Mañana 11:00 am</option>
                    <option>Miércoles 5:30 pm</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-ink" htmlFor="nota">
                  Cuéntanos tu caso (breve)
                </label>
                <textarea
                  id="nota"
                  placeholder="Describe tu caso en pocas líneas…"
                  value={note}
                  onChange={(e)=>setNote(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-border bg-subtle px-3 py-3 text-sm text-ink outline-none transition focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="btn-primary" type="submit" disabled={loading}>
                  {loading ? 'Enviando…' : 'Enviar solicitud'}
                </button>
                <Link href="/cliente/panel" className="btn-secondary">
                  Ir a mi panel
                </Link>
              </div>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}
