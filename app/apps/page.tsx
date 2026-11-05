import type { Metadata } from 'next';
import Image from 'next/image';
import SiteHeader from '@/app/components/SiteHeader';
import PromoVideo from './PromoVideo';
import styles from './apps.module.css';

const origin = 'https://jonatancastellanosabogado.com';
const codiceStore = 'https://apps.apple.com/co/app/el-c%C3%B3dice-derecho-colombiano/id6821622863';

export const metadata: Metadata = {
  title: 'El Códice y Luzciérnaga: nuestras apps | Castellanos Abogados',
  description: 'Descarga El Códice en App Store: trivia para aprender y repasar derecho colombiano. Descubre Luzciérnaga, una aventura por el amor y los derechos de los animales.',
  alternates: { canonical: '/apps' },
  openGraph: { type: 'website', url: `${origin}/apps`, title: 'El Códice y Luzciérnaga | Nuestras apps', description: 'Pon a prueba lo que sabes de derecho con El Códice y conoce la aventura de Luzciérnaga.', images: [{ url: '/share/apps.jpg', width: 1200, height: 630, alt: 'El Códice y Luzciérnaga, las dos apps de Castellanos Abogados' }] },
  twitter: { card: 'summary_large_image', images: ['/share/apps.jpg'] },
};

const audiences = [
  { marker: '01', title: 'Preparas un concurso', text: 'Convierte los ratos libres en práctica jurídica. Recorre áreas, niveles y retos sin quedarte solo leyendo apuntes.' },
  { marker: '02', title: 'Estudias Derecho', text: 'Repasa para parciales y exámenes. También puede acompañar tu preparación para Saber Pro; no es un simulador oficial del Icfes.' },
  { marker: '03', title: 'Ya ejerces', text: 'Mide qué tanto recuerdas, detecta los temas que conviene repasar y mantén activo tu criterio jurídico.' },
];

