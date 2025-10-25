"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={`nav-link ${active ? "nav-link--active" : ""}`}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className={`topbar ${scrolled ? "topbar--scrolled" : ""}`}>
      <div className="wrap">
        <Link href="/" className="brand">Castellanos <span className="brand__muted">Abogados</span></Link>
        <nav className="nav">
          <NavLink href="/">Inicio</NavLink>
          <NavLink href="/servicios">Servicios</NavLink>
          <NavLink href="/agenda">Agenda</NavLink>
          <NavLink href="/contacto">Contacto</NavLink>
          <Link href="/agenda" className="btn btn--primary">Agendar asesoría</Link>
        </nav>
      </div>
    </header>
  );
}

