'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

const STORAGE_KEY = 'ca_lead_modal_dismissed';

const WA_URL = 'https://wa.me/573148309306?text=Hola%2C%20tengo%20una%20situaci%C3%B3n%20legal%20y%20quisiera%20orientaci%C3%B3n.';

export default function ClientPortalModal() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    if (window.matchMedia('(max-width: 767px)').matches) return;
    if (!localStorage.getItem('visited')) {
      localStorage.setItem('visited', 'true');
      return;
    }
    let timer: ReturnType<typeof setTimeout>;
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (session) return;
        timer = setTimeout(() => setVisible(true), 30000);
      })
      .catch(() => {
        timer = setTimeout(() => setVisible(true), 30000);
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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10"
        style={{ animation: 'ca-modal-in 0.35s cubic-bezier(0.22,1,0.36,1) forwards' }}
      >
        {/* Cabecera */}
        <div
          className="relative px-6 pt-6 pb-5"
          style={{ background: 'linear-gradient(135deg, #1a2f5a 0%, #2a4a8a 100%)' }}
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" aria-hidden />

          <button
            onClick={dismiss}
            aria-label="Cerrar"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
          >
            <svg viewBox="0 0 14 14" fill="none" className="h-3.5 w-3.5" aria-hidden>
              <path d="M1 1l12 12M13 1 1 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>

          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50 mb-1">
            Castellanos Abogados
          </p>
          <h2 id="lead-modal-title" className="text-lg font-bold text-white leading-snug">
            ¿Tienes una situación legal?
          </h2>
          <p className="mt-1 text-sm text-white/70 leading-relaxed">
            Cuéntanos tu caso — te orientamos y respondemos de inmediato.
          </p>
        </div>

        {/* Cuerpo */}
        <div className="px-6 py-5 space-y-3">
          <button
            type="button"
            onClick={() => { dismiss(); window.open(WA_URL, '_blank', 'noopener,noreferrer'); }}
            className="flex items-center justify-center gap-2.5 w-full rounded-xl bg-[#25D366] hover:bg-[#20b858] px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all active:scale-[0.98]"
          >
            <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5 shrink-0" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.553 4.1 1.518 5.826L.057 23.57a.5.5 0 0 0 .609.61l5.842-1.528A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.737 9.737 0 0 1-4.964-1.355l-.356-.211-3.688.965.984-3.595-.231-.369A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
            Escríbenos por WhatsApp
          </button>

          <button
            onClick={dismiss}
            className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors py-1"
          >
            Ahora no
          </button>
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