export default function AppsPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'El Códice y Luzciérnaga', url: `${origin}/apps`, hasPart: [
    { '@type': 'SoftwareApplication', name: 'El Códice: Derecho Colombiano', applicationCategory: 'EducationalApplication', operatingSystem: 'iOS', downloadUrl: codiceStore },
    { '@type': 'VideoGame', name: 'Luzciérnaga', applicationCategory: 'GameApplication' },
  ] };

  return <>
    <SiteHeader />
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <section className={styles.codice} id="el-codice" aria-labelledby="codice-title">
        <div className={styles.wrap}>
          <div className={styles.topline}><span>CASTELLANOS / APPS</span><span>01 — APRENDER JUGANDO</span></div>
          <div className={styles.codiceHero}>
            <div className={styles.codiceCopy}>
              <div className={styles.appIdentity}><Image src="/apps/codice-icon.png" width={58} height={58} alt="Ícono de El Códice" /><span>TRIVIA DE DERECHO COLOMBIANO</span></div>
              <h1 id="codice-title">El Códice<span>.</span></h1>
              <p className={styles.codiceHook}>¿Cuánto derecho recuerdas cuando tienes que responder?</p>
              <p className={styles.codiceIntro}>Entra, elige un área y ponte a prueba. Preguntas, niveles, retos diarios y logros convierten cada sesión de repaso en una partida que querrás continuar.</p>
              <div className={styles.ctaRow}>
                <a className={styles.storeButton} href={codiceStore} target="_blank" rel="noopener noreferrer" aria-label="Descargar El Códice en App Store, abre una pestaña nueva"><span className={styles.appleGlyph} aria-hidden="true">↓</span><span><small>Disponible ahora en</small><strong>App Store ↗</strong></span></a>
                <span className={styles.comingPill}>Google Play · próximamente</span>
              </div>
              <a className={styles.textLink} href="#codice-trailer">Ver el tráiler <span aria-hidden="true">↗</span></a>
            </div>
            <div className={styles.codiceStage}><div className={styles.orbit} aria-hidden="true" /><div className={styles.phone}><Image src="/apps/codice-app.png" width={1206} height={2622} alt="Pantalla real del juego El Códice, con especialidades y retos" priority /></div><span className={styles.stageNote}>UN RETO MÁS.<br />UNA RESPUESTA MEJOR.</span></div>
          </div>
          <div className={styles.codiceRibbon}><span>7 ÁREAS DEL DERECHO</span><span>PENAL / CIVIL / FAMILIA / LABORAL / ADMINISTRATIVO / EJECUCIÓN DE PENAS / CONSTITUCIONAL</span></div>
        </div>
      </section>
      <section className={styles.codiceMore} aria-labelledby="codice-more-title">
        <div className={styles.wrap}>
          <div className={styles.moreHeading}><span>EL JUEGO SE ADAPTA A TU MOMENTO</span><h2 id="codice-more-title">Del primer semestre<br />al <em>ejercicio profesional.</em></h2></div>
          <div className={styles.audienceGrid}>{audiences.map((item) => <article className={styles.audience} key={item.marker}><span>{item.marker} / 03</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          <div className={styles.codiceTrailer} id="codice-trailer"><div className={styles.trailerCopy}><span className={styles.eyebrow}>MÍRALO EN ACCIÓN</span><h3>No te lo imagines.<br /><em>Juega.</em></h3><p>Así se siente pasar de una pregunta a la siguiente, desbloquear etapas y volver cada día con un nuevo reto.</p><a href={codiceStore} target="_blank" rel="noopener noreferrer">Descargar El Códice en App Store <span aria-hidden="true">↗</span></a></div><PromoVideo src="/apps/codice-promo.mp4" poster="/apps/codice-poster.jpg" title="Tráiler de El Códice" label="REPRODUCIR TRÁILER" theme="codice" /></div>
        </div>
      </section>
      <section className={styles.luci} id="luzciernaga" aria-labelledby="luci-title">
        <div className={styles.luciBackdrop} aria-hidden="true" />
        <div className={styles.wrap}>
          <div className={styles.topline}><span>CASTELLANOS / APPS</span><span>02 — UNA HISTORIA PARA SENTIR</span></div>
          <div className={styles.luciHero}>
            <div className={styles.luciVisual}><Image src="/apps/luciernaga-poster.jpg" width={630} height={1080} alt="Un perrito con bufanda roja sigue una luciérnaga en un paisaje fantástico" /><span>✦</span></div>
            <div className={styles.luciCopy}>
              <div className={styles.appIdentity}><Image src="/apps/luciernaga-icon.png" width={58} height={58} alt="Ícono de Luzciérnaga" /><span>AVENTURA NARRATIVA</span></div>
              <h2 id="luci-title">Luzciérnaga<span>.</span></h2>
              <p className={styles.luciHook}>Una despedida. Un portal que se cierra. Un amor que no se rinde.</p>
              <p>Cuando su mamá humana deja este mundo, un pequeño bebé perruno hace lo imposible: atraviesa el portal antes de que se cierre y emprende un viaje para encontrarla.</p>
              <p>Creada en favor del respeto y los derechos de los animales, Luzciérnaga es una aventura de encuentros, coraje y ternura. Su final es hermoso. Ese secreto te lo dejamos descubrir.</p>
              <div className={styles.launchBox}><span className={styles.launchSpark}>✦</span><div><strong>El viaje comienza muy pronto</strong><small>En unos días en App Store y Google Play</small></div></div>
              <a className={styles.luciLink} href="#luci-trailer">Descubrir el tráiler <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className={styles.luciTrailer} id="luci-trailer"><div><span className={styles.eyebrow}>UN VISTAZO AL OTRO LADO</span><h3>Hay historias que<br />se quedan <em>contigo.</em></h3><p>Mira el tráiler de Luzciérnaga. Sin revelar el final.</p></div><PromoVideo src="/apps/luciernaga-promo.mp4" poster="/apps/luciernaga-poster.jpg" title="Tráiler de Luzciérnaga" label="REPRODUCIR TRÁILER" theme="luci" /></div>
        </div>
      </section>
    </main>
  </>;
}
