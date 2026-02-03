 "use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks: NavItem[] = useMemo(
    () => [
      { label: "Inicio", href: "/" },
      { label: "Qué hacemos", href: "/que-hacemos" },
      { label: "Servicios", href: "/servicios" },
      { label: "Cómo trabajamos", href: "/como-trabajamos" },
      { label: "A quién servimos", href: "/a-quien-servimos" },
      { label: "Contacto", href: "/contacto" },
    ],
    []
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-semibold text-ink">
          Castellanos Abogados
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              className={`group relative transition hover:text-ink ${
                isActive(item.href) ? "text-ink" : ""
              }`}
              href={item.href}
            >
              {item.label}
              <span
                className={`absolute -bottom-2 left-0 h-[2px] bg-ink transition-all duration-200 ${
                  isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
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

          <Link
            href="/asesoria-personas"
            className="hidden text-sm font-semibold text-muted underline-offset-4 transition hover:text-ink md:inline-flex"
          >
            Asesoría a personas
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-ink transition hover:-translate-y-[1px] hover:shadow-soft md:hidden"
            onClick={() => setOpen((prev) => !prev)}
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
            {navLinks.map((item) => (
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

            <Link
              href="/asesoria-personas"
              className="rounded-xl px-3 py-2 text-ink transition hover:bg-subtle"
              onClick={() => setOpen(false)}
            >
              Asesoría a personas
            </Link>

            <Link
              href="/agenda"
              className="btn-primary w-full justify-center"
              onClick={() => setOpen(false)}
            >
              Solicitar evaluación
            </Link>

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
