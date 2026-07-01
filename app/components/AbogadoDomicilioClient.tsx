'use client';

import Link from 'next/link';
import SiteHeader from '@/app/components/SiteHeader';
import WaIcon from '@/app/components/WaIcon';
import { buildMailtoUrl, buildWhatsAppUrl } from '@/lib/contactLinks';

const heroBackground =
  "linear-gradient(120deg, rgba(18,22,34,0.93), rgba(44,53,64,0.85)), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=75&fm=webp')";

const steps = [
  {
    n: '01',
    title: 'Cuéntanos tu caso',
    text: 'Nos escribes por WhatsApp o correo y nos indicas el tipo de asunto, la dirección y el horario que prefieres.',
  },
  {
    n: '02',
    title: 'Confirmamos la visita',
    text: 'Te confirmamos la disponibilidad, el valor del desplazamiento según tu ubicación y la fecha de la cita presencial.',
  },
  {
    n: '03',
    title: 'Tu abogado llega a tu puerta',
    text: 'Un abogado de la firma se desplaza al lugar acordado y te brinda la asesoría de forma personalizada y confidencial.',
  },
  {
    n: '04',
    title: 'Seguimiento del caso',
    text: 'Definimos la ruta jurídica y, si lo necesitas, damos continuidad al proceso desde nuestro portal del cliente.',
  },
];

const includes = [
  'Asesoría jurídica presencial en la dirección que indiques.',
  'Atención personalizada y confidencial, sin salas de espera.',
  'Revisión de documentos y firma de poderes en el sitio.',
  'Recomendación de la ruta jurídica y próximos pasos.',
  'Cobertura en las áreas de práctica de la firma.',
  'Continuidad del caso a través del portal del cliente.',
];

const audience = [
  'Personas con movilidad reducida o de la tercera edad.',
  'Familias que requieren atención jurídica en casa.',
  'Empresas y comercios que prefieren asesoría en su oficina.',
  'Personas privadas de la libertad y sus familiares.',
  'Quienes valoran la discreción y la comodidad de su espacio.',
];

const areas = [
  'Penal Personas',
  'Ejecución de Penas',
  'Familia',
  'Civil',
  'Laboral',
  'Administrativo',
  'Tutelas',
  'Responsabilidad Penal PJ',
];

