import Link from "next/link";
import { notFound } from "next/navigation";

import SiteHeader from "@/app/components/SiteHeader";
import { getServiceDetail, serviceDetailList } from "@/lib/serviceDetails";

export async function generateStaticParams() {
  return serviceDetailList.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);

  if (!detail) {
    notFound();
  }

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header className="border-b border-border bg-surface">
        <div className="container section-shell space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted">
            <Link href="/servicios" className="rounded-[14px] border border-border px-3 py-1 font-semibold">
              Servicios
            </Link>
            <span className="rounded-[14px] border border-border px-3 py-1 font-semibold">Riesgo penal empresarial</span>
            <span className="rounded-[14px] border border-border px-3 py-1 font-semibold">{detail.slug}</span>
          </div>
          <h1 className="max-w-3xl">{detail.headline}</h1>
          <p className="max-w-3xl text-lg text-muted">{detail.summary}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary">
              Solicitar evaluación estratégica
            </Link>
            <Link href="/servicios" className="btn-secondary">
              Volver a servicios
            </Link>
          </div>
          <div className="grid gap-3 text-sm text-muted md:grid-cols-3">
            <div className="rounded-[14px] border border-border bg-white px-4 py-3">No asumimos litigio penal.</div>
            <div className="rounded-[14px] border border-border bg-white px-4 py-3">Coordinamos con juntas y comités.</div>
            <div className="rounded-[14px] border border-border bg-white px-4 py-3">Documentación ejecutiva y trazable.</div>
          </div>
        </div>
      </header>

      <section className="container section-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-6">
          <div className="card-shell bg-white p-6">
            <p className="pill w-fit">Cuándo se activa</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {detail.activation.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-shell bg-white p-6">
            <p className="pill w-fit">Para quién</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {detail.audience.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card-shell bg-white p-8 shadow-soft/40">
          <p className="pill w-fit">Entregables</p>
          <h2 className="mt-3 text-ink">Lo que entregamos</h2>
          <p className="mt-2 text-muted">
            Trabajamos con documentación ejecutiva, protocolos activables y coordinación con los responsables clave. No intervenimos en litigio penal, pero articulamos aliados cuando es necesario.
          </p>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            {detail.deliverables.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-[14px] bg-ink" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/agenda" className="btn-primary">
              Solicitar evaluación estratégica
            </Link>
            <Link href="/contacto" className="btn-secondary">
              Coordinar con junta
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted">Si requieres litigio, te conectamos con aliados especializados manteniendo la trazabilidad.</p>
        </div>
      </section>
    </main>
  );
}
