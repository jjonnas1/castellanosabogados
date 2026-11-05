import Image from 'next/image';
import Link from 'next/link';
import styles from './AppsTeaser.module.css';

export default function AppsTeaser() {
  return <section className={styles.section} aria-labelledby="apps-teaser-title">
    <div className={styles.inner}>
      <div className={styles.heading}><div><span className={styles.eyebrow}>MÁS ALLÁ DEL DESPACHO</span><h2 id="apps-teaser-title">Dos apps. Dos formas de conectar.</h2></div><Link href="/apps" className={styles.all}>Conocer las apps <span aria-hidden="true">↗</span></Link></div>
      <div className={styles.grid}>
        <Link href="/apps#el-codice" className={`${styles.card} ${styles.codice}`}><div className={styles.art}><Image src="/apps/codice-app.png" width={1206} height={2622} alt="Pantalla de El Códice" /></div><div className={styles.copy}><span>DISPONIBLE EN APP STORE</span><h3>El Códice</h3><p>Estudia derecho colombiano como nunca: preguntas, retos y logros para seguir aprendiendo.</p><strong>Descubrir la app ↗</strong></div></Link>
        <Link href="/apps#luzciernaga" className={`${styles.card} ${styles.luci}`}><div className={styles.art}><Image src="/apps/luciernaga-poster.jpg" width={630} height={1080} alt="Perrito protagonista de Luzciérnaga" /></div><div className={styles.copy}><span>MUY PRONTO EN AMBAS TIENDAS</span><h3>Luzciérnaga</h3><p>Una aventura que nace del amor por los animales. Su historia empieza al otro lado de un portal.</p><strong>Conocer la historia ↗</strong></div></Link>
      </div>
    </div>
  </section>;
}
