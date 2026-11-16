import Link from "next/link";
import type { Metadata } from "next";

import SiteHeader from "@/app/components/SiteHeader";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/lib/contactLinks";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";

export const metadata: Metadata = {
  title: 'Derecho penal empresarial | Castellanos Abogados',
  description:
    'Asesoría en derecho penal empresarial en Pereira y el Eje Cafetero: prevención de riesgos penales, defensa de empresas y representantes legales, y acompañamiento estratégico.',
  alternates: { canonical: '/penal-empresarial' },
  openGraph: {
    type: 'website',
    url: 'https://jonatancastellanosabogado.com/penal-empresarial',
    title: 'Derecho penal empresarial | Castellanos Abogados',
    description:
      'Prevención de riesgos penales, defensa de empresas y representantes legales, y acompañamiento estratégico.',
    images: [{ url: '/share/penal-empresarial.jpg', width: 1200, height: 630, alt: 'Castellanos Abogados — Penal empresarial' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Derecho penal empresarial | Castellanos Abogados',
    description:
      'Prevención de riesgos penales y defensa de empresas en Pereira y el Eje Cafetero.',
    images: ['/share/penal-empresarial.jpg'],
  },
};

const heroBackground =
  "linear-gradient(120deg, rgba(12,17,29,0.9), rgba(17,37,68,0.82)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1200&q=75&fm=webp')";

export default async function PenalEmpresarialPage() {
  const { data: services } = await fetchServiceAreas();
  const serviceList = services.map(enrichService);

  return (
    <main className="motion-public motion-inner editorial-page editorial-business bg-canvas text-ink">
      <SiteHeader />

      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage: heroBackground, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.14),transparent_36%)]"
          aria-hidden
        />
        <div className="container section-shell relative space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-200">
            <span className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">Penal empresarial</span>
            <span className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">Contratación estatal</span>
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-white">Control penal para decisiones corporativas en contratación estatal</h1>
            <p className="max-w-3xl text-lg text-slate-100">
              Acompañamiento estratégico, documentación lista para junta y respuesta estratégica cuando el riesgo penal se cruza con decisiones
              urgentes. Nos alineamos con comités, órganos de control y cumplimiento interno.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={buildMailtoUrl({
                area: "Penal empresarial",
                source: "/penal-empresarial",
                subject: "Solicitud de evaluación – Penal empresarial",
                message: "Hola, deseo solicitar una evaluación estratégica.",
              })}
              data-wa-lead
              className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100"
            >
              Solicitar evaluación estratégica
            </a>
            <Link href="/metodologia" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              Ver metodología
            </Link>
          </div>
          <div className="grid gap-4 text-sm text-slate-100 sm:grid-cols-3">
            {["Alerta temprana y priorización", "Documentación especializada y trazable", "Respuesta estratégica con responsables y comités"].map(
              (item) => (
              <div key={item} className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3">
                {item}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Qué hacemos */}
      <section className="ed-section">
        <div className="ed-wrap ed-split">
          <div className="ed-split__head">
            <p className="ed-eyebrow">Qué hacemos</p>
            <h2 className="ed-h2">Intervenciones que evitan improvisación</h2>
            <p className="ed-lead">
              Definimos ritmo, responsables, soportes y alcance definido antes, durante y después de cada decisión sensible. No asumimos litigio, sí
              aseguramos análisis especializado, trazabilidad y protocolos accionables.
            </p>
          </div>
          <div>
            <ol className="ed-rows">
              {["Diseño de rutas de prevención", "Mapeo de riesgo penal", "Protocolos activables", "Coordinación con control interno"].map((item, idx) => (
                <li key={item} className="ed-row">
                  <span className="ed-row__num">{String(idx + 1).padStart(2, "0")}</span>
                  <h3>{item}</h3>
                </li>
              ))}
            </ol>
            <div style={{ marginTop: 44 }}>
              <p className="ed-service__label">Modelo · Diagnóstico, protocolos y activación</p>
              <h3 style={{ marginTop: 12, fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 400, lineHeight: 1.2 }}>
                Documento de acompañamiento estratégico
              </h3>
              <p className="ed-lead" style={{ maxWidth: "60ch" }}>
                Un solo documento vivo que alinea comités, define alcance definido y activa protocolos. Incluye minutas, escenarios, mensajes clave y
                responsables. Mantiene un rastro claro para auditoría y órganos de control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portafolio */}
      <section className="ed-section ed--mist">
        <div className="ed-wrap ed-split">
          <div className="ed-split__head">
            <p className="ed-eyebrow">Servicios activos</p>
            <h2 className="ed-h2">Portafolio penal corporativo</h2>
            <p className="ed-lead">
              Iniciamos por DRP-CE y escalamos a AEC-CE e ICP-CE según la madurez y la presión del caso. Todos los servicios mantienen
              límite: no litigio, sí control y trazabilidad.
            </p>
            <div className="ed-actions">
              <Link href="/servicios" className="ed-btn ed-btn--ghost">Ver todos los servicios</Link>
            </div>
          </div>
          <ul className="ed-index">
            {(serviceList.length > 0
              ? serviceList.map((service) => ({ slug: service.slug, title: service.name ?? service.title, sub: service.description }))
              : [
                  { slug: "responsabilidad-penal-pj", title: "Riesgo penal empresarial", sub: "Prevención y defensa frente a la responsabilidad penal de personas jurídicas." },
                  { slug: "capacitaciones-penal-pj", title: "Capacitaciones empresariales", sub: "Formación para juntas directivas y equipos en prevención de riesgo penal corporativo." },
                ]
            ).map((service) => (
              <li key={service.slug}>
                <Link href={`/servicios/${service.slug}`}>
                  <span className="ed-index__title">{service.title}</span>
                  <span className="ed-index__sub">{service.sub}</span>
                  <span className="ed-index__arrow" aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Metodología */}
      <section className="ed-section">
        <div className="ed-wrap">
          <p className="ed-eyebrow">Cómo actuamos</p>
          <h2 className="ed-h2">Metodología breve y trazable</h2>
          <p className="ed-lead" style={{ maxWidth: "62ch" }}>
            Etapas cortas con documentos especializados para juntas y órganos de control. Cada fase puede activarse de forma independiente y
            mantiene registro especializado.
          </p>
          <div className="ed-cols" style={{ "--ed-cols": 4 } as React.CSSProperties}>
            {[{ title: "Evaluación", body: "Contexto, hipótesis de riesgo y responsables." }, { title: "Mapa de riesgo", body: "Matrices, dependencias y rutas de mitigación." }, { title: "Acompañamiento", body: "Sesiones de análisis con documentos listos." }, { title: "Respuesta estratégica", body: "Protocolos, mensajes y coordinación especializada." }].map(
              (item, idx) => (
                <article key={item.title} className="ed-col">
                  <span className="ed-col__num">{String(idx + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Límites y cierre */}
      <section className="ed-section ed--band">
        <div className="ed-wrap">
          <div className="ed-split">
            <div className="ed-split__head">
              <p className="ed-eyebrow">Límites y alcance</p>
              <h2 className="ed-h2">Sin litigio, con documentación sólida</h2>
            </div>
            <ul className="ed-notes">
              {["No asumimos representación litigiosa.", "No reemplazamos equipos jurídicos internos.", "Actuamos en coordinación con compliance y auditoría.", "Si se requiere defensa, articulamos aliados manteniendo trazabilidad."].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="ed-cta">
            <div>
              <h3>Empecemos por DRP-CE y escale según el riesgo</h3>
              <p>Definimos el primer control en 48-72 horas y articulamos los pasos siguientes con tus responsables clave.</p>
            </div>
            <div className="ed-actions">
              <a
                href={buildMailtoUrl({
                  area: "Penal empresarial",
                  source: "/penal-empresarial",
                  subject: "Solicitud de evaluación – Penal empresarial",
                  message: "Hola, deseo solicitar una evaluación estratégica.",
                })}
                data-wa-lead
                className="ed-btn"
              >
                Solicitar evaluación
              </a>
              <a
                href={buildWhatsAppUrl({
                  area: "Penal empresarial",
                  source: "/penal-empresarial",
                  message: "Hola, quisiera agendar una evaluación.",
                })}
                className="ed-btn ed-btn--wa"
              >
                Agendar por WhatsApp
              </a>
              <a
                href={buildMailtoUrl({
                  area: "Penal empresarial",
                  source: "/penal-empresarial",
                  subject: "Solicitud de coordinación con junta – Penal empresarial",
                  message: "Hola, necesito coordinar una sesión con junta o comité.",
                })}
                className="ed-btn ed-btn--ghost"
              >
                Coordinar con junta
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
