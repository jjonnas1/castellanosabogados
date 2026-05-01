'use client';

import dynamic from 'next/dynamic';

const WhatsAppFloat     = dynamic(() => import('./WhatsAppFloat'),     { ssr: false });
const WhatsAppLeadModal = dynamic(() => import('./WhatsAppLeadModal'), { ssr: false });
const ClientPortalModal = dynamic(() => import('./ClientPortalModal'), { ssr: false });
const AdminConsultChat  = dynamic(() => import('./AdminConsultChat'),  { ssr: false });
const VisitTracker      = dynamic(() => import('./VisitTracker'),      { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <WhatsAppFloat />
      <WhatsAppLeadModal />
      <ClientPortalModal />
      <AdminConsultChat />
      <VisitTracker />
    </>
  );
}
