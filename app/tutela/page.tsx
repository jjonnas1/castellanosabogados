import Link from 'next/link';
import SiteHeader from '@/app/components/SiteHeader';
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
