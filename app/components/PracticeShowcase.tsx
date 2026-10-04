"use client";
import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { serviceDetails, type ServiceDetail } from "@/lib/serviceDetails";
import { buildWhatsAppUrl } from "@/lib/contactLinks";
import styles from './PracticeShowcase.module.css';
const slugs: Array<ServiceDetail["slug"] | 'derecho-migratorio'> = [
  "penal-personas",
  "ejecucion-penas",
  "familia",
  "civil",
  "laboral",
  "administrativo",
  "traduccion-legal",
  "derecho-migratorio",
];
const migrationCopy = {
  es: { title: 'Derecho migratorio', headline: 'Su próximo capítulo en Colombia empieza con una ruta clara', summary: 'Asesoría para visas, residencia y permanencia según su nacionalidad, propósito y situación actual. Atención virtual en toda Colombia y desde el exterior.', heroStats: ['Revisión del permiso vigente y de su situación migratoria.', 'Evaluación de opciones según sus vínculos, actividad y proyecto de vida.', 'Acompañamiento en la preparación y seguimiento del trámite.'], deliverables: ['Diagnóstico del caso, opciones aplicables y prioridades para avanzar.'] },
  en: { title: 'Immigration law', headline: 'Your next chapter in Colombia starts with a clear plan', summary: 'Advice on visas, residence and length of stay based on your nationality, plans and current status. Online consultations throughout Colombia and from abroad.', heroStats: ['Review of your current permit and immigration status.', 'Assessment of options based on your ties, activities and plans.', 'Support with preparing and following up on your application.'], deliverables: ['A case assessment, applicable options and priorities for moving forward.'] },
  fr: { title: 'Droit de l’immigration', headline: 'Votre prochain chapitre en Colombie commence par un parcours clair', summary: 'Conseil sur les visas, la résidence et le séjour selon votre nationalité, vos projets et votre situation. Consultations à distance dans toute la Colombie et depuis l’étranger.', heroStats: ['Examen du permis en cours et de votre situation migratoire.', 'Évaluation des possibilités selon vos liens, votre activité et vos projets.', 'Accompagnement dans la préparation et le suivi de la demande.'], deliverables: ['Analyse du dossier, possibilités applicables et priorités pour avancer.'] },
  it: { title: 'Diritto dell’immigrazione', headline: 'Il suo prossimo capitolo in Colombia inizia con un percorso chiaro', summary: 'Consulenza su visti, residenza e soggiorno secondo nazionalità, obiettivi e situazione attuale. Assistenza a distanza in tutta la Colombia e dall’estero.', heroStats: ['Esame del permesso vigente e della situazione migratoria.', 'Valutazione delle possibilità secondo legami, attività e progetti.', 'Assistenza nella preparazione e nel monitoraggio della domanda.'], deliverables: ['Analisi del caso, opzioni applicabili e priorità per procedere.'] },
};
const extraLabels = {
  es: { translation: 'Traducción jurídica', translationScope: 'Documentos e idiomas', migrationScope: 'Visas, residencia y permanencia', coverage: 'Atención virtual · Colombia y exterior', intro: 'Asesoría, representación y servicios jurídicos' },
  en: { translation: 'Legal translation', translationScope: 'Documents and languages', migrationScope: 'Visas, residence and stay', coverage: 'Online support · Colombia and abroad', intro: 'Legal advice, representation and services' },
  fr: { translation: 'Traduction juridique', translationScope: 'Documents et langues', migrationScope: 'Visas, résidence et séjour', coverage: 'À distance · Colombie et étranger', intro: 'Conseil, représentation et services juridiques' },
  it: { translation: 'Traduzione giuridica', translationScope: 'Documenti e lingue', migrationScope: 'Visti, residenza e soggiorno', coverage: 'A distanza · Colombia ed estero', intro: 'Consulenza, rappresentanza e servizi legali' },
};
const copy = {
  es: [
    "Áreas de práctica",
    "El respaldo que tu caso necesita.",
    "Servicios jurídicos",
    "Explorar esta área",
    "Consultar mi caso",
  ],
  en: [
    "Practice areas",
    "The support your case needs.",
    "Legal services",
    "Explore this area",
    "Discuss my case",
  ],
  fr: [
    "Domaines de pratique",
    "Le soutien dont votre dossier a besoin.",
    "Services juridiques",
    "Explorer ce domaine",
    "Parler de mon dossier",
  ],
  it: [
    "Aree di attività",
    "Il supporto di cui hai bisogno.",
    "Servizi legali",
    "Scopri questa area",
    "Parla del tuo caso",
  ],
};
export default function PracticeShowcase() {
  const { t, language } = useLanguage();
  const [active, setActive] = useState(0);
  const c = copy[language];
  const slug = slugs[active];
  const labels = extraLabels[language];
  const count = String(slugs.length).padStart(2, '0');
  const serviceName = (s: typeof slugs[number]) => s === 'derecho-migratorio' ? migrationCopy[language].title : s === 'traduccion-legal' ? labels.translation : t.header.serviceNames[s];
  const detail = slug === 'derecho-migratorio' ? migrationCopy[language] : {
    ...serviceDetails[slug],
    ...((
      t.pages.servicioDetalle.serviceCopy as Record<
        string,
        Partial<ServiceDetail>
      >
    )[slug] ?? {}),
  };
  return (
    <section id="servicios" className={`services section ${styles.showcase}`} data-practice={slug}>
      <div className="section-heading" data-reveal>
        <div>
          <span className="eyebrow">
            <span className="line" />
            01 / {c[0]}
          </span>
          <h2>{c[1]}</h2>
        </div>
        <div className="practice-intro">
          <span className="practice-count">
            {count}<span>{c[2]}</span>
          </span>
          <p>{labels.intro}</p>
        </div>
      </div>
      <div className="practice-workspace" data-reveal>
        <div className="practice-menu" role="tablist" aria-label={c[0]}>
          {slugs.map((s, i) => (
            <button
              role="tab"
              type="button"
              key={s}
              id={"practice-tab-" + i}
              aria-selected={active === i}
              aria-controls="practice-panel"
              tabIndex={active === i ? 0 : -1}
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (
                  [
                    "ArrowDown",
                    "ArrowRight",
                    "ArrowUp",
                    "ArrowLeft",
                    "Home",
                    "End",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                  const n =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? slugs.length - 1
                        : (i +
                            (["ArrowDown", "ArrowRight"].includes(e.key)
                              ? 1
                              : slugs.length - 1)) %
                          slugs.length;
                  setActive(n);
                  document.getElementById("practice-tab-" + n)?.focus();
                }
              }}
            >
              <span className="practice-tab-number">0{i + 1}</span>
              <span>{serviceName(s)}<small className={styles.menuScope}>{s === 'traduccion-legal' ? labels.translationScope : s === 'derecho-migratorio' ? labels.migrationScope : ({es:['Defensa y representación','Beneficios y seguimiento','Acuerdos y protección','Contratos y patrimonio','Trabajo y prestaciones','Recursos y actuaciones'],en:['Defense and representation','Benefits and follow-up','Agreements and protection','Contracts and assets','Employment and benefits','Appeals and proceedings'],fr:['Défense et représentation','Bénéfices et suivi','Accords et protection','Contrats et patrimoine','Travail et prestations','Recours et procédures'],it:['Difesa e rappresentanza','Benefici e monitoraggio','Accordi e tutela','Contratti e patrimonio','Lavoro e prestazioni','Ricorsi e procedimenti']}[language])[i]}</small></span>
              <span className="practice-tab-arrow" aria-hidden>
                ↗
              </span>
            </button>
          ))}
          <div className="practice-menu-foot">
            <span className="status-dot" />
            {active >= 6 ? labels.coverage : 'Pereira · Eje Cafetero'}
          </div>
        </div>
        <div
          className="practice-panel"
          id="practice-panel"
          role="tabpanel"
          aria-labelledby={"practice-tab-" + active}
        >
          <div className="practice-panel-content" key={active}>
            <div className="practice-panel-top">
              <span>CASTELLANOS ABOGADOS</span>
              <span>0{active + 1} / {count}</span>
            </div>
            <span className="practice-watermark" aria-hidden>
              0{active + 1}
            </span>
            <div className="practice-panel-body">
              <span className="eyebrow">
                <span className="line" />
                {serviceName(slug)}
              </span>
              <h3>{detail.headline}</h3>
              <p>{detail.summary}</p>
              <div className="practice-scope">
                {detail.heroStats.map((s, i) => (
                  <div key={s}>
                    <span>0{i + 1}</span>
                    <p>{s}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.support}><span>{({es:'EL TRABAJO CONCRETO',en:'WHAT THE SERVICE INCLUDES',fr:'LE TRAVAIL CONCRET',it:'IL LAVORO CONCRETO'}[language])}</span><p>{detail.deliverables[0]}</p></div>
            <div className="practice-panel-actions">
              <Link className="button light" href={slug === 'derecho-migratorio' ? '/visas-colombia' : '/servicios/' + slug}>
                {c[3]} <span aria-hidden>↗</span>
              </Link>
              <a
                className="text-link"
                href={buildWhatsAppUrl({
                  area: detail.title,
                  source: "/#servicios",
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c[4]} <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
