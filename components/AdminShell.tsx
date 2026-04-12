'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';

// ─── Nav items ─────────────────────────────────────────────────────────────────

const NAV = [
  {
    href:  '/admin',
    exact: true,
    label: 'Resumen',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href:  '/admin/clientes',
    label: 'Clientes',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href:  '/admin/agenda',
    label: 'Agenda',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
        <path strokeLinecap="round" d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    href:  '/admin/consultas',
    label: 'Consultas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    href:  '/admin/actualizaciones',
    label: 'Actualizaciones',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 3.757a2 2 0 0 1 2.828 2.829L12 15l-4 1 1-4 8.657-8.243z" />
      </svg>
    ),
  },
  {
    href:  '/admin',
    label: 'Documentos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
  {
    href:  '/admin/exportar',
    label: 'Exportar',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  {
    href:  '/admin/visitas',
    label: 'Visitas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
] as const;

// ─── Component ─────────────────────────────────────────────────────────────────

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href) && href !== '/admin';
  }

  return (
    <div className="flex min-h-screen bg-[#0d1626]">
      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside className="w-[220px] flex-shrink-0 flex flex-col bg-[#0a1120] border-r border-[#1a2d4a]">
        {/* Logo */}
        <div className="px-5 pt-6 pb-5 border-b border-[#1a2d4a]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            CastellanosAbogados
          </p>
          <p className="mt-0.5 text-sm font-semibold text-slate-200">Panel Admin</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => {
            const active = isActive(item.href, 'exact' in item ? item.exact : false);
            return (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className={[
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  active
                    ? 'bg-blue-900/50 text-blue-200 border border-blue-800/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40',
                ].join(' ')}
              >
                <span className={active ? 'text-blue-400' : 'text-slate-500'}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#1a2d4a]">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-400 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7 7-7M3 12h18" />
            </svg>
            Volver al sitio
          </Link>
        </div>
      </aside>

      {/* ── Main content ────────────────────────────────────────── */}
      <main className="flex-1 min-w-0 overflow-auto bg-[#0d1626] text-slate-200">
        {children}
      </main>
    </div>
  );
}
