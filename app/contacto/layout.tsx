import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Castellanos Abogados',
  description: 'Contáctanos por WhatsApp, llamada o correo. Atendemos consultas en Pereira y todo el Eje Cafetero.',
  alternates: { canonical: '/contacto' },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
