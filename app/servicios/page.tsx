import Link from "next/link";
import { enrichService, fetchServiceAreas } from "@/lib/serviceAreas";

export default async function ServiciosPage() {
  const { data, error } = await fetchServiceAreas();
  const services = data.map(enrichService);

  return (
    <main className="bg-gradient-to-b from-white via-slate-50 to-[#eef3f9] min-h-screen pb-16">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">Servicios</p>
            <h1 className="text-xl font-semibold text-slate-900">Áreas de práctica activas</h1>
          </div>
          <Link href="/agenda" className="rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-brand-800">
            Agendar
          </Link>
        </div>
      </header>

      <section className="container section-shell space-y-8">
        <p className="max-w-3xl text-slate-700">
          Visualiza las áreas habilitadas directamente desde Supabase. Si no podemos conectarnos mostraremos un aviso y un mensaje de disponibilidad.
        </p>

        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            No pudimos recuperar los servicios. Por favor intenta más tarde o contáctanos.
          </div>
        )}

        {services.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center text-slate-700 shadow-soft">
            <p className="text-lg font-semibold text-slate-900">Servicios no disponibles por el momento</p>
            <p className="mt-2">Agenda directamente para revisar tu necesidad y te asignaremos el área correcta.</p>
            <Link href="/agenda" className="mt-4 inline-block rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-slate-800">
              Abrir agenda
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.slug}
                className="flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-soft"
              >
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">{service.slug}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
                  <p className="text-sm text-slate-700">{service.description}</p>
                </div>
                <div className="mt-6 flex items-center gap-3 text-sm text-slate-600">
                  <Link
                    href="/agenda"
                    className="inline-flex items-center rounded-full bg-brand-700 px-4 py-2 font-semibold text-white shadow-soft transition hover:bg-brand-800"
                  >
                    Solicitar
                  </Link>
                  <Link href="/contacto" className="font-semibold text-brand-800 hover:underline">
                    Consultar alcance
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
