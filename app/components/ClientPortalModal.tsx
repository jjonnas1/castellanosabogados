'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-browser';

const STORAGE_KEY = 'ca_portal_modal_dismissed';

export default function ClientPortalModal() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('[Modal] effect running');
    setMounted(true);

    if (sessionStorage.getItem(STORAGE_KEY)) {
      console.log('[Modal] skipped – storage key present');
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        console.log('[Modal] session:', session);
        if (session) { console.log('[Modal] skipped – authenticated'); return; }
        console.log('[Modal] scheduling timer');
        timer = setTimeout(() => { console.log('[Modal] visible!'); setVisible(true); }, 1500);
      })
      .catch((err) => {
        console.error('[Modal] supabase error, showing anyway:', err);
        timer = setTimeout(() => setVisible(true), 1500);
      });

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  };

  if (!mounted || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ animation: 'ca-backdrop-in 0.3s ease-out forwards' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cpm-title"
        className="relative z-10 w-full max-w-md rounded-2xl bg-card shadow-[0_32px_80px_rgba(13,21,40,0.28)] ring-1 ring-border overflow-hidden"
        style={{ animation: 'ca-modal-in 0.35s cubic-bezier(0.22,1,0.36,1) forwards' }}
      >
        {/* Header accent strip */}
        <div className="h-1 w-full bg-gradient-to-r from-accent-500 to-accent-700" />

        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-subtle text-muted transition-colors hover:bg-panel hover:text-ink"
        >
          <svg viewBox="0 0 14 14" fill="none" className="h-3.5 w-3.5" aria-hidden>
            <path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <div className="px-8 pb-8 pt-6 space-y-5">
          {/* Badge */}
          <span className="inline-block rounded-full bg-accent-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-700">
            Portal de clientes
          </span>

          {/* Title */}
          <h2
            id="cpm-title"
            className="font-heading text-2xl font-bold leading-snug text-ink"
          >
            Siga su proceso sin salir de casa
          </h2>

          {/* Body */}
          <p className="text-sm leading-relaxed text-muted">
            Acceda a su caso, consulte avances, documentos y actuaciones en tiempo real
            desde nuestra plataforma.
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <Link
              href="/cliente/login"
              onClick={dismiss}
              className="btn-primary flex-1 justify-center text-center"
            >
              Ingresar a mi caso
            </Link>
            <Link
              href="/contacto"
              onClick={dismiss}
              className="btn-secondary flex-1 justify-center text-center"
            >
              Solicitar acceso
            </Link>
          </div>
        </div>
      </div>

      {/* Keyframes injected inline — no globals modification needed */}
      <style>{`
        @keyframes ca-backdrop-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ca-modal-in {
          from { opacity: 0; transform: scale(0.94) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
