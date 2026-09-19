'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, FileText, Languages, Plus } from 'lucide-react';
import SiteHeader from './SiteHeader';
import { buildWhatsAppUrl } from '@/lib/contactLinks';
import type { ServiceDetail } from '@/lib/serviceDetails';
import s from './TranslationExperience.module.css';

const quote = buildWhatsAppUrl({ area: 'Traducción jurídica', source: '/servicios/traduccion-legal', message: 'Hola, quisiera cotizar una traducción. Necesito confirmar idiomas, alcance y fecha de entrega.' });

export function TranslationFeature() {
  return <section id="traduccion-legal" className={s.feature}>
    <div className={s.featureIntro}><span className={s.kicker}>SERVICIOS ESPECIALIZADOS / 01</span><Languages size={28} strokeWidth={1.4} /></div>
    <div className={s.featureGrid}>
      <div><h2>Traducción<br /><em>jurídica.</em></h2><p>Documentos que cruzan fronteras.<br />Precisión que conserva su significado.</p><Link className={s.link} href="/servicios/traduccion-legal">Explorar el servicio <ArrowUpRight size={21} /></Link></div>
      <div className={s.languageComposition} aria-label="Español, inglés, francés e italiano"><span>ES</span><ArrowRight size={36} strokeWidth={1} /><span>EN</span><span>FR</span><span className={s.languageNote}>Contratos · Poderes<br />Sentencias · Expedientes</span><span>IT</span></div>
    </div>
    <div className={s.featureFoot}><span>Jonatan Castellanos</span><strong>Abogado y licenciado en Lenguas Modernas</strong><Link href="/servicios/traduccion-legal">Ver alcance <ArrowRight size={17} /></Link></div>
  </section>;
}

export default function TranslationExperience({ detail }: { detail: ServiceDetail }) {
  const documents = [
    { n: '01', title: 'Contratos y empresas', description: 'Acuerdos comerciales, contratos, actas y documentación corporativa.', scope: 'Obligaciones · Cláusulas · Terminología' },
    { n: '02', title: 'Personas y trámites', description: 'Poderes, autorizaciones y certificados para gestiones personales.', scope: 'Identificación · Fechas · Finalidad' },
    { n: '03', title: 'Procesos y expedientes', description: 'Sentencias, demandas, anexos y documentación procesal.', scope: 'Coherencia · Referencias · Contexto' },
  ];
  return <main className={s.page}>
    <SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Service', name: 'Traducción jurídica', description: detail.summary, provider: { '@type': 'LegalService', name: 'Castellanos Abogados' } }) }} />
    <header className={s.hero}>
      <Image src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1800&q=84&fm=webp" alt="Documento jurídico preparado para traducción" fill priority sizes="100vw" className={s.heroPhoto} />
      <div className={s.heroShade} />
      <div className={s.heroContent}>
        <Link href="/servicios" className={s.kicker}>CASTELLANOS ABOGADOS / SERVICIOS</Link>
        <h1>Traducción<br /><em>jurídica.</em></h1>
        <p>El significado importa.<br />En cualquier idioma.</p>
        <a href={quote} target="_blank" rel="noopener noreferrer" className={s.cta}>Cotizar un documento <ArrowUpRight size={21} /></a>
      </div>
      <div className={s.heroFoot}><span>ESPAÑOL / INGLÉS / FRANCÉS / ITALIANO</span><span>Contratos. Poderes. Sentencias. Expedientes.</span></div>
    </header>
    <section className={s.credentials}><span>LA PERSONA DETRÁS DEL SERVICIO</span><strong>Jonatan Castellanos</strong><p>Abogado y licenciado en Lenguas Modernas</p></section>
    <section className={s.documents}>
      <div className={s.sectionHeading}><span className={s.kicker}>01 / DOCUMENTOS</span><h2>Cada documento,<br /><em>su contexto.</em></h2><p>El alcance se define según el contenido, los idiomas y el uso que tendrá la traducción.</p></div>
      <div className={s.documentGrid}>{documents.map(doc => <article key={doc.n} className={s.document}><div className={s.docTop}><span>{doc.n}</span><FileText size={28} strokeWidth={1.2} /></div><h3>{doc.title}</h3><p>{doc.description}</p><small>{doc.scope}</small><a href={buildWhatsAppUrl({area: doc.title, source: '/servicios/traduccion-legal', message: `Hola, quisiera cotizar una traducción de ${doc.title.toLowerCase()}.`})} target="_blank" rel="noopener noreferrer">Consultar este documento <ArrowUpRight size={19} /></a></article>)}</div>
    </section>
    <section className={s.delivery}><div><span className={s.kicker}>02 / ENTREGA</span><h2>Lo que acompaña<br /><em>su traducción.</em></h2></div><ol>{detail.deliverables.map((item, i) => <li key={item}><span>0{i+1}</span><p>{item}</p></li>)}</ol></section>
    <section className={s.profile}><div className={s.profileMark} aria-hidden><span>ES</span><span>EN</span><span>FR</span><span>IT</span></div><div className={s.profileText}><span className={s.kicker}>03 / PERFIL PROFESIONAL</span><h2>Dos disciplinas.<br /><em>Un mismo rigor.</em></h2><h3>Jonatan Castellanos</h3><p className={s.degree}>Abogado y licenciado<br />en Lenguas Modernas</p><p>Atención directa en la revisión del documento, la definición del alcance y la entrega. Una interlocución clara durante todo el encargo.</p><Link href="/nosotros" className={s.link}>Conocer el perfil profesional <ArrowUpRight size={20} /></Link></div></section>
    <section className={s.process}><span className={s.kicker}>04 / SU ENCARGO</span><h2>Claro desde el principio.</h2><div>{detail.process?.map((step, i) => <article key={step.title}><span>0{i+1}</span><h3>{step.title}</h3><p>{step.detail}</p></article>)}</div></section>
    <section className={s.faq}><div><span className={s.kicker}>ANTES DE COMENZAR</span><h2>Resolvamos<br /><em>sus dudas.</em></h2></div><div>{detail.faqs?.map(item => <details key={item.question}><summary>{item.question}<Plus size={20} /></summary><p>{item.answer}</p></details>)}</div></section>
    <section className={s.close}><span className={s.kicker}>SU PRÓXIMO DOCUMENTO</span><h2>Empecemos por<br /><em>una cotización.</em></h2><p>Indique idiomas, finalidad y fecha requerida.<br />Recibirá alcance, precio y plazo antes de contratar.</p><a href={quote} className={s.cta} target="_blank" rel="noopener noreferrer">Solicitar cotización <ArrowUpRight size={22} /></a></section>
  </main>;
}
