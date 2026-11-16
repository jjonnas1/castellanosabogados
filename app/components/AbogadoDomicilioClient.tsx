'use client';

import SiteHeader from '@/app/components/SiteHeader';
import WaIcon from '@/app/components/WaIcon';
import { buildWhatsAppUrl } from '@/lib/contactLinks';

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
  return (
    <main className="motion-public motion-inner editorial-page editorial-domicilio min-h-screen bg-canvas text-ink">
      <SiteHeader />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-[#1f2c44] bg-[#0f1420] text-white"
        style={{ backgroundImage: 'linear-gradient(135deg, #0f1420 0%, #182842 100%)' }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.1),transparent_38%)]"
          aria-hidden
        />
        <div className="container section-shell relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-5">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Asesoría en el lugar que necesitas</p>
            <h1 className="max-w-3xl text-white">Abogados a domicilio</h1>
            <p className="max-w-3xl text-lg text-slate-100">
              Enviamos tu abogado a la casa, oficina o el lugar donde lo requieras. Recibes asesoría jurídica
              presencial y personalizada, sin filas ni desplazamientos, con la misma rigurosidad de la firma.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="domicilio-whatsapp inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3 text-sm font-bold text-[#0f1420] transition hover:bg-[#53e386] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25d366]">
                <WaIcon size={18} />
                Consultar disponibilidad por WhatsApp
              </a>
            </div>
          </div>

          <article className="domicilio-hero-panel relative overflow-hidden border border-white/20 bg-white/10 p-7 text-white backdrop-blur-sm sm:p-9">
            <div className="relative space-y-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#d9c391]">Desplazamiento presencial</p>
              <p className="flex items-baseline gap-2">
                <span className="text-sm text-slate-200">Desde</span>
                <span className="text-4xl font-bold text-white">$250.000</span>
              </p>
              <p className="text-sm text-slate-100">
                El valor del desplazamiento presencial puede variar según el lugar donde requieras la atención.
                Confirmamos la tarifa exacta antes de agendar, sin sorpresas.
              </p>
              <p className="border-t border-white/20 pt-4 text-xs text-slate-200">Indícanos municipio, dirección y horario preferido para confirmar la disponibilidad.</p>
            </div>
          </article>
        </div>
      </section>

      {/* ── QUÉ ES ───────────────────────────────────────────── */}
      <section className="ed-section">
        <div className="ed-wrap ed-pair">
          <article>
            <h2 className="ed-h3">Tu abogado, donde lo necesites</h2>
            <p className="ed-text">
              Sabemos que no siempre es fácil desplazarse a una oficina: el tiempo, la salud o la distancia pueden
              complicarlo. Por eso llevamos la asesoría jurídica hasta tu puerta, con la misma seriedad, confidencialidad
              y respaldo profesional que caracterizan a Castellanos Abogados.
            </p>
          </article>
          <article>
            <h2 className="ed-h3">Atención presencial y personalizada</h2>
            <p className="ed-text">
              Un abogado de la firma se desplaza al lugar que indiques —tu casa, tu oficina o donde lo requieras— para
              escuchar tu caso, revisar documentos, orientarte y, si es necesario, dejar firmados los poderes para
              iniciar el proceso de inmediato.
            </p>
          </article>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ────────────────────────────────────── */}
      <section className="ed-section ed--mist">
        <div className="ed-wrap">
          <p className="ed-eyebrow">Cómo funciona</p>
          <h2 className="ed-h2">Tan sencillo como cuatro pasos</h2>
          <p className="ed-lead">Del primer mensaje a la visita presencial, acompañándote en cada momento.</p>
          <div className="ed-cols" style={{ '--ed-cols': 4 } as React.CSSProperties}>
            {steps.map((step) => (
              <article key={step.n} className="ed-col">
                <span className="ed-col__num">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUÉ INCLUYE + PARA QUIÉN ─────────────────────────── */}
      <section className="ed-section">
        <div className="ed-wrap ed-pair">
          <article>
            <h2 className="ed-h3">Qué incluye la visita</h2>
            <ul className="ed-list">
              {includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <h2 className="ed-h3">Pensado para ti si…</h2>
            <ul className="ed-list">
              {audience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* ── ÁREAS + TARIFA ───────────────────────────────────── */}
      <section className="ed-section ed--band">
        <div className="ed-wrap ed-pair">
          <article>
            <p className="ed-eyebrow">Áreas disponibles</p>
            <h2 className="ed-h2">Cobertura en todas nuestras áreas</h2>
            <p className="ed-text">
              El servicio a domicilio aplica a las áreas de práctica de la firma. Si tu caso corresponde a otra materia,
              lo evaluamos y te orientamos.
            </p>
            <div className="ed-tags">
              {areas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
          </article>
          <article>
            <p className="ed-eyebrow">Tarifa</p>
            <h2 className="ed-h3" style={{ marginTop: 18 }}>Desplazamiento desde</h2>
            <span className="ed-price">$250.000</span>
            <p className="ed-text">
              El valor del desplazamiento presencial puede variar según el lugar donde requieras la atención. Los
              honorarios profesionales del caso se acuerdan aparte, de acuerdo con la complejidad del asunto.
            </p>
            <p className="ed-text">
              Escríbenos tu dirección y te confirmamos la tarifa exacta antes de agendar.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
