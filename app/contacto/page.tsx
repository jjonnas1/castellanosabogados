import Link from 'next/link';

import SiteHeader from '@/app/components/SiteHeader';
import WaIcon from '@/app/components/WaIcon';

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
        <div className="container section-shell max-w-2xl space-y-8">

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
              'Respuesta prioritaria por WhatsApp en minutos.',
              'Clasificación del caso por área jurídica y urgencia.',
              'Posibilidad de seguimiento desde el portal del cliente cuando el caso avance.',
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-border bg-white p-4">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden />
                <p>{item}</p>
              </div>
            ))}
          </div>

          {/* WhatsApp — acción principal */}
          <div className="rounded-2xl border border-[#25d366]/30 bg-green-50 p-7 shadow-[0_6px_28px_rgba(37,211,102,0.14)]">
            <div className="flex items-center gap-2 mb-1">
              <WaIcon size={16} />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-green-700">
                Respuesta inmediata
              </p>
            </div>
            <p className="mt-1 text-sm text-green-700/70 mb-5">
              Escríbenos y respondemos en minutos. Sin trámites ni formularios.
            </p>

            <a
              href="https://wa.me/573148309306?text=Hola%2C%20quiero%20agendar%20una%20evaluaci%C3%B3n%20jur%C3%ADdica."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa w-full justify-center py-4 text-base"
            >
              <WaIcon size={22} />
              Escribir a Castellanos Abogados
            </a>

            <div className="mt-5 grid grid-cols-2 gap-3 text-center text-sm border-t border-[#25d366]/20 pt-5">
              <div>
                <p className="font-semibold text-ink">314 830 9306</p>
                <p className="text-xs text-muted">Número de WhatsApp</p>
              </div>
              <div>
                <p className="font-semibold text-ink">Lun – Vie · 7:00–16:00</p>
                <p className="text-xs text-muted">Horario de atención</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/servicios" className="btn-secondary">
              Ver todas las áreas de práctica
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
