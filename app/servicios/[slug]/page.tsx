import Link from "next/link";
import { notFound } from "next/navigation";

import SiteHeader from "@/app/components/SiteHeader";
import { buildMailtoUrl, buildWhatsAppUrl } from "@/lib/contactLinks";
import { getServiceDetail, serviceDetailList } from "@/lib/serviceDetails";

const backgrounds: Record<string, string> = {
  'penal-personas': "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=75&fm=webp')",
  'ejecucion-penas': "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=75&fm=webp')",
  'responsabilidad-penal-pj': "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=75&fm=webp')",
  'capacitaciones-penal-pj': "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=75&fm=webp')",
  civil: "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1200&q=75&fm=webp')",
  familia: "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=75&fm=webp')",
  laboral: "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=75&fm=webp')",
  administrativo: "linear-gradient(140deg, rgba(12,17,29,0.9), rgba(17,37,68,0.78)), url('https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=1200&q=75&fm=webp')",
};

export async function generateStaticParams() {
  return serviceDetailList.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);

  if (!detail) {
    notFound();
  }

  const backgroundImage = backgrounds[detail.slug] ?? backgrounds["penal-personas"];

  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      <header
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/82 to-accent-700/70" aria-hidden />
        <div className="container section-shell relative space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-200">
            <Link href="/servicios" className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">
              Servicios
            </Link>
            {detail.chips.map((chip) => (
              <span key={chip} className="rounded-full bg-white/10 px-3 py-1 font-semibold ring-1 ring-white/20">{chip}</span>
            ))}
          </div>
          <h1 className="text-white max-w-3xl">{detail.headline}</h1>
          <p className="max-w-3xl text-slate-100 text-lg">{detail.summary}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildMailtoUrl({
                area: detail.title,
                source: `/servicios/${detail.slug}`,
                subject: `Solicitud de evaluación – ${detail.title}`,
                message: "Hola, deseo solicitar una evaluación estratégica.",
              })}
              data-wa-lead
              className="btn-primary bg-white text-ink shadow-hover hover:bg-slate-100"
            >
              Solicitar evaluación estratégica
            </a>
            <Link href="/servicios" className="btn-secondary border-white/50 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              Volver a servicios
            </Link>
          </div>
          <div className="grid gap-3 text-sm text-slate-100 md:grid-cols-3">
            {detail.heroStats.map((stat) => (
              <div key={stat} className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">{stat}</div>
            ))}
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
                  <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
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
                  <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card-shell bg-white p-8 shadow-soft/40">
          <p className="pill w-fit">Entregables</p>
          <h2 className="mt-3 text-ink">Lo que entregamos</h2>
          <p className="mt-2 text-muted">{detail.deliverablesIntro}</p>
          <ul className="mt-5 space-y-3 text-sm text-muted">
            {detail.deliverables.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-ink" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl({
                area: detail.title,
                source: `/servicios/${detail.slug}`,
                message: "Hola, quisiera programar una sesión.",
              })}
              className="btn-primary"
            >
              Programar sesión
            </a>
            <a
              href={buildMailtoUrl({
                area: detail.title,
                source: `/servicios/${detail.slug}`,
                subject: `Solicitud de coordinación con junta – ${detail.title}`,
                message: "Hola, necesito coordinar una sesión con junta o comité.",
              })}
              className="btn-secondary"
            >
              Coordinar con junta
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
