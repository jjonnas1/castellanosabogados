'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const WhatsAppFloat  = dynamic(() => import('./WhatsAppFloat'),  { ssr: false });
const VisitTracker   = dynamic(() => import('./VisitTracker'),   { ssr: false });
const MarketingPopup = dynamic(() => import('./MarketingPopup'), { ssr: false });

export default function ClientWidgets() {
  const pathname = usePathname();
  const isPrivateArea = pathname?.startsWith('/admin') || pathname?.startsWith('/cliente') || pathname?.startsWith('/portal');

  return (
    <>
      {!isPrivateArea && (
        <>
          <WhatsAppFloat />
          <MarketingPopup />
        </>
      )}
      <VisitTracker />
    </>
  );
}
