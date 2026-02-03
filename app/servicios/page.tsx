import Link from "next/link";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";
import { getServiceDetail } from "@/lib/serviceDetails";

const headerBackground =
  "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=2200&q=80')";

export default async function ServiciosPage() {
  const { data, error } = await fetchServiceAreas();

  const services = (Array.isArray(data) ? data : [])
    .map(enrichService)
    .map((service) => ({
      ...service,
      detail: getServiceDetail(service.slug),
    }));

  return (
    <main>
      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{
          backgroundImage: headerBackground,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/70 to-accent-700/60" aria-hidden />
        <div className="container section-shell relative space-y-6">
          <div className="space-y-3">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Riesgo penal empresarial</p>
            <h1 className="text-white">Servicios ejecutivos en contratación estatal</h1>
            <p className="max-w-2xl text-slate-100">
              Priorizamos el trabajo con juntas, comités y representantes legales. Mostramos únicamente las áreas
              habilitadas desde Supabase; si la conexión falla, verás un aviso y podrás coordinar directamente.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
              Solicitar evaluación estratégica
            </Link>
            <Link
              href="/"
              className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      <section className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-4">
          <p className="pill w-fit">Identidad de la firma</p>
          <h2>Asesoría estratégica en contratación estatal</h2>
          <p className="max-w-2xl text-muted">
            Proporcionamos criterio sólido, control absoluto y serenidad estratégica en cada fase de decisiones críticas
            y procesos contractuales.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Estrategia penal en contratación estatal",
              "Prevención, control y activación táctica",
              "Documentación ejecutiva y trazabilidad",
              "Coordinación con juntas y comités",
            ].map((item) => (
              <div key={item} className="card-shell bg-white px-4 py-4 text-sm font-semibold text-ink shadow-soft/30">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          className="card-shell overflow-hidden bg-gradient-to-b from-ink to-accent-700 p-0"
          style={{
            backgroundImage: headerBackground,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative h-full w-full bg-gradient-to-b from-ink/80 via-ink/78 to-accent-700/82 p-8 text-white">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Definición</p>
            <h3 className="mt-3 text-white">Delimitación del alcance</h3>
            <p className="mt-2 max-w-xl text-slate-100">
              Nos enfocamos en asesoramiento estratégico y prevención. No asumimos representación litigiosa ni operativa;
              las decisiones y su implementación recaen en el cliente.
            </p>

            <div className="mt-6 grid gap-3 text-sm text-slate-100">
              <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">No intervenimos en litigios penales.</div>
              <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">No asumimos responsabilidad decisional.</div>
              <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">No ejecutamos operativamente.</div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/agenda" className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100">
                Solicitar evaluación estratégica
              </Link>
              <Link
                href="/"
                className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-shell space-y-8">
        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            No pudimos recuperar los servicios desde Supabase. Puedes agendar y te asignamos el área correcta.
          </div>
        )}

        {services.length === 0 ? (
          <div className="card-shell bg-white px-6 py-10 text-center text-muted">
            <p className="text-lg font-semibold text-ink">Servicios no disponibles por el momento</p>
            <p className="mt-2">Agenda directamente para revisar tu necesidad y te asignaremos el área correcta.</p>
            <Link href="/agenda" className="mt-4 inline-block btn-primary">
              Abrir agenda
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.slug} className="card-shell flex h-full flex-col justify-between bg-white p-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-700">{service.slug}</p>
                  <h3 className="text-lg font-heading font-semibold text-ink">{service.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{service.description}</p>

                  {service.detail && (
                    <div className="space-y-3 text-sm text-muted">
                      <div>
                        <p className="font-semibold text-ink">Cuándo se activa</p>
                        <ul className="mt-1 list-disc space-y-1 pl-4">
                          {service.detail.activation.slice(0, 2).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-ink">Entregables</p>
                        <ul className="mt-1 list-disc space-y-1 pl-4">
                          {service.detail.deliverables.slice(0, 2).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
                  <Link
                    href="/agenda"
                    className="inline-flex items-center rounded-full bg-ink px-4 py-2 font-semibold text-white shadow-soft transition hover:-translate-y-[1px] hover:bg-accent-700"
                  >
                    Solicitar
                  </Link>
                  <Link href={`/servicios/${service.slug}`} className="font-semibold text-accent-700 transition hover:text-ink">
                    Ver detalle
                  </Link>
                  <Link href="/contacto" className="font-semibold text-muted transition hover:text-ink">
                    Coordinar alcance
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-4">
          <p className="pill w-fit">Asesoría a personas (secundaria)</p>
          <h2>Atención penal para personas naturales</h2>
          <p className="max-w-2xl text-muted">
            Gestionamos una línea independiente y discreta para casos personales. No interfiere con los servicios
            corporativos ni sustituye representación litigiosa.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Evaluación breve y confidencial",
              "Guía de actuación inmediata",
              "Documentos base de soporte",
              "Derivación a aliados para litigio",
            ].map((item) => (
              <div key={item} className="card-shell bg-white px-4 py-4 text-sm font-semibold text-ink shadow-soft/30">
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/personas" className="btn-secondary">
              Ver línea personal
            </Link>
            <Link href="/contacto" className="btn-primary">
              Contacto directo
            </Link>
          </div>
        </div>

        <div className="card-shell bg-ink p-8 text-white">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Línea separada</p>
          <h3 className="mt-3 text-white">Claridad de alcance</h3>
          <p className="mt-2 text-slate-100">
            La línea personal está pensada para orientar y documentar. Si el caso requiere defensa judicial, articulamos
            aliados externos manteniendo el control documental y la coordinación con el cliente.
          </p>
        </div>
      </section>
    </main>
  );
}
