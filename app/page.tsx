:root{
  --bg: #0b1220;           /* fondo */
  --surface: #0f172a;      /* tarjeta */
  --brand: #2563eb;        /* azul marca */
  --brand-2:#60a5fa;       /* azul claro */
  --acc:#10b981;           /* acento (confirmación) */
  --text:#e5e7eb;          /* texto base */
  --muted:#94a3b8;         /* texto suave */
}

html,body{background:var(--bg);color:var(--text);}
a{color:inherit;text-decoration:none}
.container{max-width:1100px;margin:0 auto;padding:24px}
.card{
  background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.02));
  border:1px solid rgba(255,255,255,.08);
  border-radius:16px;padding:24px;
  box-shadow:0 10px 30px rgba(0,0,0,.3);
}
.btn{
  display:inline-flex;align-items:center;gap:8px;
  background:linear-gradient(90deg,var(--brand),var(--brand-2));
  border-radius:12px;padding:10px 16px;font-weight:600;
}
.btn:disabled{opacity:.6}
.input,select{
  width:100%;background:#0b1220;border:1px solid rgba(255,255,255,.1);
  border-radius:12px;padding:12px 14px;color:var(--text)
}
.label{display:block;margin:14px 0 6px;color:var(--muted);font-size:14px}
h1{font-size:36px;font-weight:800;letter-spacing:.2px}
h2{font-size:22px;font-weight:700}
.badge{font-size:12px;padding:6px 10px;border-radius:999px;background:rgba(16,185,129,.15);color:#86efac;}
