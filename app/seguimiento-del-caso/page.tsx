import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/app/components/SiteHeader';
import WhatsAppContactCard from '@/app/components/WhatsAppContactCard';

export const metadata: Metadata = {
  title: 'Seguimiento de su caso | Castellanos Abogados',
  description: 'Conozca cómo acompañamos su proceso: comunicación con el abogado, novedades, documentos compartidos y citas desde el portal del cliente.',
  alternates: { canonical: '/seguimiento-del-caso' },
};

export default function CaseFollowUpPage() {
  return <main className="motion-public motion-inner min-h-screen bg-canvas text-ink">
    <SiteHeader />
    <section className="section-shell"><div className="container max-w-4xl space-y-8">
      <div className="space-y-5"><p className="pill w-fit">Acompañamiento jurídico · Pereira y Manizales</p>
        <h1>Conozca qué ocurre con su caso.</h1>
        <p className="text-lg text-muted">La representación también exige comunicación. En Castellanos Abogados le explicamos las actuaciones y compartimos las novedades que registramos sobre el proceso.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">{[
        ['Novedades del proceso', 'Consulte las actualizaciones que publica el despacho para conocer las actuaciones y el estado informado de su asunto.'],
        ['Documentos compartidos', 'Acceda a los documentos que el despacho habilita para usted dentro del seguimiento de su caso.'],
        ['Citas con el despacho', 'Consulte sus citas y coordine el acompañamiento con su abogado según la etapa del proceso.'],
      ].map(([title, text]) => <article key={title} className="card-shell space-y-3 bg-white p-6"><h2 className="text-xl">{title}</h2><p className="text-sm leading-relaxed text-muted">{text}</p></article>)}</div>
      <div className="card-shell space-y-4 bg-white p-6 md:p-8"><h2>Un abogado que dirige y explica el proceso.</h2>
        <p className="text-muted">Acordamos el alcance de la asesoría o representación, estudiamos el asunto y preparamos las actuaciones contratadas. Las novedades y los documentos que compartimos en el portal complementan la comunicación profesional.</p>
        <p className="text-muted">Cuando habilitamos su acceso, le indicamos cómo ingresar y qué información podrá consultar. Para comunicar una novedad o coordinar una cita, puede contactar directamente al despacho.</p>
        <Link href="/cliente/login" className="btn-primary inline-flex">Ya soy cliente: ingresar al portal ↗</Link>
      </div>
      <WhatsAppContactCard source="/seguimiento-del-caso" content={{ area: 'Asesoría y representación jurídica', eyebrow: 'Castellanos Abogados', headline: 'Confíenos el acompañamiento de su proceso', description: 'Estudiamos su situación y definimos el alcance de la representación y el seguimiento que necesita. Atención en Pereira, Manizales y de forma virtual.', message: 'Hola, conocí cómo realizan el seguimiento de los casos y quisiera consultar la representación de mi proceso.' }} />
      <Link href="/servicios" className="inline-block underline underline-offset-4">Conocer nuestras áreas de práctica ↗</Link>
    </div></section>
  </main>;
}
