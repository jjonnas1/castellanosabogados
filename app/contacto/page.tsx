import Link from 'next/link';

import SiteHeader from '@/app/components/SiteHeader';

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
              'Contacto directo por WhatsApp para explicar la situación.',
              'Clasificación del caso por área jurídica y urgencia.',
              'Posibilidad de seguimiento desde el portal del cliente cuando el caso avance.',
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-border bg-white p-4">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden />
                <p>{item}</p>
              </div>
            ))}
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
