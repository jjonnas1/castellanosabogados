import Link from 'next/link';
import SiteHeader from '@/app/components/SiteHeader';
import EvaluadorTutela from '@/app/components/EvaluadorTutela';
import { buildMailtoUrl, buildWhatsAppUrl } from '@/lib/contactLinks';

const tutelaHeroBackground =
  "linear-gradient(120deg, rgba(13,21,40,0.92), rgba(31,54,93,0.84)), url('https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1800&q=80')";

export default function TutelaPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <SiteHeader />

      <section
        className="relative overflow-hidden border-b border-border/70 text-white"
        style={{ backgroundImage: tutelaHeroBackground, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.1),transparent_38%)]"
          aria-hidden
        />
        <div className="container section-shell relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-5">
            <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">Tutelas</p>
            <h1 className="max-w-3xl text-white">Tutelas por incumplimientos de entidades y EPS</h1>
            <p className="max-w-3xl text-lg text-slate-100">
              Acompañamos a las personas en la preparación, redacción, presentación y seguimiento de acciones de tutela
              cuando sus derechos están siendo vulnerados por entidades públicas, privadas o por EPS.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={buildMailtoUrl({
                  area: 'Tutelas',
                  source: '/tutela',
                  subject: 'Solicitud de orientación – Tutelas',
                  message: 'Hola, necesito orientación para preparar o presentar una tutela.',
                })}
                data-wa-lead
                className="btn-primary bg-white text-ink hover:bg-slate-100"
              >
                Solicitar orientación
              </a>
              <Link href="/contacto" className="btn-secondary border-white/60 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                Ir a contacto
              </Link>
            </div>
          </div>

          <article className="card-shell relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-7 text-white">
            <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink/80" aria-hidden />
            <div className="relative space-y-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-200">Enfoque estratégico</p>
              <h2 className="text-2xl text-white">Acompañamiento claro, técnico y oportuno</h2>
              <p className="text-sm text-slate-100">
                Revisamos el caso, organizamos soportes y estructuramos la tutela con criterio jurídico para una actuación
                seria y enfocada en la protección efectiva de derechos fundamentales.
              </p>
              <div className="grid gap-2 text-sm text-slate-100">
                {['Diagnóstico del caso', 'Redacción y radicación', 'Seguimiento del trámite'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container grid gap-6 lg:grid-cols-2">
          <article className="card-shell bg-white p-6">
            <h2 className="text-2xl">¿Cuándo puede ser necesaria una tutela?</h2>
            <p className="mt-3 text-muted">
              La acción de tutela puede ser necesaria cuando existe una vulneración o una amenaza real sobre derechos
              fundamentales por actuaciones u omisiones de entidades públicas, particulares o prestadores de salud.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>• Incumplimientos por parte de EPS.</li>
              <li>• Negativa o demora en servicios de salud.</li>
              <li>• Falta de entrega de medicamentos o tratamientos.</li>
              <li>• Barreras administrativas que impiden atención oportuna.</li>
              <li>• Omisiones de entidades que impactan derechos fundamentales.</li>
              <li>• Vulneraciones que requieren reacción judicial inmediata.</li>
            </ul>
          </article>

          <article className="card-shell bg-white p-6">
            <h2 className="text-2xl">¿Cómo podemos ayudar?</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>• Preparación y análisis del caso.</li>
              <li>• Redacción de la acción de tutela.</li>
              <li>• Organización de soportes y anexos.</li>
              <li>• Presentación ante los juzgados.</li>
              <li>• Seguimiento del trámite.</li>
              <li>• Apoyo frente al cumplimiento del fallo.</li>
            </ul>
          </article>

          <article className="card-shell bg-white p-6 lg:col-span-2">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl">Acompañamiento claro y responsable</h2>
                <p className="mt-3 text-muted">
                  Brindamos apoyo jurídico serio, claro y oportuno para que cada decisión se tome con información
                  suficiente, estrategia y seguimiento. Nuestro enfoque es técnico y prudente, sin promesas exageradas.
                </p>
              </div>
              <div>
                <h2 className="text-2xl">Especial atención en casos relacionados con EPS y salud</h2>
                <p className="mt-3 text-muted">
                  Muchas tutelas surgen por incumplimientos en salud. Acompañamos a las personas que necesitan reaccionar
                  jurídicamente frente a negativas, retrasos o barreras injustificadas de atención, procedimientos o
                  medicamentos.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* EVALUADOR DE TUTELA */}
      <section className="section-shell bg-surface/80" id="evaluador">
        <div className="container max-w-2xl space-y-4">
          <div className="space-y-2">
            <p className="pill w-fit">Evaluador preliminar</p>
            <h2>¿Procede una tutela en su caso?</h2>
            <p className="text-muted">
              Responda cuatro preguntas y un abogado revisa su situación en menos de 4 horas hábiles.
            </p>
          </div>
          <EvaluadorTutela />
        </div>
      </section>

      <section className="section-shell border-t border-border/70 bg-white" id="formulario-tutela">
        <div className="container max-w-2xl">
          <div className="space-y-2 mb-6">
            <p className="pill w-fit">Contacto rápido</p>
            <h2>Cuéntenos su caso</h2>
            <p className="text-muted">Llene el formulario y le respondemos a la brevedad.</p>
          </div>
          <form className="card-shell bg-surface p-6 grid gap-4" action="/api/contact" method="post">
            <input type="hidden" name="area" value="Tutelas" />
            <input type="hidden" name="source" value="/tutela#formulario-tutela" />
            <input type="hidden" name="subject" value="Consulta de tutela" />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-ink">
                Nombre
                <input name="name" type="text" placeholder="Su nombre" className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" />
              </label>
              <label className="text-sm font-semibold text-ink">
                Correo o teléfono
                <input name="email" type="text" required placeholder="Para responderle" className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" />
              </label>
            </div>
            <label className="text-sm font-semibold text-ink">
              ¿Cuál es su situación?
              <textarea name="message" rows={4} required placeholder="Describa brevemente su caso (EPS, entidad, qué derecho considera vulnerado)" className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent-50" />
            </label>
            <button type="submit" className="btn-primary justify-center">Enviar consulta</button>
          </form>
        </div>
      </section>

      <section className="section-shell border-t border-border/70 bg-surface/80" id="cta-tutelas">
        <div className="container">
          <article className="card-shell bg-white p-8 text-center">
            <p className="pill mx-auto w-fit">Contacto</p>
            <h2 className="mt-3">¿Necesita apoyo para preparar o presentar una tutela?</h2>
            <p className="mt-3 text-muted">Contáctenos y revisamos su situación.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a
                href={buildMailtoUrl({
                  area: 'Tutelas',
                  source: '/tutela#cta-tutelas',
                  subject: 'Solicitud de contacto – Tutelas',
                  message: 'Hola, quiero agendar una revisión para un caso de tutela.',
                })}
                className="btn-primary"
              >
                Contactar por correo
              </a>
              <a
                href={buildWhatsAppUrl({
                  area: 'Tutelas',
                  source: '/tutela#cta-tutelas',
                  message: 'Hola, necesito orientación para una tutela por incumplimiento de EPS o entidad.',
                })}
                className="btn-secondary"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
