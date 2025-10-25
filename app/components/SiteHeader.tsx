"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={
        "btn btn-ghost" +
        (isActive ? " btn-ghost--active" : "")
      }
    >
      {children}
    </Link>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="brand">
        <Link href="/" className="link brand__fallback">
          Castellanos <span style={{ opacity: 0.7 }}>Abogados</span>
        </Link>
      </div>

      <nav className="nav" aria-label="Principal">
        <NavLink href="/">Inicio</NavLink>
        <NavLink href="/servicios">Servicios</NavLink>
        <NavLink href="/agenda">Agenda</NavLink>
        <NavLink href="/contacto">Contacto</NavLink>
        <Link href="/agenda" className="btn btn--primary btn--lg">
          Agendar asesoría
        </Link>
      </nav>
    </header>
  );
}
