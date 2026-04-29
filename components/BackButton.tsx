'use client';

import { useRouter } from 'next/navigation';

interface BackButtonProps {
  label?: string;
  className?: string;
}

export default function BackButton({ label = 'Volver', className = '' }: BackButtonProps) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      aria-label="Volver a la página anterior"
      className={`inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink ${className}`}
    >
      <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 flex-shrink-0" aria-hidden>
        <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {label}
    </button>
  );
}
