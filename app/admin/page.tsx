'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    window.location.href = '/admin/login';
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-700">
      Redirigiendo al acceso de administrador…
    </main>
  );
}
