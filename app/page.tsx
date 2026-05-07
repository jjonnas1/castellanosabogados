// app/page.tsx
import type { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Castellanos Abogados | Firma jurídica en Pereira',
  description: 'Asesoría jurídica estratégica en derecho penal, tutelas, ejecución de penas, familia y laboral. Atendemos en Pereira y todo el Eje Cafetero.',
  alternates: { canonical: '/' },
};

import SiteHeader from "./components/SiteHeader";
import HeroCarrusel from "./components/HeroCarrusel";
import { buildMailtoUrl, contactConfig } from "@/lib/contactLinks";

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

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/60 text-white">
        <Image
          src="https://images.unsplash.com/photo-1521791055366-0d553872125f"
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px"
          quality={80}
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(12,17,29,0.88),rgba(17,37,68,0.82))]" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.14),transparent_36%)]" aria-hidden />
        <div className="absolute -left-24 top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden />
        <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl" aria-hidden />

        <div className="container section-shell relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-7">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200 animate-fade-in-up">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ring-1 ring-white/25">Castellanos Abogados</span>
              <span className="text-xs uppercase tracking-[0.18em] text-slate-200">Corporativo · Personas · Ejecución · Formación</span>
            </div>
            <div className="space-y-4 animate-fade-in-up delay-100">
              <h1 className="text-white max-w-3xl">Firma jurídica integral en el Eje Cafetero con criterio técnico y acompañamiento real</h1>
              <p className="max-w-2xl text-lg text-slate-100">
                Derecho penal, civil, familia, laboral, administrativo, ejecución de penas y tutelas. Diagnóstico claro, estrategia definida y presencia en cada etapa de su proceso.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 animate-fade-in-up delay-200">
              <Link href="/servicios" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">Ver servicios</Link>
              <a
                href="https://wa.me/573148309306?text=Hola%2C%20quiero%20información%20sobre%20sus%20servicios%20legales"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <HeroCarrusel />
            <a
              href={`tel:+${contactConfig.whatsapp}`}
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-white py-4 text-[16px] font-semibold text-ink shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition hover:bg-slate-50 active:scale-[0.98]"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0" aria-hidden>
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.61 21 3 14.39 3 6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {contactConfig.whatsappDisplay.replace("+57 ", "")}
            </a>
          </div>
        </div>
      </section>


      {/* ÁREAS DE PRÁCTICA */}
      <section className="section-shell bg-surface/80">
        <div className="container space-y-6">
          <div className="space-y-2">
            <p className="pill w-fit">Áreas de práctica</p>
            <h2>Servicios jurídicos con cobertura integral</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {serviceLines.map((line) => (
              <article key={line.title} className="card-shell flex h-full flex-col justify-between bg-white p-6">
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
      <section className="section-shell bg-white">
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
