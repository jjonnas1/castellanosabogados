return (
  <div className="card" style={{maxWidth:720, margin:"0 auto"}}>
    <h2 style={{marginBottom:8}}>Agenda tu asesoría</h2>
    <p style={{color:"var(--muted)",marginBottom:16}}>
      Selecciona un horario disponible (L–V, 8:00–18:00).
    </p>

    <form onSubmit={submit} style={{display:"grid",gap:12}}>
      <label className="label">Tu correo</label>
      <input className="input" type="email" ... />

      <label className="label">Tema / Área</label>
      <select className="input" ...>...</select>

      <label className="label">Horarios disponibles</label>
      <select className="input" ...>{/* opciones */}</select>

      <button className="btn" type="submit" disabled={loading || !selectedISO}>
        {loading ? 'Enviando…' : 'Enviar solicitud'}
      </button>
    </form>

    {message && <p style={{marginTop:12,color: message.startsWith('✅') ? 'var(--acc)' : '#fda4af'}}>
      {message}
    </p>}
  </div>
);