export default function AbogadoDomicilioClient() {
  const wa = buildWhatsAppUrl({
    area: 'Abogados a domicilio',
    source: '/abogado-a-domicilio',
    message: 'Hola, quisiera solicitar una visita de abogado a domicilio. Mi dirección y horario preferido son:',
  });
  const mail = buildMailtoUrl({
    area: 'Abogados a domicilio',
    source: '/abogado-a-domicilio',
    subject: 'Solicitud de abogado a domicilio',
    message: 'Hola, quisiera solicitar una visita de abogado a domicilio. Mi dirección y horario preferido son:',
  });

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <SiteHeader />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage: heroBackground, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.1),transparent_38%)]"
          aria-hidden
        />
        <div className="container section-shell relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-5">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Nuevo servicio</p>
            <h1 className="max-w-3xl text-white">Abogados a domicilio</h1>
            <p className="max-w-3xl text-lg text-slate-100">
              Enviamos tu abogado a la casa, oficina o el lugar donde lo requieras. Recibes asesoría jurídica
              presencial y personalizada, sin filas ni desplazamientos, con la misma rigurosidad de la firma.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <WaIcon size={18} />
                Solicitar visita
              </a>
              <a
                href={mail}
                className="btn-secondary border-white/60 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              >
                Escribir por correo
              </a>
            </div>
          </div>

          <article className="card-shell relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-7 text-white">
            <div className="absolute inset-0 bg-gradient-to-b from-[#121622]/60 via-[#121622]/70 to-[#121622]/80" aria-hidden />
            <div className="relative space-y-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-200">Desplazamiento presencial</p>
              <p className="flex items-baseline gap-2">
                <span className="text-sm text-slate-200">Desde</span>
                <span className="text-4xl font-bold text-white">$250.000</span>
              </p>
              <p className="text-sm text-slate-100">
                El valor del desplazamiento presencial puede variar según el lugar donde requieras la atención.
                Confirmamos la tarifa exacta antes de agendar, sin sorpresas.
              </p>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wa mt-1 w-full justify-center">
                <WaIcon size={18} />
                Cotizar mi ubicación
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* ── QUÉ ES ───────────────────────────────────────────── */}
      <section className="section-shell bg-white">
        <div className="container grid gap-6 lg:grid-cols-2">
          <article className="card-shell bg-white p-6">
            <h2 className="text-2xl">Tu abogado, donde lo necesites</h2>
            <p className="mt-3 text-muted">
              Sabemos que no siempre es fácil desplazarse a una oficina: el tiempo, la salud o la distancia pueden
              complicarlo. Por eso llevamos la asesoría jurídica hasta tu puerta, con la misma seriedad, confidencialidad
              y respaldo profesional que caracterizan a Castellanos Abogados.
            </p>
          </article>
          <article className="card-shell bg-white p-6">
            <h2 className="text-2xl">Atención presencial y personalizada</h2>
            <p className="mt-3 text-muted">
              Un abogado de la firma se desplaza al lugar que indiques —tu casa, tu oficina o donde lo requieras— para
              escuchar tu caso, revisar documentos, orientarte y, si es necesario, dejar firmados los poderes para
              iniciar el proceso de inmediato.
            </p>
          </article>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ────────────────────────────────────── */}
      <section className="section-shell bg-surface/80">
        <div className="container space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="pill w-fit">Cómo funciona</p>
            <h2>Tan sencillo como cuatro pasos</h2>
            <p className="text-muted">Del primer mensaje a la visita presencial, acompañándote en cada momento.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <article key={step.n} className="card-shell bg-white p-6">
                <p className="text-3xl font-bold text-accent-500">{step.n}</p>
                <h3 className="mt-3 text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUÉ INCLUYE + PARA QUIÉN ─────────────────────────── */}
      <section className="section-shell bg-white">
        <div className="container grid gap-6 lg:grid-cols-2">
          <article className="card-shell bg-white p-6">
            <h2 className="text-2xl">Qué incluye la visita</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {includes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
          <article className="card-shell bg-white p-6">
            <h2 className="text-2xl">Pensado para ti si…</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {audience.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* ── ÁREAS + TARIFA ───────────────────────────────────── */}
      <section className="section-shell bg-surface/80">
        <div className="container grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <article className="card-shell bg-white p-6">
            <p className="pill w-fit">Áreas disponibles</p>
            <h2 className="mt-3 text-2xl">Cobertura en todas nuestras áreas</h2>
            <p className="mt-3 text-muted">
              El servicio a domicilio aplica a las áreas de práctica de la firma. Si tu caso corresponde a otra materia,
              lo evaluamos y te orientamos.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {areas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border bg-canvas px-3 py-1.5 text-[13px] font-medium text-ink"
                >
                  {area}
                </span>
              ))}
            </div>
          </article>

          <article className="card-shell flex flex-col bg-white p-6">
            <p className="pill w-fit">Tarifa</p>
            <h2 className="mt-3 text-2xl">Desplazamiento desde $250.000</h2>
            <p className="mt-3 text-muted">
              El valor del desplazamiento presencial puede variar según el lugar donde requieras la atención. Los
              honorarios profesionales del caso se acuerdan aparte, de acuerdo con la complejidad del asunto.
            </p>
            <p className="mt-3 text-sm text-muted">
              Escríbenos tu dirección y te confirmamos la tarifa exacta antes de agendar.
            </p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wa mt-5 w-full justify-center">
              <WaIcon size={18} />
              Cotizar mi visita
            </a>
          </article>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section className="section-shell border-t border-border/70 bg-white" id="cta-domicilio">
        <div className="container">
          <article className="card-shell bg-surface p-8 text-center">
            <p className="pill mx-auto w-fit">Agenda tu visita</p>
            <h2 className="mt-3">¿Quieres que un abogado vaya a tu dirección?</h2>
            <p className="mt-3 text-muted">Cuéntanos tu caso, tu ubicación y el horario que prefieres. Te confirmamos todo antes de la visita.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <WaIcon size={18} />
                Solicitar visita por WhatsApp
              </a>
              <a href={mail} className="btn-secondary">
                Escribir por correo
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
