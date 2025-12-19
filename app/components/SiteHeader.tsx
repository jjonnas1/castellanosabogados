"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navConfig = [
  {
    label: "Inicio",
    href: "/#resumen-servicios",
    activePath: "/",
    description: "Resumen de los servicios",
    links: [{ label: "Resumen", href: "/#resumen-servicios" }],
  },
  {
    label: "Penal/Empresas",
    description: "Servicios • Contacto",
    links: [
      { label: "Servicios", href: "/penal-empresas/servicios" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  {
    label: "Penal/Personas",
    description: "Servicios • Asesoría • Registrarse • Log in",
    links: [
      { label: "Servicios", href: "/penal-personas/servicios" },
      { label: "Asesoría", href: "/penal-personas/asesoria" },
      { label: "Registrarse", href: "/registro" },
      { label: "Log in", href: "/login" },
    ],
  },
  {
    label: "Acerca de nosotros",
    href: "/acerca-de",
    description: "Quiénes somos",
    links: [{ label: "Conócenos", href: "/acerca-de" }],
  },
  {
    label: "Contacto",
    href: "/contacto",
    description: "Coordinación inmediata",
    links: [{ label: "Contacto", href: "/contacto" }],
  },
];

const iconStyles = "h-5 w-5 text-ink";

function MenuIcon() {
  return (
    <svg aria-hidden className={iconStyles} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden className={iconStyles} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<Record<string, boolean>>({});
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const normalize = (href?: string) => href?.split("#")[0];

  const isActive = (href?: string, activePath?: string) => {
    const target = activePath ?? normalize(href);
    if (!target) return false;
    if (target === "/") return pathname === "/";
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setDesktopOpen(null);
        setMobileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopOpen(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border/80 bg-white/85 backdrop-blur"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="container flex h-16 items-center justify-between gap-6 md:h-20">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex flex-col leading-tight">
            <Link href="/" className="text-base font-heading font-semibold text-ink" aria-label="Volver a inicio">
              Castellanos Abogados
            </Link>
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted">
              Riesgo penal · decisiones críticas
            </span>
          </div>
          <span className="hidden rounded-full bg-subtle px-3 py-1 text-[11px] font-semibold text-ink/80 ring-1 ring-border md:inline-flex">
            Contratación estatal · juntas · crisis
          </span>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-8 text-sm font-semibold text-muted md:flex">
          {navConfig.map((item) => {
            const parentActive =
              item.links?.some((link) => isActive(link.href)) || isActive(item.href, item.activePath);
            return (
              <div key={item.label} className="group relative flex flex-col items-start gap-1">
                {item.links && item.links.length > 1 ? (
                  <button
                    className={`flex items-center gap-2 rounded-full px-3 py-2 transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                      parentActive ? "text-ink" : "text-muted"
                    }`}
                    aria-haspopup="true"
                    aria-expanded={desktopOpen === item.label}
                    aria-controls={`menu-${item.label}`}
                    onClick={() => setDesktopOpen((prev) => (prev === item.label ? null : item.label))}
                  >
                    {item.label}
                    <ChevronDownIcon />
                  </button>
                ) : (
                  <Link
                    href={item.href ?? item.links?.[0].href ?? "#"}
                    className={`flex items-center gap-2 rounded-full px-3 py-2 transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                      parentActive ? "text-ink" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
                {item.links && item.links.length > 1 ? (
                  <div
                    id={`menu-${item.label}`}
                    className={`absolute left-0 top-full z-40 mt-3 min-w-[240px] rounded-2xl border border-border bg-white p-3 shadow-soft transition duration-150 ease-out ${
                      desktopOpen === item.label ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <div className="space-y-1 text-sm text-ink">
                      {item.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 transition hover:bg-subtle ${
                            isActive(link.href) ? "bg-subtle text-ink font-semibold" : "text-ink"
                          }`}
                        >
                          <span>{link.label}</span>
                          <span className="text-[11px] uppercase tracking-[0.18em] text-muted">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
                <span className="text-[12px] text-muted">{item.description}</span>
              </div>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link href="/penal-personas/asesoria" className="hidden btn-primary md:inline-flex">
            Solicitar evaluación
          </Link>
          <Link
            href="/login"
            className="btn-secondary border-transparent bg-white/70 px-4 py-2 text-sm font-semibold hover:border-accent-700"
          >
            Iniciar sesión
          </Link>
          <button
            className="inline-flex items-center justify-center rounded-full border border-border bg-white/70 p-2 text-ink md:hidden"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-border bg-white/95 backdrop-blur md:hidden">
          <div className="container divide-y divide-border/80">
            {navConfig.map((item) => {
              const expandable = item.links && item.links.length > 1;
              const key = item.label;
              const expanded = mobileDropdown[key];
              return (
                <div key={key} className="py-3">
                  {expandable ? (
                    <button
                      className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-base font-semibold text-ink"
                      aria-expanded={expanded}
                      aria-controls={`mobile-${key}`}
                      onClick={() =>
                        setMobileDropdown((prev) => ({
                          ...prev,
                          [key]: !prev[key],
                        }))
                      }
                    >
                      <span>{item.label}</span>
                      <ChevronDownIcon />
                    </button>
                  ) : (
                    <Link
                      href={item.href ?? item.links?.[0].href ?? "#"}
                      className={`block rounded-lg px-2 py-2 text-base font-semibold ${
                        isActive(item.href ?? item.links?.[0].href, item.activePath)
                          ? "text-ink"
                          : "text-muted"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}

                  {expandable ? (
                    <div
                      id={`mobile-${key}`}
                      className={`${expanded ? "mt-2 space-y-2" : "hidden"}`}
                    >
                      {item.links?.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block rounded-lg px-3 py-2 text-sm ${
                            isActive(link.href) ? "bg-subtle text-ink font-semibold" : "text-ink"
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                  {item.description ? (
                    <p className="mt-1 px-2 text-[12px] text-muted">{item.description}</p>
                  ) : null}
                </div>
              );
            })}
            <div className="flex flex-col gap-2 py-3">
              <Link
                href="/penal-personas/asesoria"
                className="btn-primary w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Solicitar evaluación
              </Link>
              <Link
                href="/login"
                className="btn-secondary w-full justify-center border-transparent bg-white text-ink"
                onClick={() => setMobileOpen(false)}
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
