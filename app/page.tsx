import SiteHeader from "./components/SiteHeader";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1521791136064-7986c2920216)",
              opacity: 0.15,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white" />
        </div>

        <div className="container relative py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
              Estrategia jurídica sobria para decisiones sensibles en contratación estatal
            </h1>

            <p className="mt-6">
              Acompañamos a representantes legales y directivos en la gestión
              estratégica y preventiva del riesgo penal asociado a decisiones
              de alto impacto.
            </p>

            <div className="mt-8">
              <Link
                href="/agenda"
                className="inline-block rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition"
              >
                Solicitar evaluación estratégica
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ HACEMOS */}
      <section id="que-hacemos" className="container py-20">
        <h2 className="text-2xl font-semibold text-gray-900">
          Qué hacemos
        </h2>
        <p className="mt-4 max-w-2xl">
          No operamos como despacho penal tradicional ni como asesoría jurídica general.
          Intervenimos de forma focalizada sobre decisiones y eventos con impacto penal potencial.
        </p>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="container pb-24">
        <h2 className="text-2xl font-semibold text-gray-900">
          Servicios
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              t: "DRP-CE",
              d: "Diagnóstico inicial de riesgo penal en contratación estatal.",
            },
            {
              t: "AEC-CE",
              d: "Acompañamiento estratégico continuo para decisiones sensibles.",
            },
            {
              t: "ICP-CE",
              d: "Diseño de ruta estratégica ante escenarios de crisis.",
            },
          ].map((s) => (
            <div
              key={s.t}
              className="rounded-2xl border border-gray-200 bg-white p-6"
            >
              <h3 className="font-semibold text-gray-900">{s.t}</h3>
              <p className="mt-3 text-sm">{s.d}</p>
              <Link
                href="/agenda"
                className="mt-5 inline-block text-sm font-semibold text-gray-900"
              >
                Solicitar →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 py-10">
        <div className="container flex justify-between text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Castellanos Abogados</span>
          <span>Criterio · Control · Tranquilidad</span>
        </div>
      </footer>
    </main>
  );
}
