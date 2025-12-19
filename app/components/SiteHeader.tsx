import Link from "next/link";

export default function SiteHeader() {
  const navGroups = [
    {
      href: "/#inicio",
      label: "Inicio",
      detail: "Resumen de los servicios",
      links: [{ href: "/#inicio", label: "Ver inicio" }],
    },
    {
      href: "/#servicios",
      label: "Penal / Empresas",
      detail: "Servicios • Contacto",
      links: [
        { href: "/#servicios", label: "Servicios" },
        { href: "/#contacto", label: "Contacto" },
      ],
    },
    {
      href: "/#servicios",
      label: "Penal / Personas",
      detail: "Servicios • Asesoría • Regístrate • Log in",
      links: [
        { href: "/#servicios", label: "Servicios" },
        { href: "/agenda", label: "Asesoría" },
        { href: "/cliente/registro", label: "Registrarse" },
        { href: "/cliente/acceso", label: "Log in" },
      ],
    },
    {
      href: "/#contacto",
      label: "Contacto",
      detail: "Coordinación inmediata",
      links: [{ href: "/#contacto", label: "Contacto" }],
    },
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

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {navGroups.map((item) => (
            <div key={item.label} className="group flex flex-col gap-1">
              <Link
                className="relative text-ink transition hover:text-ink"
                href={item.href}
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-ink transition-all duration-200 group-hover:w-full" />
              </Link>
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                {item.links.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className="rounded-full bg-subtle/80 px-2.5 py-1 transition hover:bg-ink hover:text-white"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
              <span className="text-[12px] text-muted">{item.detail}</span>
            </div>
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
        </div>
      </div>
    </header>
  );
}
