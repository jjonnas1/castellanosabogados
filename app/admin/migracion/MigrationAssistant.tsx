'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CircleHelp, Download, Globe2, LoaderCircle, RotateCcw, ShieldCheck, X } from 'lucide-react';
import AdminShell from '@/components/AdminShell';
import { useAdminAuth } from '@/contexts/admin-auth';
import type { MigrationAnswers, MigrationResponse } from '@/lib/migration-types';
import styles from './migration.module.css';

function reportText(data: MigrationResponse, notes: string): string {
  const r = data.result;
  if(!r) return '';
  return ['CASTELLANOS ABOGADOS — EVALUACIÓN MIGRATORIA', `Reglas revisadas: ${data.version}`, `Fecha de entrevista: ${new Date().toLocaleDateString('es-CO')}`, '', r.title, r.summary,
    ...[['Alertas prioritarias',r.alerts],['Verificaciones pendientes',r.missing],['Ruta de trabajo',r.steps],['Documentos para revisar',r.documents],['Alternativas',r.alternatives]].flatMap(([title,items])=>[String(title),...(items as string[]).map((x,i)=>`${i+1}. ${x}`),'']),
    'AUTORIDAD Y CANAL',r.authority,'','ALCANCE Y RESTRICCIONES',r.limits,'','RESPUESTAS',...data.history.map(x=>`${x.question}\n${x.answer}`),'','NOTAS DEL ABOGADO',notes || 'Sin notas.','','FUENTES',...r.sources.map(x=>`${x.label}\n${x.url}`),
  ].join('\n');
}

