// app/page.tsx
import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Castellanos Abogados | Firma jurídica en Pereira',
  description: 'Asesoría jurídica estratégica en derecho penal, tutelas, ejecución de penas, familia y laboral. Atendemos en Pereira y todo el Eje Cafetero.',
  alternates: { canonical: '/' },
};

import SiteHeader from "./components/SiteHeader";
import HeroCarrusel from "./components/HeroCarrusel";
import { buildMailtoUrl } from "@/lib/contactLinks";


const serviceLines = [
  { title: "Penal Personas", description: "Estrategia penal para personas naturales con acompañamiento técnico en cada etapa.", href: "/servicios/penal-personas", area: "Penal Personas", intent: "linea-penal-personas" },
  { title: "Ejecución de Penas", description: "Gestión de beneficios, redenciones y seguimiento de términos en ejecución.", href: "/servicios/ejecucion-penas", area: "Ejecución de Penas", intent: "linea-ejecucion-penas" },
  { title: "Responsabilidad Penal PJ", description: "Prevención y defensa penal empresarial para personas jurídicas y juntas.", href: "/servicios/responsabilidad-penal-pj", area: "Responsabilidad Penal PJ", intent: "linea-rppj" },
  { title: "Capacitaciones Penal PJ", description: "Programas de formación en prevención y trazabilidad penal corporativa.", href: "/servicios/capacitaciones-penal-pj", area: "Capacitaciones Penal PJ", intent: "linea-capacitaciones" },
  { title: "Civil", description: "Conflictos patrimoniales, obligaciones y estrategia civil con enfoque probatorio.", href: "/servicios/civil", area: "Civil", intent: "linea-civil" },
  { title: "Familia", description: "Asuntos de custodia, alimentos, divorcio y medidas de protección familiar.", href: "/servicios/familia", area: "Familia", intent: "linea-familia" },
  { title: "Laboral", description: "Defensa y prevención en controversias laborales para empresas y trabajadores.", href: "/servicios/laboral", area: "Laboral", intent: "linea-laboral" },
  { title: "Administrativo", description: "Actuaciones y recursos ante entidades públicas y jurisdicción contenciosa.", href: "/servicios/administrativo", area: "Administrativo", intent: "linea-administrativo" },
];

const faq = [
  {
    q: "¿Cuánto cuesta una tutela?",
    a: "Nuestros honorarios dependen de la complejidad del caso y el tipo de proceso. Contáctanos para una evaluación inicial sin costo.",
  },
  {
    q: "¿Cuánto dura un proceso penal?",
    a: "Depende de la etapa y la complejidad. En promedio, un proceso penal en Colombia puede durar entre 1 y 4 años. El seguimiento técnico desde el inicio es determinante para los resultados.",
  },
  {
    q: "¿Qué hago si me vulneran un derecho fundamental?",
    a: "Lo primero es documentar la situación: guardar comunicaciones, respuestas de entidades y fechas. En Castellanos Abogados hacemos ese diagnóstico con usted y definimos la estrategia más adecuada.",
  },
  {
    q: "¿Puedo tener representación legal si no tengo recursos?",
    a: "En Castellanos Abogados evaluamos cada caso individualmente y ofrecemos opciones de honorarios flexibles según la situación. Contáctanos para conversar.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default async function Home() {
  return (
    <main className="bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SiteHeader />

      {/* HERO — carrusel pantalla completa */}
      <HeroCarrusel />


      {/* ÁREAS DE PRÁCTICA */}
      <section className="section-shell bg-surface">
        <div className="container space-y-6">
          <div className="space-y-2">
            <p className="pill w-fit">Áreas de práctica</p>
            <h2>Servicios jurídicos con cobertura integral</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {serviceLines.map((line) => (
              <article key={line.title} className="card-shell flex h-full flex-col justify-between p-6">
                <div className="space-y-3">
                  <h3 className="text-lg text-ink">{line.title}</h3>
                  <p className="text-sm text-muted">{line.description}</p>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                  <Link href={line.href} className="btn-secondary">Ver detalle</Link>
                  <a href={buildMailtoUrl({ area: line.area, source: "/", subject: `Solicitud de contacto – ${line.area}`, message: "Hola, quisiera solicitar orientación sobre esta línea.", intent: line.intent })} className="btn-primary">
                    Solicitar
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* PORTAL DEL CLIENTE */}
      <section
        className="section-shell text-white"
        style={{ background: "linear-gradient(120deg, rgba(12,17,29,0.95), rgba(17,37,68,0.92))" }}
      >
        <div className="container space-y-8">
          <div className="space-y-3 text-center">
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ring-white/25">
              Portal del cliente
            </span>
            <h2 className="text-white">Tu caso, siempre a la mano</h2>
            <p className="mx-auto max-w-xl text-slate-300">
              Cuando nos contratas, tienes acceso en tiempo real a tu expediente desde tu celular.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-white/15 bg-white/8 p-6 text-center space-y-3 backdrop-blur">
              <span className="text-3xl">📄</span>
              <p className="text-sm text-slate-200">Documentos de tu caso en un solo lugar</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/8 p-6 text-center space-y-3 backdrop-blur">
              <span className="text-3xl">🔔</span>
              <p className="text-sm text-slate-200">Actualizaciones del proceso sin tener que llamar</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/8 p-6 text-center space-y-3 backdrop-blur">
              <span className="text-3xl">📅</span>
              <p className="text-sm text-slate-200">Agenda y gestiona tus citas fácilmente</p>
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/cliente/login"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Conoce el portal
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-shell bg-canvas">
        <div className="container max-w-3xl space-y-6">
          <div className="space-y-2">
            <p className="pill w-fit">Preguntas frecuentes</p>
            <h2>Lo que más nos preguntan</h2>
          </div>
          <div className="divide-y divide-border">
            {faq.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                  {item.q}
                  <svg className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180" viewBox="0 0 12 8" fill="none" aria-hidden>
                    <path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
