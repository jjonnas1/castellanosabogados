"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { buildMailtoUrl } from "@/lib/contactLinks";
import { getProfileRoleByUserId, type AppRole } from "@/lib/profile-role";
import { supabase } from "@/lib/supabase-browser";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import MigrationNav from '@/app/components/MigrationNav';

const PEOPLE_SLUGS = [
  "ejecucion-penas","penal-personas","familia","civil","laboral","administrativo",
];
const COMPANY_SLUGS = ["responsabilidad-penal-pj","capacitaciones-penal-pj"];
const MIGRATION_LABELS: Record<Language, { title: string; description: string; audience: string }> = {
  es: { title: 'Derecho migratorio', description: 'Visas, permanencia y residencia en Colombia.', audience: 'Personas extranjeras y familias' },
  en: { title: 'Immigration law', description: 'Visas, stay and residence in Colombia.', audience: 'Foreign nationals and families' },
  fr: { title: 'Droit de l’immigration', description: 'Visas, séjour et résidence en Colombie.', audience: 'Étrangers et familles' },
  it: { title: 'Diritto dell’immigrazione', description: 'Visti, soggiorno e residenza in Colombia.', audience: 'Stranieri e famiglie' },
};

type Language = "es"|"en"|"fr"|"it";
const LANG_LABELS:Record<Language,string>={es:"ES",en:"EN",fr:"FR",it:"IT"};
const LANG_NAMES:Record<Language,string>={es:"Español",en:"English",fr:"Français",it:"Italiano"};

const DOMICILIO_HREF="/abogado-a-domicilio";
const DOMICILIO_LABELS:Record<Language,string>={es:"A domicilio",en:"Home visits",fr:"À domicile",it:"A domicilio"};
const TRANSLATION_LABELS:Record<Language,string>={es:"Traducción legal",en:"Legal translation",fr:"Traduction juridique",it:"Traduzione legale"};
const MENU_LABELS:Record<Language,string>={es:"Menú",en:"Menu",fr:"Menu",it:"Menu"};
const CLOSE_LABELS:Record<Language,string>={es:"Cerrar",en:"Close",fr:"Fermer",it:"Chiudi"};

