import type { Metadata } from 'next';
import MigrationAssistant from './MigrationAssistant';
export const metadata: Metadata = { title: 'Asistente migratorio | Administración', robots: { index: false, follow: false } };
export default function MigrationAdminPage() { return <MigrationAssistant />; }
