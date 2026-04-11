'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase-browser';

const STORAGE_KEY = 'ca_portal_modal_dismissed';

export default function ClientPortalModal() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let timer: ReturnType<typeof setTimeout>;

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (session) return;
        timer = setTimeout(() => setVisible(true), 1500);
      })
      .catch(() => {
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
      className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center"
      style={{ animation: 'ca-backdrop-in 0.3s ease-out forwards' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
        onClick={dismiss}
        aria-hidden
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cpm-title"
        className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl shadow-[0_24px_64px_rgba(13,21,40,0.35)]"
        style={{ animation: 'ca-modal-in 0.4s cubic-bezier(0.22,1,0.36,1) forwards' }}
      >
        {/* ── Cabecera de marca ── */}
        <div
          className="relative flex flex-col items-start gap-3 px-6 pt-6 pb-5"
          style={{ background: 'linear-gradient(135deg, #0d1528 0%, #1f365d 100%)' }}
        >
          {/* Círculo decorativo */}
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" aria-hidden />
          <div className="absolute -right-2 top-8 h-16 w-16 rounded-full bg-white/5" aria-hidden />

          {/* Botón cerrar */}
          <button
            onClick={dismiss}
            aria-label="Cerrar aviso"
            className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          >
            <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3" aria-hidden>
              <path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          {/* Icono */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" aria-hidden>
              <path d="M9 12h6M9 16h6M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 8h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Texto cabecera */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
              Castellanos Abogados
            </p>
            <h2
              id="cpm-title"
              className="mt-0.5 text-lg font-bold leading-snug text-white"
            >
              Siga su proceso<br />sin salir de casa
            </h2>
          </div>
        </div>

        {/* ── Cuerpo ── */}
        <div className="bg-white px-6 pt-4 pb-5 space-y-4">
          <p className="text-sm leading-relaxed text-muted">
            Si tiene un proceso activo con nosotros, puede consultar avances,
            documentos y actuaciones en tiempo real desde nuestra plataforma.
          </p>

          <div className="flex flex-col gap-2">
            <Link
              href="/cliente/login"
              onClick={dismiss}
              className="btn-primary justify-center text-center"
            >
              Ingresar a mi caso
            </Link>
            <Link
              href="/contacto"
              onClick={dismiss}
              className="btn-secondary justify-center text-center"
            >
              Solicitar acceso
            </Link>
          </div>

          <p className="text-center text-[11px] text-muted/70">
            Este aviso solo aparece una vez
          </p>
        </div>
      </div>

      <style>{`
        @keyframes ca-backdrop-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ca-modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