function SunIcon(){return(<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>);}
function MoonIcon(){return(<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function GlobeIcon(){return(<svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9M3 12h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>);}

function MegaMenuPanel({id,onClose,mailtoHref}:{id:string;onClose:()=>void;mailtoHref:string;}){
  const{t,language}=useLanguage();const h=t.header;
  const groups=[{label:h.forPeople,slugs:PEOPLE_SLUGS},{label:h.forCompanies,slugs:COMPANY_SLUGS}];
  return(
    <div id={id} role="region" aria-label="Menú de servicios" className="absolute left-1/2 top-full z-50 mt-2 w-[min(820px,calc(100vw_-_2.5rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_64px_rgba(13,21,40,.14)] dark:shadow-[0_24px_64px_rgba(0,0,0,.45)]">
      <div className="flex">
        <div className="flex-1 space-y-5 p-5">
          {groups.map((group)=>(<div key={group.label}>
            <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">{group.label}</p>
            <div className={group.slugs.length>=4?"grid grid-cols-2 gap-0.5":"grid grid-cols-1 gap-0.5"}>
              {group.slugs.map((slug)=>(<Link key={slug} href={`/servicios/${slug}`} onClick={onClose} className="group flex flex-col gap-0.5 rounded-xl px-3 py-2.5 transition hover:bg-canvas">
                <span className="text-[13px] font-semibold text-ink">{h.serviceNames[slug]}</span>
                <span className="text-[11px] leading-snug text-muted">{h.serviceDescs[slug]}</span>
                <span className="hidden text-[10px] font-medium text-accent-500 group-hover:block">{h.serviceFor[slug]}</span>
              </Link>))}
            </div>
          </div>))}
          {(() => { const m = MIGRATION_LABELS[language as Language] ?? MIGRATION_LABELS.es; return (
            <Link href="/visas-colombia" onClick={onClose} className="group flex items-center justify-between gap-3 rounded-xl bg-[#0f3d32]/[0.07] px-3 py-2.5 ring-1 ring-[#0f3d32]/20 transition hover:bg-[#0f3d32]/[0.12]">
              <span className="flex flex-col gap-0.5"><span className="text-[13px] font-semibold text-[#0f3d32]">{m.title}</span><span className="text-[11px] leading-snug text-muted">{m.description}</span><span className="hidden text-[10px] font-medium text-[#0f3d32] group-hover:block">{m.audience}</span></span><span className="shrink-0 text-[#0f3d32]" aria-hidden>↗</span>
            </Link>
          ); })()}
          <Link href={DOMICILIO_HREF} onClick={onClose} className="flex items-center justify-between gap-3 rounded-xl bg-[#7b1e2b]/[0.06] px-3 py-2.5 ring-1 ring-[#7b1e2b]/20 transition hover:bg-[#7b1e2b]/[0.11]">
            <span className="flex flex-col gap-0.5">
              <span className="flex items-center gap-2 text-[13px] font-semibold text-[#7b1e2b]">
                {DOMICILIO_LABELS[language as Language]}
                <span className="rounded-full bg-[#7b1e2b] px-1.5 py-[3px] text-[8px] font-bold uppercase leading-none tracking-wide text-white">Nuevo</span>
              </span>
              <span className="text-[11px] leading-snug text-muted">Enviamos tu abogado a la dirección que necesites.</span>
            </span>
            <span className="shrink-0 text-[#7b1e2b]" aria-hidden>→</span>
          </Link>

          <div className="border-t border-border px-2 pt-3">
            <p className="text-[12px] text-muted">{h.notFound}{" "}<a href={mailtoHref} onClick={onClose} className="font-semibold text-accent-500 underline underline-offset-2 hover:text-accent-700">{h.consultDirect}</a></p>
          </div>
        </div>
        <div className="flex w-[200px] shrink-0 flex-col gap-3 border-l border-border bg-panel p-5">
          <Link href="/tutela" onClick={onClose} className="flex flex-col gap-2 rounded-2xl bg-[#7b1e2b] p-4 text-white transition hover:bg-[#6a1624]">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">{h.featured}</span>
            <span className="font-heading text-base font-semibold leading-snug">{t.nav.tutelas}</span>
            <span className="text-[12px] leading-snug text-white/85">{h.tutelaDesc}</span>
            <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold text-white">{h.tutelaBadge}</span>
          </Link>
          <Link href="/cliente/login" onClick={onClose} className="block w-full rounded-xl border border-border bg-card px-3 py-2.5 text-center text-[13px] font-semibold text-ink transition hover:border-ink hover:bg-subtle">{h.clientArea}</Link>
        </div>
      </div>
    </div>
  );
}

function LangSwitcher(){
  const{language,setLanguage}=useLanguage();
  const[open,setOpen]=useState(false);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const handler=(e:MouseEvent)=>{if(!ref.current?.contains(e.target as Node))setOpen(false);};
    document.addEventListener("mousedown",handler);
    return()=>document.removeEventListener("mousedown",handler);
  },[]);
  return(
    <div ref={ref} className="relative">
      <button type="button" onClick={()=>setOpen(v=>!v)} className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-[12px] font-semibold text-muted transition hover:border-ink hover:text-ink" aria-label="Cambiar idioma">
        <GlobeIcon/>{LANG_LABELS[language as Language]}
        <svg className={`h-2.5 w-2.5 transition-transform ${open?"rotate-180":""}`} viewBox="0 0 10 6" fill="none" aria-hidden><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {open&&(
        <div className="absolute right-0 top-full z-50 mt-2 w-32 overflow-hidden rounded-xl border border-border bg-card shadow-soft">
          {(Object.keys(LANG_LABELS) as Language[]).map(l=>(
            <button key={l} type="button" onClick={()=>{setLanguage(l);setOpen(false);}} className={`flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] transition hover:bg-canvas ${language===l?"font-semibold text-ink":"text-muted"}`}>
              <span className="w-6 text-[11px] font-bold">{LANG_LABELS[l]}</span><span>{LANG_NAMES[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SiteHeader(){
  const pathname=usePathname();
  const router=useRouter();
  const megaMenuId=useId();
  const mobileServicesId=useId();
  const megaRef=useRef<HTMLDivElement>(null);
  const[open,setOpen]=useState(false);
  const[megaOpen,setMegaOpen]=useState(false);
  const[mobileServicesOpen,setMobileServicesOpen]=useState(false);
  const[role,setRole]=useState<AppRole>(null);
  const[loggedIn,setLoggedIn]=useState(false);
  const{resolvedTheme,setTheme}=useTheme();
  const{language,setLanguage,t}=useLanguage();
  const h=t.header;
  const isDark=resolvedTheme==="dark";
  const isActive=(href:string)=>pathname===href||(href!=="/"&&pathname?.startsWith(href));
  const isAnyServicePage=()=>!!pathname?.startsWith("/servicios");
  const isTranslationPage=()=>!!pathname?.startsWith("/servicios/traduccion-legal");
  const isServicesActive=()=>isAnyServicePage()&&!isTranslationPage();

  useEffect(()=>{
    const onClickOutside=(e:MouseEvent)=>{if(!megaRef.current?.contains(e.target as Node))setMegaOpen(false);};
    const onEscape=(e:KeyboardEvent)=>{if(e.key==="Escape"){setMegaOpen(false);setMobileServicesOpen(false);setOpen(false);}};
    document.addEventListener("mousedown",onClickOutside);
    document.addEventListener("keydown",onEscape);
    return()=>{document.removeEventListener("mousedown",onClickOutside);document.removeEventListener("keydown",onEscape);};
  },[]);

  useEffect(()=>{
    const load=async()=>{
      const{data}=await supabase.auth.getSession();
      const user=data.session?.user;
      if(!user){setLoggedIn(false);setRole(null);return;}
      setLoggedIn(true);
      setRole(await getProfileRoleByUserId(user.id));
    };
    load();
    const{data:sub}=supabase.auth.onAuthStateChange(load);
    return()=>sub.subscription.unsubscribe();
  },[]);

  useEffect(()=>{setMegaOpen(false);setOpen(false);setMobileServicesOpen(false);},[pathname]);

  const logout=async()=>{await supabase.auth.signOut();router.push("/login");};
  const panelHref=role==="admin"?"/admin":"/cliente";
  const mailtoHref=buildMailtoUrl({area:"Contacto general",source:"Header",subject:"Solicitud de evaluación",message:"Hola, quisiera solicitar una evaluación estratégica."});

  const HEADER_NAV=[
    {label:DOMICILIO_LABELS[language as Language],href:DOMICILIO_HREF},
    {label:"Derecho migratorio",href:"/visas-colombia"},
    {label:"Apps",href:"/apps"},
    {label:t.nav.blog,href:"/blog"},
    {label:t.nav.about,href:"/nosotros"},
    {label:t.nav.contact,href:"/contacto"},
  ];

  return(
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/95 backdrop-blur-md dark:bg-canvas/95">
      <div className="container flex h-16 max-w-[1480px] items-center justify-between gap-5">

        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="Castellanos Abogados — Inicio">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink transition group-hover:bg-accent-700">
            <svg viewBox="0 0 512 512" className="h-[18px] w-[18px]" aria-hidden fill="none">
              <path d="M128 176h256v24H128zm42 72h172v24H170z" fill="white"/>
              <circle cx="256" cy="128" r="52" stroke="white" strokeWidth="24" fill="none"/>
              <path d="M158 312h196l28 72H130z" fill="rgba(255,255,255,0.55)"/>
            </svg>
          </div>
          <span className="font-heading text-[17px] font-semibold tracking-tight text-ink">
            Castellanos<span className="hidden min-[390px]:inline"> Abogados</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-4 text-[13px] font-medium text-muted xl:flex 2xl:gap-6" aria-label="Navegación principal">
          <div className="relative" ref={megaRef}>
            <button type="button" aria-expanded={megaOpen} aria-controls={megaMenuId} aria-haspopup="true" onClick={()=>setMegaOpen(v=>!v)} className={`inline-flex h-10 items-center gap-1.5 whitespace-nowrap border-b-2 px-0.5 text-[13px] font-medium transition-colors hover:border-ink/30 hover:text-ink ${isServicesActive()?"border-[#7b1e2b] text-ink":"border-transparent"}`}>
              {t.nav.services}
              <svg className={`h-3 w-3 transition-transform ${megaOpen?"rotate-180":""}`} viewBox="0 0 12 8" fill="none" aria-hidden><path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {megaOpen&&<MegaMenuPanel id={megaMenuId} onClose={()=>setMegaOpen(false)} mailtoHref={mailtoHref}/>}
          </div>

          {HEADER_NAV.map(item=>(
            item.href==='/visas-colombia' ? <MigrationNav key={item.href}/> :
            item.href==='/apps' ? <Link key={item.href} href={item.href} className={`inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#c4a46a]/70 bg-[#182842] px-3 text-[13px] font-semibold text-[#f3d8a4] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#263b5d] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b68b42] ${isActive(item.href)?"ring-2 ring-[#c4a46a]/50 ring-offset-2":""}`}><span className="text-[10px]" aria-hidden>✦</span>{item.label}</Link> :
            <Link key={item.href} href={item.href} className={`inline-flex h-10 items-center whitespace-nowrap border-b-2 px-0.5 text-[13px] font-medium transition-colors hover:border-ink/30 hover:text-ink ${isActive(item.href)?"border-[#7b1e2b] text-ink":"border-transparent"}`}>{item.label}</Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <LangSwitcher/>
          {loggedIn?(
            <>
              <Link href={panelHref} className="inline-flex h-9 w-36 items-center justify-center rounded-full bg-ink text-[13px] font-semibold text-white transition hover:bg-ink/85">{role==="admin"?h.adminPanel:h.clientArea}</Link>
              <button type="button" onClick={logout} className="inline-flex h-9 w-36 items-center justify-center rounded-full border border-border text-[13px] font-semibold text-ink transition hover:border-ink">{h.logout}</button>
            </>
          ):(
            <Link href="/cliente/login" className="inline-flex h-9 items-center justify-center rounded-full bg-ink px-5 text-[13px] font-semibold text-white transition hover:bg-ink/85">{h.clientArea}</Link>
          )}
          <button type="button" onClick={()=>setTheme(isDark?"light":"dark")} aria-label={isDark?h.lightMode:h.darkMode} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition hover:border-ink hover:text-ink">
            {isDark?<SunIcon/>:<MoonIcon/>}
          </button>
        </div>

        <button type="button" onClick={()=>{const next=!open;setOpen(next);setMegaOpen(false);setMobileServicesOpen(next&&isAnyServicePage());}} aria-label={open?t.common.closeMenu:t.common.openMenu} aria-expanded={open} className="flex h-10 shrink-0 items-center gap-2 rounded-md border border-border bg-card px-3 text-ink transition hover:border-ink hover:shadow-soft xl:hidden">
          <span className="text-[12px] font-bold">{open?CLOSE_LABELS[language as Language]:MENU_LABELS[language as Language]}</span>
          <div className="flex h-3 w-[18px] flex-col justify-between" aria-hidden>
            <span className={`block h-px bg-ink transition ${open?"translate-y-[5.5px] rotate-45":"w-[18px]"}`}/>
            <span className={`block h-px w-[18px] bg-ink transition ${open?"opacity-0":"opacity-100"}`}/>
            <span className={`block h-px bg-ink transition ${open?"-translate-y-[5.5px] -rotate-45":"w-[18px]"}`}/>
          </div>
        </button>
      </div>

      {/* ── Mobile secondary bar: dark mode + lang switcher always visible ── */}
      <div className="flex items-center gap-2 border-t border-border/50 bg-surface/70 px-3 py-2 backdrop-blur-sm dark:bg-canvas/80 xl:hidden">
        <button type="button" onClick={()=>setTheme(isDark?"light":"dark")} aria-label={isDark?h.lightMode:h.darkMode} className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card px-2 py-2 text-[12px] font-semibold text-ink shadow-soft/20 transition hover:bg-subtle">
          {isDark?<SunIcon/>:<MoonIcon/>}
          <span className="hidden text-ink min-[355px]:inline">{isDark?h.lightMode:h.darkMode}</span>
        </button>
        <div className="flex overflow-hidden rounded-lg border border-border shadow-soft/20">
          {(Object.keys(LANG_LABELS) as Language[]).map(l=>(
            <button key={l} type="button" onClick={()=>setLanguage(l)} className={`px-2.5 py-2 text-[12px] font-bold transition min-[390px]:px-3 ${language===l?"bg-ink text-white dark:bg-accent-500":"bg-card text-muted hover:bg-subtle hover:text-ink"}`}>
              {LANG_LABELS[l]}
            </button>
          ))}
        </div>
      </div>

      {open&&(
        <div className="border-t border-border/60 bg-white/98 backdrop-blur-md dark:bg-canvas/97 xl:hidden">
          <div className="container flex flex-col gap-1 py-4">
            <button type="button" onClick={()=>setMobileServicesOpen(v=>!v)} aria-expanded={mobileServicesOpen} aria-controls={mobileServicesId} className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-sm font-medium text-muted transition hover:bg-subtle hover:text-ink">
              <span className={isAnyServicePage()?"text-ink":""}>{t.nav.services}</span>
              <svg className={`h-3 w-3 transition-transform ${mobileServicesOpen?"rotate-180":""}`} viewBox="0 0 12 8" fill="none" aria-hidden><path d="M1 1.5 6 6.5 11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            {mobileServicesOpen&&(
              <div id={mobileServicesId} className="ml-3 flex flex-col gap-3 border-l border-border pl-3">
                {[{label:h.forPeople,slugs:PEOPLE_SLUGS},{label:h.forCompanies,slugs:COMPANY_SLUGS}].map(group=>(
                  <div key={group.label}>
                    <p className="mb-1 px-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">{group.label}</p>
                    {group.slugs.map(slug=>(
                      <Link key={slug} href={`/servicios/${slug}`} onClick={()=>{setOpen(false);setMobileServicesOpen(false);}} className={`block rounded-xl px-3 py-3 text-sm transition hover:bg-subtle hover:text-ink ${isActive(`/servicios/${slug}`)?"bg-subtle text-ink":"text-muted"}`}>{h.serviceNames[slug]}</Link>
                    ))}
                  </div>
                ))}
                <Link href="/tutela" onClick={()=>{setOpen(false);setMobileServicesOpen(false);}} className={`rounded-xl px-3 py-3 text-sm font-semibold transition hover:bg-subtle hover:text-ink ${isActive('/tutela')?"bg-subtle text-ink":"text-muted"}`}>{t.nav.tutelas}</Link>
                <Link href="/visas-colombia" onClick={()=>{setOpen(false);setMobileServicesOpen(false);}} className="rounded-xl bg-[#0f3d32]/[0.07] px-3 py-3 text-sm font-semibold text-[#0f3d32]">{(MIGRATION_LABELS[language as Language] ?? MIGRATION_LABELS.es).title}</Link>
              </div>
            )}

            {HEADER_NAV.map(item=>(
              item.href==='/visas-colombia' ? <MigrationNav key={item.href} mobile onNavigate={()=>setOpen(false)}/> :
              item.href==='/apps' ? <Link key={item.href} href={item.href} onClick={()=>setOpen(false)} className="flex items-center gap-2 rounded-xl border border-[#c4a46a]/60 bg-[#182842] px-3 py-3.5 text-sm font-semibold text-[#f3d8a4] shadow-sm"><span aria-hidden>✦</span>{item.label}</Link> :
              <Link key={item.href} href={item.href} onClick={()=>setOpen(false)} className={`rounded-xl px-3 py-3.5 text-sm font-medium transition hover:bg-subtle hover:text-ink ${isActive(item.href)?"bg-subtle text-ink":"text-muted"}`}>{item.label}</Link>
            ))}

            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              {loggedIn?(
                <>
                  <Link href={panelHref} onClick={()=>setOpen(false)} className="rounded-xl bg-ink px-4 py-3.5 text-center text-sm font-semibold text-white">{role==="admin"?h.adminPanel:h.clientArea}</Link>
                  <button type="button" onClick={async()=>{setOpen(false);await logout();}} className="rounded-xl border border-border px-4 py-3.5 text-sm font-semibold text-muted text-center">{h.logout}</button>
                </>
              ):(
                <Link href="/cliente/login" onClick={()=>setOpen(false)} className="rounded-xl bg-ink px-4 py-3.5 text-center text-sm font-semibold text-white">{h.clientArea}</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
