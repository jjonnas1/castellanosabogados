"use client";
import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { serviceDetails, type ServiceDetail } from "@/lib/serviceDetails";
import { buildWhatsAppUrl } from "@/lib/contactLinks";
import styles from './PracticeShowcase.module.css';
const slugs: ServiceDetail["slug"][] = [
  "penal-personas",
  "ejecucion-penas",
  "familia",
  "civil",
  "laboral",
  "administrativo",
];
const copy = {
  es: [
    "Áreas de práctica",
    "El respaldo que tu caso necesita.",
    "Áreas del derecho",
    "Explorar esta área",
    "Consultar mi caso",
  ],
  en: [
    "Practice areas",
    "The support your case needs.",
    "Areas of law",
    "Explore this area",
    "Discuss my case",
  ],
  fr: [
    "Domaines de pratique",
    "Le soutien dont votre dossier a besoin.",
    "Domaines du droit",
    "Explorer ce domaine",
    "Parler de mon dossier",
  ],
  it: [
    "Aree di attività",
    "Il supporto di cui hai bisogno.",
    "Aree del diritto",
    "Scopri questa area",
    "Parla del tuo caso",
  ],
};
export default function PracticeShowcase() {
  const { t, language } = useLanguage();
  const [active, setActive] = useState(0);
  const c = copy[language];
  const slug = slugs[active];
  const detail = {
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
            06<span>{c[2]}</span>
          </span>
          <p>{t.pages.metodologia.heroKpis[1].label}</p>
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
                        ? 5
                        : (i +
                            (["ArrowDown", "ArrowRight"].includes(e.key)
                              ? 1
                              : 5)) %
                          6;
                  setActive(n);
                  document.getElementById("practice-tab-" + n)?.focus();
                }
              }}
            >
              <span className="practice-tab-number">0{i + 1}</span>
              <span>{t.header.serviceNames[s]}<small className={styles.menuScope}>{({es:['Defensa y representación','Beneficios y seguimiento','Acuerdos y protección','Contratos y patrimonio','Trabajo y prestaciones','Recursos y actuaciones'],en:['Defense and representation','Benefits and follow-up','Agreements and protection','Contracts and assets','Employment and benefits','Appeals and proceedings'],fr:['Défense et représentation','Bénéfices et suivi','Accords et protection','Contrats et patrimoine','Travail et prestations','Recours et procédures'],it:['Difesa e rappresentanza','Benefici e monitoraggio','Accordi e tutela','Contratti e patrimonio','Lavoro e prestazioni','Ricorsi e procedimenti']}[language])[i]}</small></span>
              <span className="practice-tab-arrow" aria-hidden>
                ↗
              </span>
            </button>
          ))}
          <div className="practice-menu-foot">
            <span className="status-dot" />
            Pereira · Eje Cafetero
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
              <span>0{active + 1} / 06</span>
            </div>
            <span className="practice-watermark" aria-hidden>
              0{active + 1}
            </span>
            <div className="practice-panel-body">
              <span className="eyebrow">
                <span className="line" />
                {t.header.serviceNames[slug]}
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
              <Link className="button light" href={"/servicios/" + slug}>
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
      <div className={`${styles.migrationFeature} mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center`}>
        <div>
          <span className="eyebrow"><span className="line" />Derecho migratorio</span>
          <h3 className="mt-3 font-heading text-2xl font-semibold text-ink">¿Quiere vivir, trabajar o permanecer más tiempo en Colombia?</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">Revisamos su nacionalidad, propósito y situación actual para orientar la ruta migratoria que corresponda. Atención virtual en todo Colombia y desde el exterior.</p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Link className="button light" href="/visas-colombia">Conocer la asesoría <span aria-hidden>↗</span></Link>
          <a className="text-link" href={buildWhatsAppUrl({ area: 'Derecho migratorio', source: '/#servicios', message: 'Hola, necesito orientación sobre mi situación migratoria en Colombia.' })} target="_blank" rel="noopener noreferrer">Consultar por WhatsApp <span aria-hidden>→</span></a>
        </div>
      </div>
    </section>
  );
}
