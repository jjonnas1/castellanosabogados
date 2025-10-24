// app/components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "/", label: "Inicio", exact: true },
  { href: "/servicios", label: "Servicios" },
  { href: "/agenda", label: "Agenda" },
  { href: "/contacto", label: "Contacto" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLAnchorElement>(null);

  // Bloquea scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    const body = document.body;
    if (open) {
      body.style.overflow = "hidden";
      // enfoca el primer elemento “focusable” del panel
      setTimeout(() => firstFocusRef.current?.focus(), 0);
    } else {
      body.style.overflow = "";
    }
    return () => {
      body.style.overflow = "";
    };
  }, [open]);

  // Cierra con Escape y hace “focus trap” dentro del panel
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      const panel = sheetRef.current;
      if (!panel) return;

      const focusables = panel.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="site-header" role="banner">
        <div className="wrap">
          <Link href="/" className="brand link-unstyled">
            <span className="brand__title">Castellanos</span>&nbsp;
            <span className="brand__muted">Abogados</span>
          </Link>

          {/* Navegación de escritorio */}
          <nav className="nav-primary" aria-label="Navegación principal">
            <ul>
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-cta">
            <Link href="/agenda" className="btn btn--primary btn--sm">
              Agendar asesoría
            </Link>

            {/* Disparador móvil */}
            <button
              className="mobile-trigger"
              aria-label="Abrir menú"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <span aria-hidden>☰</span>
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil tipo “sheet” */}
      <div
        id="mobile-menu"
        className={`sheet ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        onClick={(e) => {
          // cerrar si se hace click en el backdrop
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="sheet__panel" ref={sheetRef}>
          <div className="sheet__head">
            <span className="brand__title">Castellanos</span>{" "}
            <span className="brand__muted">Abogados</span>
            <button
              className="sheet__close"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
            >
              ✕
            </button>
          </div>

          <nav className="sheet__nav" aria-label="Navegación móvil">
            <ul>
              {NAV.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    ref={i === 0 ? firstFocusRef : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sheet__footer">
            <Link
              href="/agenda"
              className="btn btn--primary btn--lg"
              onClick={() => setOpen(false)}
            >
              Agendar ahora
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
