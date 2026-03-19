import Link from "next/link";

import SiteHeader from "@/app/components/SiteHeader";
import { buildMailtoUrl } from "@/lib/contactLinks";

export default function NosotrosPage() {
  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <section className="border-b border-border bg-white">
        <div className="container section-shell space-y-4">
          <p className="pill w-fit">Nosotros</p>
          <h1>Sobre Castellanos Abogados</h1>
          <p className="max-w-3xl text-lg text-muted">
            Dirección jurídica con criterio, formación interdisciplinaria y atención directa
          </p>
          <p className="max-w-3xl text-muted">
            Castellanos Abogados es un despacho orientado por Jonatan Castellanos, enfocado en brindar asesoría jurídica
            estratégica a personas y empresas, con atención directa, análisis serio y acompañamiento en cada etapa del caso.
          </p>
        </div>
      </section>

      <section className="section-shell bg-surface/70">
        <div className="container grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <article className="card-shell bg-white p-8">
            <p className="pill w-fit">Perfil profesional</p>
            <h2 className="mt-3">Jonatan Castellanos</h2>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">CEO y fundador</p>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
              <p>
                Jonatan Castellanos es abogado de la Universidad Libre de Pereira y licenciado en Lenguas Modernas de la
                Universidad de Caldas. Su formación combina el análisis jurídico con una base sólida en comunicación y
                comprensión del lenguaje.
              </p>
              <p>
                Ha sido docente y ha ejercido como funcionario judicial, lo que le permite entender el derecho no solo desde
                la teoría, sino desde su aplicación real dentro del sistema.
              </p>
              <p>
                Habla inglés, francés e italiano, lo que amplía su capacidad de comunicación y le permite desenvolverse en
                distintos contextos profesionales.
              </p>
              <p>
                El ejercicio de su profesión se fundamenta en el respeto, la honestidad y la confianza, como pilares de la
                relación con cada cliente.
              </p>
            </div>
          </article>

          <div className="rounded-2xl border border-border bg-white p-5 shadow-soft/30">
            <img
              src="/images/jonatan-castellanos.jpg"
              alt="Jonatan Castellanos"
              className="aspect-[4/5] w-full rounded-xl object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container space-y-8">
          <article className="space-y-3">
            <p className="pill w-fit">Atención directa</p>
            <h2>Una práctica jurídica con atención directa</h2>
            <p className="max-w-4xl text-muted">
              El despacho se construye sobre un principio claro: cada cliente debe recibir orientación directamente del
              abogado. No hay intermediarios.
            </p>
            <p className="max-w-4xl text-muted">
              Cada caso se analiza con rigor, se define una estrategia concreta y se acompaña con seguimiento real,
              priorizando soluciones ejecutables y no únicamente conceptos teóricos.
            </p>
          </article>

          <article className="space-y-3">
            <p className="pill w-fit">Formación y enfoque</p>
            <h2>Formación jurídica y visión interdisciplinaria</h2>
            <p className="max-w-4xl text-muted">
              La práctica profesional se fundamenta en una formación jurídica sólida, complementada por una visión
              interdisciplinaria que permite abordar cada caso con mayor profundidad y claridad.
            </p>
            <p className="max-w-4xl text-muted">
              La formación en derecho se integra con el estudio de las lenguas modernas, lo que fortalece la capacidad de
              análisis, interpretación y comunicación en distintos contextos. A ello se suma la experiencia en docencia y el
              ejercicio como funcionario judicial, lo que permite comprender el funcionamiento real del sistema jurídico más
              allá de la teoría.
            </p>
            <p className="max-w-4xl text-muted">
              Este enfoque permite ofrecer una asesoría jurídica que no solo se limita al conocimiento técnico, sino que se
              orienta a la comprensión integral de cada situación, con una comunicación clara y una estrategia adecuada para
              cada cliente.
            </p>
          </article>

          <article className="space-y-3">
            <p className="pill w-fit">Principios</p>
            <h2>Principios que orientan el servicio</h2>
            <p className="max-w-4xl text-muted">
              El ejercicio jurídico se desarrolla bajo principios claros: respeto por cada cliente, honestidad en el análisis
              de las posibilidades reales del caso y construcción de confianza a través de una comunicación directa,
              transparente y sin intermediarios.
            </p>
          </article>

          <article className="space-y-4 rounded-2xl border border-border bg-surface/80 p-6">
            <h2>Confianza, criterio y claridad</h2>
            <p className="max-w-4xl text-muted">
              Castellanos Abogados ofrece una práctica jurídica basada en análisis serio, comunicación comprensible y relación
              directa con el cliente, orientada a tomar decisiones seguras y bien fundamentadas.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={buildMailtoUrl({
                  area: "Nosotros",
                  source: "/nosotros",
                  subject: "Solicitud de evaluación – Nosotros",
                  message: "Hola, quisiera solicitar una evaluación.",
                })}
                className="btn-primary"
              >
                Solicitar evaluación
              </a>
              <Link href="/contacto" className="btn-secondary">
                Contacto
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
