import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/app/components/SiteHeader';
import PublicEvaluators from '@/app/components/PublicEvaluators';

export const metadata: Metadata = {
  title: 'Herramientas Jurídicas | Castellanos Abogados',
  description: 'Calculadoras y herramientas jurídicas especializadas en derecho laboral, civil, familia y penal colombiano. Descubra sus derechos con Castellanos Abogados en Pereira.',
  alternates: { canonical: '/herramientas' },
};

const HERRAMIENTAS = [
  {
    area: 'Laboral',
    color: 'from-blue-600/20 to-blue-900/10',
    border: 'border-blue-800/40',
    badge: 'bg-blue-900/50 text-blue-300',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
      </svg>
    ),
    herramientas: [
      { nombre: 'Calculadora de Indemnización por Despido', desc: 'Calculamos cuánto le deben si fue despedido sin justa causa. Aplica Ley 789 de 2002 para contratos indefinidos y a término fijo.' },
      { nombre: 'Liquidación Laboral Completa', desc: 'Prima de servicios, cesantías, intereses a cesantías y vacaciones en un solo análisis.' },
      { nombre: 'Sanción Moratoria', desc: 'Si su empleador no pagó a tiempo, tiene derecho a un día de salario por cada día de mora.' },
    ],
    cta: '¿Lo despidieron o no le han pagado su liquidación?',
  },
  {
    area: 'Familia',
    color: 'from-rose-600/20 to-rose-900/10',
    border: 'border-rose-800/40',
    badge: 'bg-rose-900/50 text-rose-300',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    herramientas: [
      { nombre: 'Estimación de Cuota Alimentaria', desc: 'Calculamos el valor orientativo de alimentos según los ingresos del obligado y las necesidades del menor.' },
      { nombre: 'Alimentos en Mora', desc: 'Si el obligado no ha pagado, calculamos el total adeudado incluyendo intereses moratorios.' },
    ],
    cta: '¿Necesita fijar o reclamar una cuota alimentaria?',
  },
  {
    area: 'Civil e Inmobiliario',
    color: 'from-emerald-600/20 to-emerald-900/10',
    border: 'border-emerald-800/40',
    badge: 'bg-emerald-900/50 text-emerald-300',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6" />
      </svg>
    ),
    herramientas: [
      { nombre: 'Incremento Legal de Arrendamiento', desc: 'Verificamos si el canon que le cobran respeta el límite del IPC (Ley 820/2003). Un cobro mayor es ilegal.' },
      { nombre: 'Intereses Moratorios sobre Deudas', desc: 'Calculamos los intereses de mora sobre obligaciones civiles sin superar la tasa de usura.' },
      { nombre: 'Prescripción y Caducidad', desc: 'Determinamos si su derecho a demandar sigue vigente o si ya prescribió según el tipo de acción.' },
    ],
    cta: '¿Tiene un problema con su arrendamiento o una deuda?',
  },
  {
    area: 'Penal',
    color: 'from-violet-600/20 to-violet-900/10',
    border: 'border-violet-800/40',
    badge: 'bg-violet-900/50 text-violet-300',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    herramientas: [
      { nombre: 'Dosificación de la Pena', desc: 'Calculamos los cuatro cuartos de la pena según el tipo penal y los factores modificadores (art. 60-61 CP).' },
      { nombre: 'Redención de Pena', desc: 'Si su familiar trabaja o estudia en prisión, calculamos cuántos días de condena ha redimido.' },
      { nombre: 'Libertad Condicional', desc: 'Verificamos si se cumple el requisito temporal del 60% de la pena (art. 64 CP).' },
    ],
    cta: '¿Tiene un proceso penal activo o un familiar privado de la libertad?',
  },
];

const WA_NUMBER = '573148309306';
const WA_MSG = encodeURIComponent('Hola, me interesa una consulta con Castellanos Abogados.');

export default function HerramientasPage() {
  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-[#050e1f] border-b border-slate-800/60 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 bg-blue-900/30 border border-blue-800/40 rounded-full px-4 py-1 mb-4">
            Herramientas jurídicas
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Conozca sus derechos antes de actuar
          </h1>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            En Castellanos Abogados contamos con herramientas especializadas para evaluar su situación jurídica en materia laboral, civil, familia y penal.
            <span className="text-white font-medium"> El primer análisis es el más importante.</span>
          </p>
          <Link
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-green-900/30"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Agendar consulta por WhatsApp
          </Link>
        </div>
      </section>

      <PublicEvaluators />

      {/* Tarjetas por especialidad */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {HERRAMIENTAS.map((area) => (
            <div key={area.area}
              className={`bg-gradient-to-br ${area.color} border ${area.border} rounded-2xl p-6 md:p-8`}>
              {/* Header del área */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-xl ${area.badge} border ${area.border}`}>
                  {area.icon}
                </div>
                <div>
                  <span className={`text-xs font-semibold uppercase tracking-[0.15em] ${area.badge} px-2 py-0.5 rounded-full`}>
                    Área
                  </span>
                  <h2 className="text-xl font-bold text-white mt-0.5">{area.area}</h2>
                </div>
              </div>

              {/* Tarjetas de herramientas */}
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {area.herramientas.map((h) => (
                  <div key={h.nombre}
                    className="bg-[#050e1f]/60 border border-slate-800/60 rounded-xl p-4">
                    <p className="text-sm font-semibold text-white mb-1">{h.nombre}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{h.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA del área */}
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-800/40 pt-5">
                <p className="text-sm text-slate-300 font-medium">{area.cta}</p>
                <Link
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hola, necesito asesoría en ${area.area} — vi sus herramientas en la web.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
                >
                  Consultar ahora →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 px-4 bg-[#050e1f] border-t border-slate-800/60">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">¿Tiene dudas sobre su situación legal?</h2>
          <p className="text-slate-400 mb-8">
            Nuestro equipo está disponible para orientarle. La primera consulta le permitirá entender cuál es la mejor estrategia para su caso.
          </p>
          <Link
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-4 rounded-xl transition-all text-lg shadow-xl shadow-green-900/30"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Hablar con un abogado ahora
          </Link>
        </div>
      </section>
    </main>
  );
}
