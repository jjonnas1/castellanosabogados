import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import { serviceDetailList } from "@/lib/serviceDetails";
import { buildMailtoUrl } from "@/lib/contactLinks";

export const metadata = {
  title: "Metodología | Castellanos Abogados",
  description:
    "Conoce cómo trabajamos: diagnóstico, plan de actuación y seguimiento continuo aplicado a cada área de práctica jurídica.",
};

export default function MetodologiaPage() {
  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      {/* HERO */}
      <section className="section-shell border-b border-border/60 bg-ink text-white">
        <div className="container max-w-3xl space-y-4">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Metodología</p>
          <h1 className="text-white">Cómo trabajamos</h1>
          <p className="text-lg text-slate-200">
            Cada caso se aborda con diagnóstico técnico, plan de actuación claro y seguimiento continuo.
            Definimos alcance, responsables y documentación para que cada decisión quede trazada con rigor.
          </p>
        </div>
      </section>

      {/* PROCESO GENERAL — línea de tiempo */}
      <section className="section-shell bg-white">
        <div className="container space-y-8">
          <div className="space-y-2">
            <p className="pill w-fit">Proceso general</p>
            <h2>Cómo avanza su caso</h2>
          </div>

          <div className="max-w-2xl">
            <ol className="relative border-l-2 border-accent pl-8 space-y-10">
              {[
                {
                  when: "Día 1",
                  title: "Diagnóstico inicial",
                  desc: "Evaluamos el contexto, los documentos disponibles y los riesgos inmediatos para definir la situación jurídica con precisión.",
                },
                {
                  when: "Día 2–5",
                  title: "Plan de actuación",
                  desc: "Construimos la ruta de trabajo con hitos, responsables y documentación requerida. Cada caso tiene su propio mapa de acción.",
                },
                {
                  when: "Continuo",
                  title: "Seguimiento continuo",
                  desc: "Mantenemos trazabilidad de actuaciones, términos y resultados. El cliente conoce el estado de su proceso en todo momento.",
                },
                {
                  when: "Al cierre",
                  title: "Informe final",
                  desc: "Consolidamos resultados, actuaciones y próximos pasos en un informe de cierre. El expediente queda documentado para referencia futura.",
                },
              ].map((hito) => (
                <li key={hito.when} className="relative">
                  {/* Nodo de la línea */}
                  <span
                    className="absolute -left-[41px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-accent"
                    aria-hidden
                  />
                  <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-accent mb-0.5">
                    {hito.when}
                  </span>
                  <h3 className="text-base font-semibold text-ink">{hito.title}</h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{hito.desc}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 space-y-3 max-w-2xl">
            <h3 className="text-base font-semibold text-ink">Modalidad de atención</h3>
            <ul className="space-y-2 text-sm text-muted">
              {[
                "Sesiones por videollamada o en sitio según disponibilidad.",
                "Reportes, minutas y reglas de actuación documentadas.",
                "Coordinación con aliados técnicos cuando el caso lo requiere.",
                "Nuestro rol es estratégico, preventivo y documental.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="section-shell bg-surface/80">
        <div className="container space-y-10">
          <div className="space-y-2">
            <p className="pill w-fit">Por área de práctica</p>
            <h2>Metodología aplicada a cada servicio</h2>
            <p className="text-muted max-w-2xl">
              Cada área de práctica tiene criterios de activación, audiencias y entregables específicos.
            </p>
          </div>

          <div className="space-y-8">
            {serviceDetailList.map((svc) => (
              <article key={svc.slug} className="card-shell bg-white p-6 md:p-8 space-y-6">
                <div className="space-y-1">
                  <Link
                    href={`/servicios/${svc.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted hover:text-ink transition-colors"
                  >
                    {svc.title}
                    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3" aria-hidden>
                      <path d="M2.5 9.5 9.5 2.5M5 2.5h4.5v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <h3 className="text-xl text-ink">{svc.headline}</h3>
                  <p className="text-sm text-muted leading-relaxed">{svc.summary}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">Cuándo activar</p>
                    <ul className="space-y-1.5">
                      {svc.activation.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">A quién va dirigido</p>
                    <ul className="space-y-1.5">
                      {svc.audience.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">Entregables</p>
                    <ul className="space-y-1.5">
                      {svc.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={buildMailtoUrl({
                      area: svc.title,
                      source: "/metodologia",
                      subject: `Solicitud — ${svc.title}`,
                      message: `Hola, me interesa conocer más sobre el servicio de ${svc.title}.`,
                    })}
                    className="btn-secondary text-sm"
                  >
                    Solicitar información
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell bg-ink text-white">
        <div className="container max-w-2xl space-y-5 text-center">
          <h2 className="text-white">¿Listo para comenzar?</h2>
          <p className="text-slate-200">
            Cuéntanos tu caso y definimos juntos la ruta más adecuada para tu situación.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={buildMailtoUrl({
                area: "Metodología",
                source: "/metodologia",
                subject: "Solicitud de consulta inicial",
                message: "Hola, quisiera agendar una consulta inicial.",
              })}
              className="btn-primary bg-white text-ink hover:bg-slate-100"
            >
              Solicitar consulta
            </a>
            <Link href="/servicios" className="btn-secondary border-white/50 text-white hover:bg-white/10">
              Ver todos los servicios
            </Link>
          </div>
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
