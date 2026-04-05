import Link from 'next/link';
import SiteHeader from '@/app/components/SiteHeader';
import { buildMailtoUrl, buildWhatsAppUrl } from '@/lib/contactLinks';

export default function TutelaPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <SiteHeader />

      <section className="section-shell border-b border-border/70 bg-surface/70">
        <div className="container space-y-4">
          <p className="pill w-fit">Tutela</p>
          <h1>Tutelas por incumplimientos de entidades y EPS</h1>
          <p className="max-w-3xl text-muted">
            Acompañamos a las personas en la preparación, redacción, presentación y seguimiento de acciones de tutela
            cuando sus derechos están siendo vulnerados por entidades públicas, privadas o por EPS.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildMailtoUrl({
                area: 'Tutelas',
                source: '/tutela',
                subject: 'Solicitud de orientación – Tutela',
                message: 'Hola, necesito orientación para preparar o presentar una tutela.',
              })}
              className="btn-primary"
            >
              Solicitar orientación
            </a>
            <Link href="/contacto" className="btn-secondary">Ir a contacto</Link>
          </div>
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

          <article className="card-shell bg-white p-6">
            <h2 className="text-2xl">Acompañamiento claro y responsable</h2>
            <p className="mt-3 text-muted">
              Brindamos apoyo jurídico serio, claro y oportuno para que cada decisión se tome con información suficiente,
              estrategia y seguimiento. Nuestro enfoque es técnico y prudente, sin promesas exageradas.
            </p>
          </article>

          <article className="card-shell bg-white p-6">
            <h2 className="text-2xl">Especial atención en casos relacionados con EPS y salud</h2>
            <p className="mt-3 text-muted">
              Muchas tutelas surgen por incumplimientos en salud. Acompañamos a las personas que necesitan reaccionar
              jurídicamente frente a negativas, retrasos o barreras injustificadas de atención, procedimientos o medicamentos.
            </p>
          </article>
        </div>
      </section>

      <section className="section-shell border-t border-border/70 bg-surface/80" id="cta-tutela">
        <div className="container card-shell bg-white p-8 text-center">
          <h2>¿Necesita apoyo para preparar o presentar una tutela?</h2>
          <p className="mt-3 text-muted">Contáctenos y revisamos su situación.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href={buildMailtoUrl({
                area: 'Tutelas',
                source: '/tutela#cta-tutela',
                subject: 'Solicitud de contacto – Tutela',
                message: 'Hola, quiero agendar una revisión para un caso de tutela.',
              })}
              className="btn-primary"
            >
              Contactar por correo
            </a>
            <a
              href={buildWhatsAppUrl({
                area: 'Tutelas',
                source: '/tutela#cta-tutela',
                message: 'Hola, necesito orientación para una tutela por incumplimiento de EPS o entidad.',
              })}
              className="btn-secondary"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
