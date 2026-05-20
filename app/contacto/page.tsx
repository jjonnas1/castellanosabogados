import { Suspense } from 'react';
import Link from 'next/link';

import SiteHeader from '@/app/components/SiteHeader';
import ContactFormClient from './ContactFormClient';

const serviceAreas = [
  'Derecho civil',
  'Familia',
  'Penal',
  'Ejecución de penas',
  'Laboral',
  'Administrativo',
];

const DARK_GLOW = "radial-gradient(ellipse at 15% 0%, rgba(180,195,220,0.12) 0%, transparent 55%), #121622";

export default function ContactoPage() {
  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header className="text-white" style={{ background: DARK_GLOW }}>
        <div className="container section-shell space-y-5">
          <span className="pill w-fit border-white/20 bg-white/10 text-white">Contacto directo</span>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-white">Agenda una evaluación jurídica con Castellanos Abogados</h1>
            <p className="text-lg leading-relaxed text-slate-200">
              Atendemos consultas en Pereira, el Eje Cafetero y modalidad virtual en procesos civiles,
              de familia, penales, ejecución de penas, laborales y administrativos.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            {serviceAreas.map((area) => (
              <span key={area} className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/20">
                {area}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="bg-canvas">
        <div className="container section-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="pill w-fit">Evaluación inicial</p>
              <h2>Cuéntanos qué ocurrió y revisamos la ruta jurídica más conveniente</h2>
              <p className="text-muted">
                La información que envíes se trata con reserva profesional. Entre más claro sea el contexto,
                más rápido podremos orientar el siguiente paso.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-muted">
              {[
                'Respuesta prioritaria por WhatsApp o correo.',
                'Clasificación del caso por área jurídica y urgencia.',
                'Posibilidad de seguimiento desde el portal del cliente cuando el caso avance.',
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-border bg-white p-4">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden />
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Contacto rápido</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a className="btn-primary justify-center" href="https://wa.me/573148309306?text=Hola%2C%20quiero%20agendar%20una%20evaluaci%C3%B3n%20jur%C3%ADdica.">
                  WhatsApp
                </a>
                <Link className="btn-secondary justify-center" href="/servicios">
                  Ver áreas
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted">Teléfono: 314 830 9306</p>
              <div className="mt-3 rounded-xl border border-border bg-canvas px-4 py-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Horario de atención</p>
                <p className="mt-1 text-sm font-medium text-ink">Lun – Vie · 7:00 a. m. – 4:00 p. m.</p>
                <p className="mt-0.5 text-xs text-muted">Atención virtual · Sin oficina física</p>
              </div>
            </div>
          </div>

          <Suspense fallback={<ContactoFallback />}>
            <ContactFormClient />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

function ContactoFallback() {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
      <p className="pill w-fit">Formulario</p>
      <h3 className="mt-3 text-ink">Solicitud de contacto</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Cargando el formulario seguro. También puedes escribir directamente por WhatsApp para iniciar la evaluación.
      </p>
      <a className="btn-primary mt-5 w-full justify-center" href="https://wa.me/573148309306?text=Hola%2C%20quiero%20agendar%20una%20evaluaci%C3%B3n%20jur%C3%ADdica.">
        Contactar por WhatsApp
      </a>
    </div>
  );
}
