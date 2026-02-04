import { Suspense } from "react";

import SiteHeader from "@/app/components/SiteHeader";
import ContactoClient from "@/app/contacto/ContactoClient";

export default function ContactoPage() {
  return (
    <main className="bg-canvas text-ink">
      <SiteHeader />
      <Suspense fallback={<div className="container section-shell py-10 text-muted">Cargando…</div>}>
        <ContactoClient />
      </Suspense>
    </main>
  );
}
