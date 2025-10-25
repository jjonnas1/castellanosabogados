"use client";

import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap">
        <div className="brand">Castellanos Abogados</div>

        <nav className="nav">
          <Link href="/">Inicio</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/agenda">Agenda</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/agenda" className="cta">
            Agendar asesoría
          </Link>
        </nav>
      </div>
    </header>
  );
}
