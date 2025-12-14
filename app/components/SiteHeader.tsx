import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="container h-16 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">
            Castellanos Abogados
          </span>
          <span className="text-xs text-gray-500">
            Asesoría estratégica
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <Link href="/#que-hacemos">Qué hacemos</Link>
          <Link href="/#servicios">Servicios</Link>
          <Link href="/#como">Cómo trabajamos</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/agenda"
            className="rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-800 transition"
          >
            Solicitar evaluación
          </Link>
          <Link
            href="/cliente/acceso"
            className="hidden sm:block text-sm text-gray-600 hover:text-gray-900"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </header>
  );
}
