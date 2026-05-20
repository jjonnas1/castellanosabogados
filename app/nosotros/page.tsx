import type { Metadata } from 'next';
import NosotrosClient from '@/app/components/NosotrosClient';

export const metadata: Metadata = {
  title: 'Nosotros | Castellanos Abogados',
  description: 'Conoce al equipo de Castellanos Abogados: formación, experiencia y enfoque jurídico estratégico en Pereira y el Eje Cafetero.',
  alternates: { canonical: '/nosotros' },
  openGraph: {
    type: 'profile',
    url: 'https://jonatancastellanosabogado.com/nosotros',
    title: 'Jonatan Castellanos — Abogado en Pereira | Castellanos Abogados',
    description: 'Abogado de la Universidad Libre de Pereira. Especialista en derecho penal, ejecución de penas y asesoría jurídica estratégica en el Eje Cafetero.',
    images: [{ url: '/jonatan-castellanos.png', width: 800, height: 800, alt: 'Jonatan Castellanos — Abogado en Pereira' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jonatan Castellanos — Abogado en Pereira',
    description: 'Universidad Libre de Pereira. Derecho penal, ejecución de penas y asesoría jurídica estratégica en el Eje Cafetero.',
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jonatan Castellanos",
  jobTitle: "Abogado",
  url: "https://jonatancastellanosabogado.com/nosotros",
  image: "https://jonatancastellanosabogado.com/jonatan-castellanos.png",
  worksFor: {
    "@type": "LegalService",
    name: "Castellanos Abogados",
    url: "https://jonatancastellanosabogado.com",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Universidad Libre de Pereira" },
    { "@type": "CollegeOrUniversity", name: "Universidad de Caldas" },
  ],
  knowsLanguage: ["es", "en", "fr", "it"],
  hasOccupation: {
    "@type": "Occupation",
    name: "Abogado",
    occupationLocation: { "@type": "City", name: "Pereira" },
    skills: "Derecho penal, ejecución de penas, tutelas, derecho de familia, derecho laboral",
  },
  sameAs: ["https://wa.me/573148309306"],
};

export default function NosotrosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <NosotrosClient />
    </>
  );
}