export default function MigrationAssistant() {
  const { token } = useAdminAuth();
  const [answers,setAnswers] = useState<MigrationAnswers>({});
  const [data,setData] = useState<MigrationResponse|null>(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState('');
  const [notes,setNotes] = useState('');
  const [retry,setRetry] = useState(0);
  const questionRef = useRef<HTMLHeadingElement>(null);
  useEffect(()=>{
    if(!token) { setLoading(false); return; }
    const controller = new AbortController();
    setLoading(true);setError('');
    fetch('/api/admin/migracion',{method:'POST',headers:{'Content-Type':'application/json',authorization:`Bearer ${token}`},body:JSON.stringify({answers}),signal:controller.signal,cache:'no-store'})
      .then(async res=>{const json=await res.json();if(!res.ok)throw new Error(res.status===403?'Esta herramienta requiere una cuenta administradora.':res.status===401?'La sesión venció. Vuelva a iniciar sesión.':json.error||'No fue posible cargar la ruta.');return json as MigrationResponse;})
      .then(value=>{setData(value);setLoading(false);})
      .catch(e=>{if(e.name!=='AbortError'){setError(e.message);setLoading(false);}});
    return()=>controller.abort();
  },[answers,token,retry]);
  useEffect(()=>{if(data&&!loading)questionRef.current?.focus();},[data,loading]);
  function goBack(index: number) {
    const next:MigrationAnswers={};data?.history.slice(0,index).forEach(x=>{next[x.id]=x.value;});setAnswers(next);
  }
  function download() {
    if(!data?.result)return;
    const blob=new Blob(['\uFEFF'+reportText(data,notes)],{type:'text/plain;charset=utf-8'});
    const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=`Ruta-migratoria-${new Date().toISOString().slice(0,10)}.txt`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  const r=data?.result;
  return <AdminShell><div className={styles.app}>
    <div className={styles.top}><div><p className={styles.eyebrow}>Herramientas del despacho</p><h1><Globe2 size={30}/> Asistente migratorio</h1><p>Entreviste al cliente y marque sus respuestas. La ruta se construye con cada decisión.</p></div><span className={styles.private}><ShieldCheck size={15}/> Uso del abogado</span></div>
    <div className={styles.grid}>
      <aside className={styles.history}><h2>Su entrevista</h2><p>{data?.history.length||0} respuestas registradas</p>
        {data?.history.length ? <ol>{data.history.map((item,i)=><li key={item.id}><button disabled={loading} onClick={()=>goBack(i)} title="Volver a esta pregunta y revisar las respuestas siguientes"><span>{String(i+1).padStart(2,'0')}</span><div><strong>{item.answer}</strong><small>{item.question}</small></div></button></li>)}</ol>:<div className={styles.historyEmpty}><CircleHelp size={24}/><span>Las respuestas aparecerán aquí. Podrá volver a cualquier pregunta.</span></div>}
        <p className={styles.sessionNote}>Las respuestas no se guardan automáticamente. Descargue el resumen al finalizar.</p>
      </aside>
      <div className={styles.content}>
        {error?<div className={styles.error} role="alert"><h2>No se pudo cargar la entrevista</h2><p>{error}</p><button onClick={()=>setRetry(x=>x+1)}>Reintentar</button></div>:!token?<div className={styles.question}><h2>Esperando su sesión administrativa</h2><p>Si la sesión no se carga, vuelva a iniciar sesión desde el acceso administrativo.</p><a href="/admin/login">Iniciar sesión</a></div>:loading?<div className={styles.loading} role="status"><LoaderCircle className={styles.spinner} size={28}/><span>Preparando la siguiente pregunta…</span></div>:data?.question?<section className={styles.question}>
          <div className={styles.questionTop}><span>{data.question.section}</span><span>Pregunta {data.history.length+1}</span></div>
          <h2 ref={questionRef} tabIndex={-1}>{data.question.title}</h2><p>{data.question.help}</p>
          <div className={styles.options}>{data.question.options.map(option=><button key={option.value} onClick={()=>setAnswers(prev=>({...prev,[data.question!.id]:option.value}))}>
            <span className={styles.optionIcon}>{option.value==='yes'?<Check size={19}/>:option.value==='no'?<X size={19}/>:option.value==='unknown'?<CircleHelp size={19}/>:<ArrowRight size={18}/>}</span><span>{option.label}</span><ArrowRight className={styles.optionArrow} size={16}/>
          </button>)}</div>
          <div className={styles.questionFooter}><button disabled={!data.history.length} onClick={()=>goBack(data.history.length-1)}><ArrowLeft size={15}/> Anterior</button>{data.question.source&&<a href={data.question.source} target="_blank" rel="noopener noreferrer">Consultar norma oficial ↗</a>}</div>
        </section>:r&&data?<article className={styles.report}>
          <div className={styles.resultHeader}><span className={r.status==='priority'?styles.priority:r.status==='pending'?styles.pending:styles.ready}>{r.status==='priority'?'Revisión prioritaria':r.status==='pending'?'Faltan verificaciones':'Ruta para revisión documental'}</span><h2 ref={questionRef} tabIndex={-1}>{r.title}</h2><p>{r.summary}</p></div>
          {r.alerts.length>0&&<section className={styles.alerts}><h3>Atienda esto primero</h3><ul>{r.alerts.map(x=><li key={x}>{x}</li>)}</ul></section>}
          {r.missing.length>0&&<section className={styles.block}><h3>Lo que falta por confirmar</h3><ul>{r.missing.map(x=><li key={x}>{x}</li>)}</ul></section>}
          <section className={styles.block}><h3>Ruta de trabajo</h3><ol>{r.steps.map(x=><li key={x}>{x}</li>)}</ol></section>
          <section className={styles.block}><h3>Documentos para revisar</h3><ul>{r.documents.map(x=><li key={x}>{x}</li>)}</ul></section>
          <section className={styles.block}><h3>Dónde se tramita</h3><p>{r.authority}</p><h3>Alcance y restricciones</h3><p>{r.limits}</p></section>
          {r.alternatives.length>0&&<section className={styles.block}><h3>Opciones que conviene comparar</h3><ul>{r.alternatives.map(x=><li key={x}>{x}</li>)}</ul></section>}
          <section className={styles.block}><label htmlFor="migration-notes">Notas del abogado</label><textarea id="migration-notes" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Fechas exactas, documentos pendientes y alcance propuesto…" rows={4}/><p className={styles.note}>Las notas permanecen en esta pestaña y se incluyen en la descarga. No se envían al servidor.</p></section>
          <section className={styles.sources}><h3>Fuentes para contrastar el caso</h3>{r.sources.map(x=><a key={x.url} href={x.url} target="_blank" rel="noopener noreferrer">{x.label} ↗</a>)}<p>Reglas revisadas: {data.version}. Compruebe vigencia normativa y documentos antes de radicar.</p></section>
          <div className={styles.actions}><button onClick={download}><Download size={17}/> Descargar resumen</button><button onClick={()=>{setAnswers({});setNotes('');setData(null);}}><RotateCcw size={16}/> Nueva entrevista</button></div>
        </article>:null}
      </div>
    </div>
  </div></AdminShell>;
}
