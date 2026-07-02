import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Castellanos Abogados',
  description: 'Contáctanos por WhatsApp, llamada o correo. Atendemos consultas en Pereira y todo el Eje Cafetero.',
  alternates: { canonical: '/contacto' },
  openGraph: {
    type: 'website',
    url: 'https://jonatancastellanosabogado.com/contacto',
    title: 'Contacto | Castellanos Abogados — Pereira',
    description: 'Contáctanos por WhatsApp al 314 830 9306 o por correo. Atendemos consultas en Pereira y todo el Eje Cafetero.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Contacto — Castellanos Abogados' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | Castellanos Abogados',
    description: 'WhatsApp: 314 830 9306. Atendemos consultas en Pereira y el Eje Cafetero.',
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
