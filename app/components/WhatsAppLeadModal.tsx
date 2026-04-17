'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { buildWhatsAppUrl } from '@/lib/contactLinks';

type State = 'idle' | 'open' | 'loading' | 'error';

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.553 4.1 1.518 5.826L.057 23.57a.5.5 0 0 0 .609.61l5.842-1.528A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.737 9.737 0 0 1-4.964-1.355l-.356-.211-3.688.965.984-3.595-.231-.369A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
);

export default function WhatsAppLeadModal() {
  const [uiState, setUiState]   = useState<State>('idle');
  const [waUrl, setWaUrl]       = useState('');
  const [nombre, setNombre]     = useState('');
  const [telefono, setTelefono] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const overlayRef              = useRef<HTMLDivElement>(null);
  const firstInputRef           = useRef<HTMLInputElement>(null);
  const router                  = useRouter();

  // ── Intercepción global ──────────────────────────────────────────────────
  useEffect(() => {
    function intercept(e: MouseEvent) {
      const el = e.target as HTMLElement;

      // ── Exclusión explícita: nunca interferir con formularios existentes ──
      if (el.closest('form')) return;

      const anchor = el.closest('a[href]') as HTMLAnchorElement | null;
      const ctaEl  = el.closest('[data-wa-lead]') as HTMLElement | null;

      // Condición 1: enlace directo a WhatsApp
      const href     = anchor?.getAttribute('href') ?? '';
      const isWaLink = href.includes('wa.me') || href.includes('whatsapp.com');

      // Condición 2: botón CTA etiquetado con data-wa-lead
      const isCta = !isWaLink && ctaEl !== null;

      if (!isWaLink && !isCta) return;

      e.preventDefault();
      e.stopPropagation();

      // Prioridad: URL del enlace WA > data-wa-url en el CTA > URL por defecto
      const resolved = isWaLink
        ? (anchor!.href || href)
        : (ctaEl!.dataset.waUrl ?? buildWhatsAppUrl({ source: 'CTA' }));

      setWaUrl(resolved);
      setUiState('open');
    }

    // Fase de captura para interceptar antes que cualquier onClick del componente
    document.addEventListener('click', intercept, true);
    return () => document.removeEventListener('click', intercept, true);
  }, []);

  // Foco automático al abrir
  useEffect(() => {
    if (uiState === 'open') {
      setTimeout(() => firstInputRef.current?.focus(), 80);
    }
  }, [uiState]);

  // Cerrar con Escape
  useEffect(() => {
    if (uiState === 'idle') return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [uiState]);

  function close() {
    setUiState('idle');
    setNombre('');
    setTelefono('');
    setErrorMsg('');
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) close();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim()) return;

    setUiState('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/leads/whatsapp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          nombre:   nombre.trim(),
          telefono: telefono.trim(),
          wa_url:   waUrl,
        }),
      });
      if (!res.ok) throw new Error('api_error');

      router.push(
        `/gracias-legal?wa=${encodeURIComponent(waUrl)}&nombre=${encodeURIComponent(nombre.trim())}`,
      );
    } catch {
      setUiState('error');
      setErrorMsg('Ocurrió un problema. Por favor intenta de nuevo.');
    }
  }

  const isLoading  = uiState === 'loading';
  const canSubmit  = nombre.trim().length >= 2 && telefono.trim().length >= 6;

  if (uiState === 'idle') return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Formulario de contacto por WhatsApp"
      className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center px-4 pb-4 sm:pb-0"
      style={{ background: 'rgba(13, 21, 40, 0.6)', backdropFilter: 'blur(6px)' }}
    >
      <div
        className="w-full max-w-[420px] bg-card rounded-xl shadow-soft overflow-hidden animate-fade-in-up"
        style={{ animationDuration: '0.22s' }}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-border">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#25D366]"
            style={{ background: '#edfbf1' }}
          >
            {WA_ICON}
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-[0.8125rem] font-semibold text-ink leading-tight">
              Castellanos Abogados
            </p>
            <p className="text-xs text-muted mt-0.5">
              Déjanos tus datos para conectarte con la oficina
            </p>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted hover:bg-subtle transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Formulario ── */}
        <form onSubmit={handleSubmit} noValidate className="px-6 py-5 space-y-4">
          {/* Nombre */}
          <div className="space-y-1.5">
            <label
              htmlFor="wl-nombre"
              className="block text-[0.6875rem] font-semibold text-muted uppercase tracking-widest"
            >
              Nombre
            </label>
            <input
              ref={firstInputRef}
              id="wl-nombre"
              type="text"
              autoComplete="name"
              placeholder="¿Cómo te llamas?"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              disabled={isLoading}
              required
              className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-500/25 focus:border-accent-500 transition-all disabled:opacity-50"
            />
          </div>

          {/* Teléfono */}
          <div className="space-y-1.5">
            <label
              htmlFor="wl-telefono"
              className="block text-[0.6875rem] font-semibold text-muted uppercase tracking-widest"
            >
              Teléfono
            </label>
            <input
              id="wl-telefono"
              type="tel"
              autoComplete="tel"
              placeholder="Ej. 3001234567"
              value={telefono}
              onChange={e => setTelefono(e.target.value)}
              disabled={isLoading}
              required
              className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent-500/25 focus:border-accent-500 transition-all disabled:opacity-50"
            />
          </div>

          {/* Error inline */}
          {uiState === 'error' && (
            <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
          )}

          {/* CTA */}
          <button
            type="submit"
            disabled={isLoading || !canSubmit}
            className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: '#25D366' }}
          >
            {isLoading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" className="opacity-25" />
                  <path fill="white" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Conectando…
              </>
            ) : (
              <>
                <span className="text-white">{WA_ICON}</span>
                Contactar ahora por WhatsApp
              </>
            )}
          </button>

          <p className="text-center text-[0.6875rem] text-muted/60 leading-relaxed">
            Tu información es confidencial y está protegida por nuestro deber de reserva profesional.
          </p>
        </form>
      </div>
    </div>
  );
}
