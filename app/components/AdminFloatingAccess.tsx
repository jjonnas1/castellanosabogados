"use client";

import Link from "next/link";

export default function AdminFloatingAccess() {
  return (
    <Link
      href="/admin/login"
      className="fixed bottom-5 left-4 z-[70] rounded-full border border-border/80 bg-white/95 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted shadow-soft backdrop-blur transition hover:border-ink hover:text-ink sm:left-6"
      aria-label="Acceso administrativo"
    >
      Admin
    </Link>
  );
}
