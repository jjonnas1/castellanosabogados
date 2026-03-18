import { redirect } from 'next/navigation';

export default function ClienteAccesoRedirect() {
  redirect('/cliente/login');
}
