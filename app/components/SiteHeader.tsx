"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { buildMailtoUrl } from "@/lib/contactLinks";

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
    if (href === "/") return pathname === href;
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

  const mailtoEvaluacionDesktop = buildMailtoUrl({
    area: "Contacto general",
    source: "Header",
    subject: "Solicitud de evaluación – Contacto general",
    message: "Hola, quisiera solicitar una evaluación estratégica.",
  });

  const mailtoEvaluacionMobile = buildMailtoUrl({
    area: "Contacto general",
    source: "Header móvil",
    subject: "Solicitud de evaluación – Contacto general",
    message: "Hola, quisiera solicitar una evaluación estratégica.",
  });

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
                  <div key={item.label} className="relative" ref={servicesRef}>
                    <button
                      type="button"
                      className={`group relative inline-flex items-center gap-2 transition hover:text-ink ${
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
                        aria-hidden="true"
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

                      <span
                        className={`absolute -bottom-2 left-0 h-[2px] bg-ink transition-all duration-200 ${
                          isServicesActive() ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
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
                  className={`group relative transition hover:text-ink ${
                    isActive(item.href) ? "text-ink" : ""
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] bg-ink transition-all duration-200 ${
                      isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a href={mailtoEvaluacionDesktop} className="hidden btn-primary md:inline-flex">
            Solicitar evaluación
          </a>

          <Link
            href="/cliente/acceso"
            className="btn-secondary border-transparent bg-white/70 px-4 py-2 text-sm font-semibold hover:border-accent-700"
          >
            Iniciar sesión
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink transition hover:-translate-y-[1px] hover:shadow-soft md:hidden"
            onClick={() => {
              setOpen((v) => !v);
              setServicesOpen(false);
              setMobileServicesOpen(false);
            }}
            aria-label="Abrir menú"
          >
            <span className="sr-only">Menú</span>
            <div className="flex h-3 flex-col justify-between">
              <span className="block h-0.5 w-5 rounded-full bg-ink" />
              <span className="block h-0.5 w-5 rounded-full bg-ink" />
              <span className="block h-0.5 w-5 rounded-full bg-ink" />
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
              className={`rounded-xl px-3 py-2 transition hover:bg-subtle hover:text-ink ${
                isActive("/") ? "bg-subtle text-ink" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              Inicio
            </Link>

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-subtle hover:text-ink"
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
              aria-controls={mobileServicesId}
            >
              <span className={mobileServicesOpen || isServicesActive() ? "text-ink" : ""}>
                Servicios
              </span>
              <svg
                className={`h-3 w-3 transition ${mobileServicesOpen ? "rotate-180 text-ink" : ""}`}
                viewBox="0 0 12 8"
                aria-hidden="true"
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

            {mobileServicesOpen && (
              <div id={mobileServicesId} className="ml-2 flex flex-col gap-2">
                {NAV_ITEMS.find((i) => i.children)?.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`rounded-xl px-3 py-2 text-sm transition hover:bg-subtle hover:text-ink ${
                      isActive(child.href) ? "bg-subtle text-ink" : ""
                    }`}
                    onClick={() => {
                      setOpen(false);
                      setMobileServicesOpen(false);
                    }}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}

            {NAV_ITEMS.filter((i) => !i.children && i.href !== "/").map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-2 transition hover:bg-subtle hover:text-ink ${
                  isActive(item.href) ? "bg-subtle text-ink" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <a
              href={mailtoEvaluacionMobile}
              className="btn-primary w-full justify-center"
              onClick={() => setOpen(false)}
            >
              Solicitar evaluación
            </a>

            <Link
              href="/cliente/acceso"
              className="btn-secondary w-full justify-center"
              onClick={() => setOpen(false)}
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}