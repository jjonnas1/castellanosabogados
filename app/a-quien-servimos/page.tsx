'use client';

import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";
import WaIcon from "@/app/components/WaIcon";
import { buildWhatsAppUrl } from "@/lib/contactLinks";
import { useLanguage } from "@/contexts/LanguageContext";

// Cada situación enlaza con el área que la atiende (mismo orden que el diccionario).
const CONTEXT_LINKS = [
  '/servicios/penal-personas',
  '/servicios/ejecucion-penas',
  '/servicios/civil',
  '/servicios/familia',
  '/servicios/laboral',
  '/servicios/administrativo',
];

export default function AQuienServimosPage() {
  const { t } = useLanguage();
  const p = t.pages.aQuienServimos;

  return (
    <main className="motion-public motion-inner editorial-page editorial-audience bg-canvas text-ink">
      <SiteHeader />

      <header className="text-white" style={{ backgroundImage: "linear-gradient(90deg, rgba(18,15,16,.91), rgba(18,15,16,.58)), url('https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1600&q=82&fm=webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container section-shell space-y-5">
          <p className="pill w-fit bg-white/15 text-white ring-1 ring-white/30">{p.badge}</p>
          <h1 className="max-w-3xl text-white">{p.heroTitle}</h1>
          <p className="max-w-3xl text-lg text-slate-200">{p.heroParagraph}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl({
                area: "A quién servimos",
                source: "/a-quien-servimos",
                message: "Hola, quisiera solicitar una evaluación.",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] active:scale-95"
            >
              <WaIcon size={16} />
              {t.common.requestEval}
            </a>
            <Link href="/servicios" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              {t.common.viewServices}
            </Link>
          </div>
        </div>
      </header>

      <section className="ed-section">
        <div className="ed-wrap ed-split">
          <div className="ed-split__head" data-reveal>
            <p className="ed-eyebrow">{p.rolesBadge}</p>
            <h2 className="ed-h2">{p.rolesTitle}</h2>
            <p className="ed-lead">{p.rolesSubtitle}</p>
            <div className="ed-actions">
              <Link href="/servicios" className="ed-btn ed-btn--ghost">{t.common.viewServices}</Link>
            </div>
          </div>
          <ol className="ed-rows">
            {p.roles.map((role, idx) => (
              <li key={role.title} className="ed-row" data-reveal>
                <span className="ed-row__num">{String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{role.title}</h3>
                  <p>{role.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ed-section ed--band">
        <div className="ed-wrap">
          <div data-reveal>
            <p className="ed-eyebrow">{p.contextsBadge}</p>
            <h2 className="ed-h2">{p.contextsTitle}</h2>
          </div>
          <div className="ed-linkgrid" data-reveal>
            {p.contexts.map((item, idx) => (
              <Link key={item} href={CONTEXT_LINKS[idx] ?? '/servicios'}>
                {item}
                <span aria-hidden>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
