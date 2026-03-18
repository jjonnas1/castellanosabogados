import { redirect } from 'next/navigation';

export default function ClienteRootRedirect() {
  redirect('/cliente/panel');
}
