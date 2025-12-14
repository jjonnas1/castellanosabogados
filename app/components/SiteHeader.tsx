import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-slate-900">Castellanos Abogados</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            Riesgo penal en contratación estatal
          </span>
        </div>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <Link className="hover:text-slate-900" href="/#que-hacemos">
            Qué hacemos
          </Link>
          <Link className="hover:text-slate-900" href="/#servicios">
            Servicios
          </Link>
          <Link className="hover:text-slate-900" href="/#como-trabajamos">
            Cómo trabajamos
          </Link>
          <Link className="hover:text-slate-900" href="/#a-quien-servimos">
            A quién servimos
          </Link>
          <Link className="hover:text-slate-900" href="/contacto">
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/agenda"
            className="hidden rounded-full border border-brand-200 bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 md:inline-flex"
          >
            Solicitar evaluación
          </Link>
          <Link
            href="/cliente/acceso"
            className="rounded-full px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </header>
  );
}
