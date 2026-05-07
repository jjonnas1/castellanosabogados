import type { Metadata } from 'next';
import TutelaClient from '@/app/components/TutelaClient';

export const metadata: Metadata = {
  title: 'Tutelas | Castellanos Abogados',
  description: 'Interponemos acciones de tutela para proteger tus derechos fundamentales. Evaluación gratuita y acompañamiento en todo el proceso.',
  alternates: { canonical: '/tutela' },
};

export default function TutelaPage() {
  return <TutelaClient />;
}
