'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';
import { useState } from 'react';

import SiteHeader from '@/app/components/SiteHeader';
import { supabase } from '@/lib/supabase-browser';

export default function RegistroAbogadoPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [nombre, setNombre] = useState('');
  const [tp, setTp] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({ email, password: pass });
      if (error) throw error;

      if (data.user?.id) {
        await supabase.from('profiles').upsert({
          id: data.user.id, email, full_name: nombre, role: 'lawyer'
        });

        await supabase.from('lawyers').insert({
          user_id: data.user.id,
          bar_number: tp,
          bio: null,
          specialties: ['penal'],
          verified: false,
          base_rate_cop: 70000
        });
      }
      setStatus('Registro enviado. Revisa tu correo para confirmar la cuenta.');
    } catch (e: any) {
      setStatus(e?.message || 'No pudimos registrar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header className="border-b border-border bg-gradient-to-r from-ink via-ink/92 to-accent-700 text-white">
        <div className="container section-shell space-y-4">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Registro</p>
          <h1 className="max-w-3xl text-white">Registro de abogados y consultores</h1>
          <p className="max-w-2xl text-slate-100">
            Crea tu cuenta para participar en la agenda y panel. Conservamos la trazabilidad y podrás volver al inicio o servic
ios en cualquier momento.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15">
              Volver al inicio
            </Link>
            <Link href="/login" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15">
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </header>

      <section className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-4">
          <p className="pill w-fit">Lineamientos</p>
          <h2>Perfil de registro</h2>
          <p className="max-w-2xl text-muted">
            Te pedimos la información mínima para validar tu perfil profesional. Podrás actualizarla después desde el panel. No
 mezclamos este flujo con clientes.
          </p>
          <ul className="space-y-2 text-sm text-muted">
            {["Correo corporativo recomendado.", "Confirmación obligatoria por correo.", "Puedes regresar a servicios o contacto sin perder el progreso."].map(
              (item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                  {item}
                </li>
              ),
            )}
          </ul>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/servicios" className="btn-secondary">
              Ver servicios
            </Link>
            <Link href="/contacto" className="btn-secondary">
              Contactar soporte
            </Link>
          </div>
        </div>

        <form onSubmit={handleRegister} className="card-shell bg-white p-6 shadow-soft/40">
          <p className="pill w-fit">Formulario</p>
          <h3 className="mt-2 text-ink">Datos de verificación</h3>
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink" htmlFor="nombre">
                Nombre completo
              </label>
              <input
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink" htmlFor="tp">
                Tarjeta profesional
              </label>
              <input
                id="tp"
                name="tp"
                value={tp}
                onChange={e => setTp(e.target.value)}
                className="w-full rounded-xl border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink" htmlFor="email">
                Correo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-ink" htmlFor="pass">
                Contraseña
              </label>
              <input
                id="pass"
                name="pass"
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                required
                className="w-full rounded-xl border border-border bg-subtle px-3 py-2 text-sm text-ink outline-none transition focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10"
              />
            </div>

            <button className="btn-primary w-full justify-center" type="submit" disabled={loading}>
              {loading ? 'Creando…' : 'Registrarme'}
            </button>

            {status && (
              <div className="rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-sm font-semibold text-ink">
                {status}
              </div>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
