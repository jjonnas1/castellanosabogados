'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const labels = {
  es: ['Visas y migración', 'Visas para Colombia', 'Asesoría para extranjeros y permanencia', 'Traducción de documentos', 'Documentos jurídicos en otros idiomas'],
  en: ['Visas & immigration', 'Colombian visas', 'Legal advice for foreign nationals', 'Document translation', 'Legal documents in other languages'],
  fr: ['Visas et immigration', 'Visas pour la Colombie', 'Conseil juridique pour les étrangers', 'Traduction de documents', 'Documents juridiques en plusieurs langues'],
  it: ['Visti e immigrazione', 'Visti per la Colombia', 'Assistenza legale per stranieri', 'Traduzione di documenti', 'Documenti legali in altre lingue'],
};

export default function MigrationNav({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const { language } = useLanguage();
  const text = labels[language as keyof typeof labels] || labels.es;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const active = pathname === '/visas-colombia' || pathname.startsWith('/servicios/traduccion-legal');
  useEffect(() => {
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  return <div ref={ref} className={mobile ? 'relative' : 'relative h-10'}
    onMouseEnter={() => { if (!mobile) setOpen(true); }} onMouseLeave={() => { if (!mobile) setOpen(false); }}
    onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}
    onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); ref.current?.querySelector('button')?.focus(); } }}>
    <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(mobile ? !open : true)}
      className={mobile ? 'flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium text-ink hover:bg-subtle' : `inline-flex h-10 items-center gap-1.5 whitespace-nowrap border-b-2 px-0.5 text-[13px] font-medium hover:text-ink ${active ? 'border-[#7b1e2b] text-ink' : 'border-transparent text-muted'}`}>
      {text[0]}<svg viewBox="0 0 12 8" className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" aria-hidden><path d="m1 1.5 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
    {open && <div id={id} className={mobile ? 'ml-3 border-l border-border pl-3' : 'absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-2'}>
      <div className={mobile ? 'space-y-1' : 'space-y-1 rounded-2xl border border-border bg-card p-2 shadow-[0_24px_64px_rgba(13,21,40,.18)]'}>
        {[['/visas-colombia', text[1], text[2]], ['/servicios/traduccion-legal', text[3], text[4]]].map(([href, title, desc]) =>
          <Link key={href} href={href} onClick={() => { setOpen(false); onNavigate?.(); }} className="group block rounded-xl px-4 py-3 transition hover:bg-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-500">
            <span className="block text-sm font-semibold text-ink">{title} <span aria-hidden className="float-right">↗</span></span>
            <span className="mt-1 block text-xs leading-relaxed text-muted">{desc}</span>
          </Link>)}
      </div>
    </div>}
  </div>;
}
