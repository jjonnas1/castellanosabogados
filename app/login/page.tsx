"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "../components/LanguageProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { messages } = useLanguage();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    else window.location.href = "/panel";
    setLoading(false);
  }

  return (
    <main className="section">
      <div className="wrap" style={{ maxWidth: 420 }}>
        <h1 className="h2">{messages.auth.login.title}</h1>
        <p className="muted">{messages.auth.login.description}</p>

        <form onSubmit={handleLogin} className="panel" style={{ display: "grid", gap: 14 }}>
          <label>
            {messages.forms.email}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
            />
          </label>

          <label>
            {messages.forms.password}
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <button className="btn btn--primary" disabled={loading}>
            {loading ? messages.common.loading : messages.auth.login.submit}
          </button>

          <p style={{ fontSize: ".9rem", marginTop: 8 }}>
            {messages.auth.login.cta}
            <a href="/registro/abogado" style={{ color: "var(--brand-600)", marginLeft: 4 }}>
              {messages.auth.register.lawyerCta}
            </a>
          </p>
        </form>

        {error && (
          <div className="panel" style={{ background: "#fff5f5", borderColor: "#fed7d7", marginTop: 12 }}>
            ❌ {messages.auth.login.error}: {error}
          </div>
        )}
      </div>
    </main>
  );
}
