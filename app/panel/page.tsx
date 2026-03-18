import { redirect } from 'next/navigation';

export default function LegacyPrivatePanelRedirect() {
  redirect('/admin');
}
