import type { Metadata } from 'next';
import NosotrosClient from '@/app/components/NosotrosClient';

export const metadata: Metadata = {
  title: 'Nosotros | Castellanos Abogados',
  description: 'Conoce al equipo de Castellanos Abogados: formación, experiencia y enfoque jurídico estratégico en Pereira y el Eje Cafetero.',
  alternates: { canonical: '/nosotros' },
};

export default function NosotrosPage() {
  return <NosotrosClient />;
}
