import Link from 'next/link';

import SiteHeader from '@/app/components/SiteHeader';
import WaIcon from '@/app/components/WaIcon';
import { buildMailtoUrl, buildWhatsAppUrl, contactConfig } from '@/lib/contactLinks';

const serviceAreas = [
  'Derecho civil',
  'Familia',
  'Penal',
  'Ejecución de penas',
  'Laboral',
  'Administrativo',
];

export default function ContactoPage() {
  return (
    <main className="motion-public motion-inner editorial-page editorial-contact bg-canvas text-ink">
      <SiteHeader />

      <header className="text-white" style={{ backgroundImage: "linear-gradient(90deg, rgba(18,15,16,.9), rgba(18,15,16,.58)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=82&fm=webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
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

      <section className="ed-section">
        <div className="ed-wrap ed-split">
          <div className="ed-split__head">
            <p className="ed-eyebrow">Evaluación inicial</p>
            <h2 className="ed-h2">Cuéntanos qué ocurrió y revisamos la ruta jurídica más conveniente</h2>
            <p className="ed-lead">
              La información que envíes se trata con reserva profesional. Entre más claro sea el contexto,
              más rápido podremos orientar el siguiente paso.
            </p>
            <div className="ed-actions">
              <a
                href={buildWhatsAppUrl({ area: 'Contacto', source: '/contacto', message: 'Hola, quisiera agendar una evaluación jurídica.' })}
                target="_blank"
                rel="noopener noreferrer"
                className="ed-btn ed-btn--wa"
              >
                <WaIcon size={16} />
                Escribir por WhatsApp
              </a>
              <a href={`tel:+${contactConfig.whatsapp}`} className="ed-btn ed-btn--ghost">Llamar al 314 830 9306</a>
            </div>
          </div>

          <div>
            <ol className="ed-rows">
              {[
                'Contacto directo por WhatsApp para explicar la situación.',
                'Clasificación del caso por área jurídica y urgencia.',
                'Posibilidad de seguimiento desde el portal del cliente cuando el caso avance.',
              ].map((item, idx) => (
                <li key={item} className="ed-row ed-row--plain">
                  <span className="ed-row__num">{String(idx + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>

            <dl className="ed-contact" style={{ marginTop: 56 }}>
              <div>
                <dt>WhatsApp y teléfono</dt>
                <dd><a href={`tel:+${contactConfig.whatsapp}`}>{contactConfig.whatsappDisplay}</a></dd>
              </div>
              <div>
                <dt>Correo</dt>
                <dd><a href={buildMailtoUrl({ source: '/contacto' })}>{contactConfig.email}</a></dd>
              </div>
              <div>
                <dt>Horario</dt>
                <dd>Lunes a viernes, 7:00 a. m. – 4:00 p. m.</dd>
              </div>
              <div>
                <dt>Dónde atendemos</dt>
                <dd>Pereira y el Eje Cafetero<small>Atención virtual para el resto del país.</small></dd>
              </div>
            </dl>

            <div className="ed-actions">
              <Link href="/servicios" className="ed-btn ed-btn--ghost">Ver todas las áreas de práctica</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
