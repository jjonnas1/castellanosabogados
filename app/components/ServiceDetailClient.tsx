'use client';

import EditorialServiceExperience from '@/app/components/EditorialServiceExperience';
import TranslationExperience from '@/app/components/TranslationExperience';
import { useLanguage } from '@/contexts/LanguageContext';
import type { ServiceDetail } from '@/lib/serviceDetails';

export default function ServiceDetailClient({ detail, backgroundImage }: { detail: ServiceDetail; backgroundImage: string }) {
  const { t } = useLanguage();
  const p = t.pages.servicioDetalle;
  const localizedDetail = (p.serviceCopy as Record<string, Partial<ServiceDetail>>)[detail.slug] ?? {};
  const displayDetail = { ...detail, ...localizedDetail };

  if (detail.slug === 'traduccion-legal') return <TranslationExperience detail={displayDetail} />;
  return <EditorialServiceExperience detail={displayDetail} backgroundImage={backgroundImage} />;
}
