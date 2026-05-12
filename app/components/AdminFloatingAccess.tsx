"use client";

import Link from "next/link";

export default function AdminFloatingAccess() {
  return (
    <Link
      href="/admin/login"
      aria-label="Acceso administrativo"
      className="fixed bottom-3 left-3 z-50 block select-none text-[14px] text-[#999] transition-opacity hover:opacity-60"
      style={{ opacity: 0.3 }}
    >
      ·
    </Link>
  );
}
