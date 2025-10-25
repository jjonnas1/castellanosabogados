"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/";
  const active = useMemo(() => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }, [href, pathname]);

  return (
    <Link
      href={href}
      className={
        "nav-link" +
        (active ? " nav-link--active" : "")
      }
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header__row">
        <Link href="/" className="brand">Castellanos <span>Abogados</span></Link>

        <nav className="nav">
          <NavLink href="/">Inicio</NavLink>
          <NavLink href="/servicios">Servicios</NavLink>
          <NavLink href="/agenda">Agenda</NavLink>
          <NavLink href="/contacto">Contacto</NavLink>

          <Link href="/agenda" className="btn btn--primary btn--sm">
            Agendar asesoría
          </Link>
        </nav>
      </div>
    </header>
  );
}
