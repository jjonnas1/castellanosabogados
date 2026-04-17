'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const REDIRECT_DELAY_MS = 1500;

export default function GraciasLegalClient() {
  const params      = useSearchParams();
  const waUrl       = params.get('wa') ?? '';
  const nombre      = params.get('nombre') ?? '';
  const [dots, setDots] = useState('');
  const opened      = useRef(false);

  // Animación de puntos suspensivos
  useEffect(() => {
    const id = setInterval(
      () => setDots(d => (d.length >= 3 ? '' : d + '.')),
      380,
    );
    return () => clearInterval(id);
  }, []);

  // Apertura automática de WhatsApp tras el retraso
  useEffect(() => {
    if (!waUrl || opened.current) return;
    const id = setTimeout(() => {
      opened.current = true;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, REDIRECT_DELAY_MS);
    return () => clearTimeout(id);
  }, [waUrl]);

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-canvas"
      aria-live="polite"
    >
      {/* Icono animado */}
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full mb-8 animate-fade-in"
        style={{ background: '#edfbf1', animationDuration: '0.4s' }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="#25D366"
          className="h-10 w-10"
          aria-hidden
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.553 4.1 1.518 5.826L.057 23.57a.5.5 0 0 0 .609.61l5.842-1.528A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.737 9.737 0 0 1-4.964-1.355l-.356-.211-3.688.965.984-3.595-.231-.369A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
        </svg>
      </div>

      {/* Saludo personalizado */}
      {nombre && (
        <p
          className="text-sm font-medium text-muted mb-2 animate-fade-in"
          style={{ animationDuration: '0.5s', animationDelay: '0.1s', animationFillMode: 'both' }}
        >
          Hola, {nombre}
        </p>
      )}

      {/* Título principal */}
      <h1
        className="font-heading text-2xl sm:text-3xl font-semibold text-ink text-center leading-snug mb-3 animate-fade-in-up"
        style={{ animationDuration: '0.45s', animationDelay: '0.15s', animationFillMode: 'both' }}
      >
        Conectando con la oficina jurídica{dots}
      </h1>

      {/* Subtexto */}
      <p
        className="text-sm text-muted text-center max-w-xs leading-relaxed animate-fade-in-up"
        style={{ animationDuration: '0.45s', animationDelay: '0.25s', animationFillMode: 'both' }}
      >
        En un momento se abrirá WhatsApp para ponerte en contacto directo con nuestro equipo.
      </p>

      {/* Barra de progreso visual */}
      <div
        className="mt-8 h-0.5 w-48 rounded-full bg-border overflow-hidden animate-fade-in"
        style={{ animationDuration: '0.4s', animationDelay: '0.35s', animationFillMode: 'both' }}
        aria-hidden
      >
        <div
          className="h-full rounded-full"
          style={{
            background: '#25D366',
            width: '100%',
            transform: 'translateX(-100%)',
            animation: `slide-in ${REDIRECT_DELAY_MS}ms ease-out ${0}ms forwards`,
          }}
        />
      </div>

      {/* Fallback manual si el popup es bloqueado */}
      {waUrl && (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 text-xs text-muted underline underline-offset-2 hover:text-ink transition-colors animate-fade-in"
          style={{ animationDuration: '0.4s', animationDelay: '0.5s', animationFillMode: 'both' }}
        >
          ¿No se abrió WhatsApp? Haz clic aquí
        </a>
      )}

      {/* Keyframe para la barra de progreso — inline para no tocar globals.css */}
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </main>
  );
}
