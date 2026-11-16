// app/trabaja/page.tsx
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";

export default function TrabajaPage() {
  return (
    <main className="plain-page">
      <SiteHeader />
      <div className="plain-page__inner">
        <p className="plain-page__eyebrow">Trabaje con nosotros</p>
        <h1>Únete a Castellanos Abogados</h1>
        <p className="plain-page__lead">
          Si eres abogado titulado en Colombia, con experiencia y vocación de servicio,
          puedes formar parte de nuestra red de especialistas. Trabaja de manera remota,
          atiende consultas legales verificadas y recibe pagos seguros por cada asesoría.
        </p>

        <ul className="plain-page__list">
          <li>Verificamos tu tarjeta profesional y área de práctica.</li>
          <li>Recibirás acceso a tu panel para gestionar tus citas.</li>
          <li>Pagos automáticos por Wompi o transferencia bancaria.</li>
        </ul>

        <div className="plain-page__actions">
          <Link href="/registro/abogado" className="plain-page__btn">
            Postularme como abogado
          </Link>
          <Link href="/contacto" className="plain-page__btn plain-page__btn--ghost">
            Hacer una pregunta
          </Link>
        </div>
      </div>
    </main>
  );
}
