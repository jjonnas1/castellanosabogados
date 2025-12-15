import Link from "next/link";

export default function SiteHeader() {
  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/#riesgo-empresarial", label: "Riesgo penal empresarial" },
    { href: "/servicios", label: "Servicios" },
    { href: "/#como-trabajamos", label: "Cómo trabajamos" },
    { href: "/#a-quien-servimos", label: "A quién servimos" },
    { href: "/#contacto", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/80 backdrop-blur">
      <div className="container flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col leading-tight">
            <span className="text-base font-heading font-semibold text-ink">Castellanos Abogados</span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted">
              Riesgo penal · decisiones críticas
            </span>
          </div>
          <span className="hidden rounded-full bg-subtle px-3 py-1 text-[11px] font-semibold text-ink/80 ring-1 ring-border md:inline-flex">
            Contratación estatal · juntas · crisis
          </span>
        </div>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              className="relative transition hover:text-ink"
              href={item.href}
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-ink transition-all duration-200 hover:w-full" />
            </Link>
          ))}
        </nav>

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
            href="/personas"
            className="hidden text-sm font-semibold text-muted underline-offset-4 transition hover:text-ink md:inline-flex"
          >
            Asesoría a personas
          </Link>
        </div>
      </div>
    </header>
  );
}
