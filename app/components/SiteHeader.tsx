"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  {
    label: "Servicios",
    href: "/servicios",
    children: [
      { label: "Riesgo penal empresarial", href: "/penal-empresarial" },
      { label: "Asesoría a personas", href: "/asesoria-personas" },
    ],
  },
  { label: "Cómo trabajamos", href: "/como-trabajamos" },
  { label: "A quién servimos", href: "/a-quien-servimos" },
  { label: "Contacto", href: "/contacto" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const servicesMenuId = useId();
  const mobileServicesId = useId();

  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isServicesActive = () => {
    if (!pathname) return false;
    return ["/servicios", "/penal-empresarial", "/asesoria-personas"].some((p) =>
      pathname.startsWith(p)
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileServicesOpen(false);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/90 backdrop-blur">
      <div className="container flex items-center justify-between gap-6 py-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-base font-semibold text-ink">
            Castellanos Abogados
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label} ref={servicesRef} className="relative">
                    <button
                      type="button"
                      className={`group inline-flex items-center gap-2 transition hover:text-ink ${
                        isServicesActive() ? "text-ink" : ""
                      }`}
                      aria-expanded={servicesOpen}
                      aria-controls={servicesMenuId}
                      onClick={() => setServicesOpen((v) => !v)}
                    >
                      {item.label}
                      <svg
                        className={`h-3 w-3 transition ${
                          servicesOpen ? "rotate-180 text-ink" : ""
                        }`}
                        viewBox="0 0 12 8"
                      >
                        <path
                          d="M1 1.5 6 6.5 11 1.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {servicesOpen && (
                      <div
                        id={servicesMenuId}
                        className="absolute left-0 top-full mt-3 w-64 rounded-2xl border border-border bg-white p-3 shadow-soft"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block rounded-xl px-3 py-2 text-sm transition hover:bg-subtle hover:text-ink ${
                              isActive(child.href)
                                ? "bg-subtle text-ink"
                                : "text-muted"
                            }`}
                            onClick={() => setServicesOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition hover:text-ink ${
                    isActive(item.href) ? "text-ink" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/agenda" className="hidden btn-primary md:inline-flex">
            Solicitar evaluación
          </Link>

          <Link
            href="/cliente/acceso"
            className="btn-secondary border-transparent bg-white/70 px-4 py-2 text-sm font-semibold hover:border-accent-700"
          >
            Iniciar sesión
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink md:hidden"
            onClick={() => {
              setOpen((v) => !v);
              setServicesOpen(false);
              setMobileServicesOpen(false);
            }}
            aria-label="Abrir menú"
          >
            <span className="sr-only">Menú</span>
            <div className="flex h-3 flex-col justify-between">
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-border/70 bg-white/95 backdrop-blur md:hidden">
          <div className="container flex flex-col gap-3 py-4 text-sm font-medium text-muted">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`rounded-xl px-3 py-2 ${
                isActive("/") ? "bg-subtle text-ink" : ""
              }`}
            >
              Inicio
            </Link>

            <button
              type="button"
              className="flex items-center justify-between rounded-xl px-3 py-2"
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
              aria-controls={mobileServicesId}
            >
              <span
                className={
                  mobileServicesOpen || isServicesActive()
                    ? "text-ink"
                    : ""
                }
              >
                Servicios
              </span>
            </button>

            {mobileServicesOpen && (
              <div className="ml-2 flex flex-col gap-2">
                {NAV_ITEMS[1].children!.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => {
                      setOpen(false);
                      setMobileServicesOpen(false);
                    }}
                    className="rounded-xl px-3 py-2 hover:bg-subtle"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/agenda" className="btn-primary w-full justify-center">
              Solicitar evaluación
            </Link>

            <Link
              href="/cliente/acceso"
              className="btn-secondary w-full justify-center"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
