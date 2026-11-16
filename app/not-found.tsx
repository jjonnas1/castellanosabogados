import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/app/components/SiteHeader";

export const metadata: Metadata = {
  title: "Página no encontrada | Castellanos Abogados",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="plain-page">
      <SiteHeader />
      <div className="plain-page__inner">
        <p className="plain-page__eyebrow">Error 404</p>
        <h1>No encontramos esta página</h1>
        <p className="plain-page__lead">
          Es posible que el enlace haya cambiado o que la dirección esté mal escrita.
          Desde aquí puede volver al inicio, revisar los servicios o escribirnos directamente.
        </p>
        <div className="plain-page__actions">
          <Link href="/" className="plain-page__btn">Ir al inicio</Link>
          <Link href="/servicios" className="plain-page__btn plain-page__btn--ghost">Ver servicios</Link>
          <Link href="/blog" className="plain-page__btn plain-page__btn--ghost">Leer el blog</Link>
          <Link href="/contacto" className="plain-page__btn plain-page__btn--ghost">Contacto</Link>
        </div>
      </div>
    </main>
  );
}
