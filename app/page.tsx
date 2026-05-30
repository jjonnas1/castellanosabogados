// app/page.tsx
import type { Metadata } from 'next';
import HomeClient from "./components/HomeClient";

export const metadata: Metadata = {
  title: 'Castellanos Abogados | Firma jurídica en Pereira, Manizales y Armenia',
  description: 'Asesoría jurídica estratégica en derecho penal, tutelas, ejecución de penas, familia y laboral. Atendemos en Pereira, Manizales y Armenia (Eje Cafetero).',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://jonatancastellanosabogado.com',
    title: 'Castellanos Abogados | Firma jurídica en Pereira, Manizales y Armenia',
    description: 'Asesoría jurídica estratégica en derecho penal, tutelas, ejecución de penas, familia y laboral. Atendemos en Pereira, Manizales y Armenia (Eje Cafetero).',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Castellanos Abogados' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Castellanos Abogados | Firma jurídica en Pereira, Manizales y Armenia',
    description: 'Asesoría jurídica en derecho penal, tutelas, ejecución de penas, familia y laboral. Pereira, Manizales y Armenia.',
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "¿Cuánto cuesta una tutela?", acceptedAnswer: { "@type": "Answer", text: "Nuestros honorarios dependen de la complejidad del caso y el tipo de proceso. Contáctanos para una evaluación inicial sin costo." } },
    { "@type": "Question", name: "¿Cuánto dura un proceso penal?", acceptedAnswer: { "@type": "Answer", text: "Depende de la etapa y la complejidad. En promedio, un proceso penal en Colombia puede durar entre 1 y 4 años." } },
    { "@type": "Question", name: "¿Qué hago si me vulneran un derecho fundamental?", acceptedAnswer: { "@type": "Answer", text: "Lo primero es documentar la situación: guardar comunicaciones, respuestas de entidades y fechas." } },
    { "@type": "Question", name: "¿Puedo tener representación legal si no tengo recursos?", acceptedAnswer: { "@type": "Answer", text: "En Castellanos Abogados evaluamos cada caso individualmente y ofrecemos opciones de honorarios flexibles." } },
  ],
};

const legalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Castellanos Abogados",
  url: "https://jonatancastellanosabogado.com",
  image: "https://jonatancastellanosabogado.com/og-image.png",
  telephone: "+573148309306",
  priceRange: "$$",
  areaServed: [
    { "@type": "City", name: "Pereira" },
    { "@type": "City", name: "Manizales" },
    { "@type": "City", name: "Armenia" },
    { "@type": "AdministrativeArea", name: "Eje Cafetero" },
  ],
  knowsLanguage: ["es", "en"],
  serviceType: [
    "Derecho penal",
    "Tutelas",
    "Ejecución de penas",
    "Derecho de familia",
    "Derecho laboral",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "6",
    bestRating: "5",
  },
  sameAs: [
    "https://www.google.com/search?q=Castellanos+Abogados",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />
      <HomeClient />
    </>
  );
}
