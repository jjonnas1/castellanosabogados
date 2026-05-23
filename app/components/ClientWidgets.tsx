'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const WhatsAppFloat     = dynamic(() => import('./WhatsAppFloat'),     { ssr: false });
const WhatsAppLeadModal = dynamic(() => import('./WhatsAppLeadModal'), { ssr: false });
const AdminConsultChat  = dynamic(() => import('./AdminConsultChat'),  { ssr: false });
const VisitTracker      = dynamic(() => import('./VisitTracker'),      { ssr: false });

export default function ClientWidgets() {
  const pathname = usePathname();
  const isPrivateArea = pathname?.startsWith('/admin') || pathname?.startsWith('/cliente') || pathname?.startsWith('/portal');

  return (
    <>
      {!isPrivateArea && (
        <>
          <WhatsAppFloat />
          <WhatsAppLeadModal />
          <AdminConsultChat />
        </>
      )}
      <VisitTracker />
    </>
  );
}
