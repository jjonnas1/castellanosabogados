// app/page.tsx
import Link from "next/link";

import SiteHeader from "./components/SiteHeader";
import HeroTipificador from "./components/HeroTipificador";
import { buildMailtoUrl, contactConfig } from "@/lib/contactLinks";

const heroBackground =
  "linear-gradient(120deg, rgba(12,17,29,0.88), rgba(17,37,68,0.82)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";
const executiveDesk =
  "linear-gradient(180deg, rgba(13,21,40,0.9), rgba(13,21,40,0.8)), url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2100&q=80')";
const skylineBackground =
  "linear-gradient(180deg, rgba(15,23,42,0.9), rgba(17,37,68,0.75)), url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2000&q=80')";

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
      <section
        className="relative overflow-hidden border-b border-border/60 text-white animate-gradient"
        style={{ backgroundImage: heroBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
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
              <a href={buildMailtoUrl({ area: "General", source: "/", subject: "Solicitud de contacto – General", message: "Hola, quisiera orientación general sobre sus servicios." })} className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                Contactar por correo
              </a>
            </div>
          </div>

          <HeroTipificador />
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

      {/* CONTACTO */}
      <section id="contacto" className="relative overflow-hidden section-shell" style={{ backgroundImage: skylineBackground, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/82 to-accent-700/70" aria-hidden />
        <div className="container relative grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start text-white">
          <div className="space-y-4">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Contacto</p>
            <h2 className="text-white">Primer punto de control</h2>
            <p className="text-slate-100">Comparte el contexto esencial y coordinamos la disponibilidad más cercana.</p>
            <p className="text-sm text-slate-100">
              <strong className="text-white">Correo:</strong>{" "}
              <a href={buildMailtoUrl({ area: "Contacto", source: "/#contacto", subject: "Solicitud de contacto", message: "Hola, necesito coordinar una revisión." })} className="underline underline-offset-4">
                {contactConfig.email}
              </a>
            </p>
          </div>
          <form className="card-shell bg-white/90 p-8 text-ink backdrop-blur" action="/api/contact" method="post">
            <div className="grid gap-4">
              <input type="hidden" name="area" value="Contacto – Home" />
              <input type="hidden" name="source" value="/#contacto" />
              <input type="hidden" name="subject" value="Solicitud de contacto (Home)" />
              <label className="text-sm font-semibold text-ink">
                Nombre
                <input name="name" type="text" placeholder="Su nombre" className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" />
              </label>
              <label className="text-sm font-semibold text-ink">
                Correo
                <input name="email" type="email" required placeholder="nombre@correo.com" className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" />
              </label>
              <label className="text-sm font-semibold text-ink">
                Motivo
                <select name="reason" className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50">
                  <option>Penal personas</option>
                  <option>Tutelas</option>
                  <option>Ejecución de penas</option>
                  <option>Penal empresarial</option>
                  <option>Civil / Familia / Laboral</option>
                  <option>Otro</option>
                </select>
              </label>
              <label className="text-sm font-semibold text-ink">
                Mensaje (opcional)
                <textarea name="message" rows={3} placeholder="Cuéntenos brevemente su situación" className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" />
              </label>
              <button type="submit" className="btn-primary justify-center">Enviar</button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-white/90 py-8 backdrop-blur">
        <div className="container flex flex-col gap-3 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-base font-semibold text-ink">Castellanos Abogados</p>
            <p>Firma · Asesoría jurídica estratégica integral</p>
          </div>
          <div className="text-right text-muted">
            <p className="font-heading font-semibold text-ink">Criterio • Control • Tranquilidad</p>
            <p>© {new Date().getFullYear()} Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
