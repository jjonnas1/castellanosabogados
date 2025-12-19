"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = {
  label: string;
  href?: string;
  activePaths?: readonly string[];
  description?: string;
  links?: readonly { label: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    label: "Inicio",
    href: "/#resumen-servicios",
    activePaths: ["/"],
    description: "Resumen de servicios",
  },
  {
    label: "Penal/Empresas",
    activePaths: ["/penal-empresas"],
    links: [
      { label: "Servicios", href: "/penal-empresas/servicios" },
      { label: "Contacto", href: "/penal-empresas/contacto" },
    ],
  },
  {
    label: "Penal/Personas",
    activePaths: ["/penal-personas", "/auth"],
    links: [
      { label: "Servicios", href: "/penal-personas/servicios" },
      { label: "Asesoría", href: "/penal-personas/asesoria" },
      { label: "Registrarse", href: "/auth/registro" },
      { label: "Log in", href: "/auth/login" },
    ],
  },
  {
    label: "Acerca de nosotros",
    href: "/acerca-de",
    activePaths: ["/acerca-de"],
  },
  {
    label: "Contacto",
    href: "/contacto",
    activePaths: ["/contacto"],
  },
] as const;

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

  const isActive = (paths: readonly string[] | undefined, href?: string) => {
    const normalized = href ? href.split("#")[0] : undefined;
    return paths?.some((path) => pathname === path || pathname.startsWith(`${path}/`)) ||
      (normalized ? pathname === normalized : false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setDesktopOpen(null);
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
      className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-white/85 backdrop-blur"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="container flex h-[72px] items-center justify-between gap-6 md:h-20">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" className="flex items-center gap-3 text-lg font-semibold text-ink">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-white shadow-soft">CA</span>
            <span className="hidden sm:inline">Castellanos Abogados</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-muted md:flex">
          {navItems.map((item) => {
            const parentActive = isActive(item.activePaths, item.href);
            const hasDropdown = item.links && item.links.length > 0;
            return (
              <div key={item.label} className="relative flex flex-col items-start gap-1">
                {hasDropdown ? (
                  <button
                    className={`flex items-center gap-2 rounded-full px-3 py-2 transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                      parentActive ? "text-ink" : "text-muted"
                    }`}
                    aria-haspopup="true"
                    aria-expanded={desktopOpen === item.label}
                    aria-controls={`menu-${item.label}`}
                    onClick={() => setDesktopOpen((prev) => (prev === item.label ? null : item.label))}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget)) {
                        setDesktopOpen((prev) => (prev === item.label ? null : prev));
                      }
                    }}
                  >
                    {item.label}
                    <ChevronDownIcon />
                  </button>
                ) : (
                  <Link
                    href={item.href ?? "#"}
                    className={`flex items-center gap-2 rounded-full px-3 py-2 transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                      parentActive ? "text-ink" : "text-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
                {hasDropdown ? (
                  <div
                    id={`menu-${item.label}`}
                    className={`absolute left-0 top-full z-40 mt-3 min-w-[240px] rounded-2xl border border-border bg-white p-3 shadow-soft transition duration-150 ease-out ${
                      desktopOpen === item.label ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <div className="space-y-1 text-sm text-ink">
                      {item.links?.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 transition hover:bg-subtle ${
                            isActive(item.activePaths, link.href) ? "bg-subtle text-ink font-semibold" : "text-ink"
                          }`}
                          onClick={() => setDesktopOpen(null)}
                        >
                          <span>{link.label}</span>
                          <span className="text-[11px] uppercase tracking-[0.18em] text-muted">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link href="/penal-personas/asesoria" className="hidden btn-primary md:inline-flex">
            Solicitar evaluación
          </Link>
          <Link
            href="/auth/login"
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
            {navItems.map((item) => {
              const hasDropdown = item.links && item.links.length > 0;
              const key = item.label;
              const expanded = mobileDropdown[key];
              return (
                <div key={key} className="py-3">
                  {hasDropdown ? (
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
                      href={item.href ?? "#"}
                      className={`block rounded-lg px-2 py-2 text-base font-semibold ${
                        isActive(item.activePaths, item.href) ? "text-ink" : "text-muted"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}

                  {hasDropdown ? (
                    <div id={`mobile-${key}`} className={`${expanded ? "mt-2 space-y-2" : "hidden"}`}>
                      {item.links?.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block rounded-lg px-3 py-2 text-sm ${
                            isActive(item.activePaths, link.href) ? "bg-subtle text-ink font-semibold" : "text-ink"
                          }`}
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
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
                href="/auth/login"
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
