'use client';

import { usePathname } from 'next/navigation';
import WhatsAppContactCard from '@/app/components/WhatsAppContactCard';
import { getPageWhatsAppCta } from '@/lib/whatsappCtaContent';

export default function ContextualPageContact() {
  const pathname = usePathname();
  const content = getPageWhatsAppCta(pathname);

  if (!content) return null;

  return (
    <section className="bg-canvas px-4 py-12 sm:py-16" aria-label="Contacto directo por WhatsApp">
      <div className="container max-w-5xl">
        <WhatsAppContactCard content={content} source={pathname} />
      </div>
    </section>
  );
}
