import MetodologiaClient from "@/app/components/MetodologiaClient";

export const metadata = {
  title: "Metodología | Castellanos Abogados",
  description:
    "Conoce cómo trabajamos: diagnóstico, plan de actuación y seguimiento continuo aplicado a cada área de práctica jurídica.",
  alternates: { canonical: '/metodologia' },
};

export default function MetodologiaPage() {
  return <MetodologiaClient />;
}
