"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  // 🔹 Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const closeDropdowns = (e: MouseEvent) => {
      document.querySelectorAll("details.dropdown[open]").forEach((d) => {
        if (!d.contains(e.target as Node)) d.removeAttribute("open");
      });
    };
    document.addEventListener("click", closeDropdowns);
    return () => document.removeEventListener("click", closeDropdowns);
  }, []);

  return (
    <header className="sitebar">
      <div className="wrap nav">
        {/* Logo */}
        <Link href="/" className="logo" aria-label="Castellanos Abogados">
          <strong>Castellanos</strong>{" "}
          <span style={{ opacity: 0.7 }}>Abogados</span>
        </Link>

        {/* Menú principal */}
        <nav aria-label="Principal" className="menu">
          {/* Enlaces generales */}
          <Link
            href="/"
            className={isActive("/", true) ? "active" : undefined}
            aria-current={isActive("/", true) ? "page" : undefined}
          >
            Inicio
          </Link>

          <Link
            href="/servicios"
            className={isActive("/servicios") ? "active" : undefined}
          >
            Servicios
          </Link>

          <Link
            href="/contacto"
            className={isActive("/contacto") ? "active" : undefined}
          >
            Contacto
          </Link>

          {/* 🔹 Desplegable Clientes */}
          <details className="dropdown" role="list">
            <summary className="dropdown-trigger">
              Clientes
              <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden>
                <path
                  d="M5 7l5 5 5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </summary>
            <ul
              className="dropdown-menu"
              role="listbox"
              aria-label="Opciones para clientes"
            >
              <li>
                <Link href="/agenda" className="dropdown-link">
                  Agendar asesoría
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="dropdown-link">
                  Ver servicios
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="dropdown-link">
                  Soporte y contacto
                </Link>
              </li>
              <li>
                <Link href="/paquetes" className="dropdown-link">
                  Paquetes (próximamente)
                </Link>
              </li>
            </ul>
          </details>

          {/* 🔹 Desplegable Abogados */}
          <details className="dropdown" role="list">
            <summary className="dropdown-trigger">
              Abogados
              <svg width="14" height="14" viewBox="0 0 20 20" aria-hidden>
                <path
                  d="M5 7l5 5 5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </summary>
            <ul
              className="dropdown-menu"
              role="listbox"
              aria-label="Opciones para abogados"
            >
              <li>
                <Link href="/registro/abogado" className="dropdown-link">
                  Registro de abogados
                </Link>
              </li>
              <li>
                <Link href="/login" className="dropdown-link">
                  Acceso / Iniciar sesión
                </Link>
              </li>
              <li>
                <Link href="/panel" className="dropdown-link">
                  Mi panel
                </Link>
              </li>
            </ul>
          </details>

          {/* 🔹 Botón destacado: Trabaja con nosotros */}
          <Link
            href="/trabaja"
            className="btn btn--ghost"
            style={{
              fontWeight: 600,
              marginLeft: 10,
              border: "1px solid #e3e8f5",
              background: "#fff",
            }}
          >
            Trabaja con nosotros
          </Link>

          {/* 🔹 CTA principal (clientes) */}
          <Link
            href="/agenda"
            className="btn btn--primary"
            style={{ marginLeft: 8 }}
          >
            Agendar asesoría
          </Link>
        </nav>
      </div>
    </header>
  );
}
