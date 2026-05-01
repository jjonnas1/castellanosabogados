import type { Metadata } from 'next';
import SiteHeader from "@/app/components/SiteHeader";

export const metadata: Metadata = {
  title: 'Nosotros | Castellanos Abogados',
  description: 'Conoce al equipo de Castellanos Abogados: formación, experiencia y enfoque jurídico estratégico en Pereira y el Eje Cafetero.',
  alternates: { canonical: '/nosotros' },
};

export default function NosotrosPage() {
  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <section className="section-shell bg-surface/70">
        <div className="container space-y-6">

          {/* Formación académica */}
          <div className="card-shell bg-white p-6">
            <p className="pill w-fit mb-3">Formación académica</p>
            <div className="space-y-1">
              <p className="text-base font-semibold text-ink">Abogado — Universidad Libre de Pereira</p>
              <p className="text-base font-semibold text-ink">Licenciado en Lenguas Modernas — Universidad de Caldas</p>
            </div>
          </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <article className="card-shell bg-white p-8">
            <h1 className="text-2xl font-semibold text-ink">Jonatan Castellanos</h1>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-muted">CEO y fundador</p>

            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
              <p>
                Jonatan Castellanos es abogado de la Universidad Libre de Pereira y licenciado en Lenguas Modernas de la
                Universidad de Caldas. Su formación combina el análisis jurídico con una base sólida en comunicación y
                comprensión del lenguaje, lo que le permite abordar cada caso con claridad y criterio.
              </p>
              <p>
                A lo largo de su trayectoria ha sido docente y ha ejercido como funcionario judicial, experiencia que le ha
                permitido comprender el derecho no solo desde la teoría, sino desde su aplicación real dentro del sistema,
                aportando una visión práctica a cada asunto.
              </p>
              <p>
                Habla inglés, francés e italiano, lo que amplía su capacidad de comunicación y le permite desenvolverse en
                distintos contextos profesionales, facilitando la relación con clientes y el análisis de situaciones
                complejas.
              </p>
              <p>
                El ejercicio de su profesión se fundamenta en el respeto, la honestidad y la confianza, entendidos como
                pilares esenciales en la relación con cada cliente y en la construcción de soluciones jurídicas serias y
                responsables.
              </p>
            </div>
          </article>

          <div className="rounded-2xl border border-border bg-white p-4 shadow-soft/30">
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <img
                src="/IMG_4096.JPG"
                alt="Jonatan Castellanos"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        </div>
      </section>
    </main>
  );
}
