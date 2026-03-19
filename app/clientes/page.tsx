import { redirect } from 'next/navigation';

export default function ClientesRootRedirect() {
  redirect('/admin/clientes');
}
