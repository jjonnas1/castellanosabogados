'use client';

import { supabase } from '@/lib/supabase-browser';

export default function AccessPage() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: typeof window !== 'undefined' ? `${location.origin}/cliente/panel` : undefined }
    });
  };

  return (
    <main className="main section">
      <div className="wrap" style={{maxWidth:520}}>
        <h1 className="h1">Acceso de clientes</h1>
        <p className="muted">Inicia sesión para agendar y ver tus citas.</p>
        <button className="btn btn--primary" onClick={signInWithGoogle}>Continuar con Google</button>
      </div>
    </main>
  );
}
