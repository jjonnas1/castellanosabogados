export type Lang = 'es' | 'en' | 'fr' | 'it'

export const LANG_LABELS: Record<Lang, string> = {
  es: 'ES',
  en: 'EN',
  fr: 'FR',
  it: 'IT',
}

export const LANG_NAMES: Record<Lang, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  it: 'Italiano',
}

type UI = {
  nav: {
    services: string
    tutelas: string
    methodology: string
    blog: string
    about: string
    contact: string
  }
  mega: {
    forPeople: string
    forCompanies: string
    notFound: string
    consultDirect: string
    featured: string
    tutelaDesc: string
    tutelaBadge: string
    clientArea: string
    serviceNames: Record<string, string>
    serviceDescs: Record<string, string>
    serviceFor: Record<string, string>
  }
  auth: {
    clientArea: string
    adminPanel: string
    logout: string
  }
  footer: {
    tagline: string
    motto: string
    services: string
    contact: string
    rights: string
  }
  mobile: {
    openMenu: string
    closeMenu: string
  }
}

export const translations: Record<Lang, UI> = {
  es: {
    nav: {
      services: 'Servicios',
      tutelas: 'Tutelas',
      methodology: 'Metodología',
      blog: 'Blog',
      about: 'Nosotros',
      contact: 'Contacto',
    },
    mega: {
      forPeople: 'Para personas',
      forCompanies: 'Para empresas',
      notFound: '¿No encuentra su área?',
      consultDirect: 'Consultar directamente →',
      featured: 'Destacado',
      tutelaDesc: 'Protección de derechos ante EPS, entidades públicas y privadas.',
      tutelaBadge: '⚡ Fallo en 10 días hábiles',
      clientArea: 'Área cliente',
      serviceNames: {
        'penal-personas': 'Penal Personas',
        'ejecucion-penas': 'Ejecución de Penas',
        civil: 'Civil',
        familia: 'Familia',
        laboral: 'Laboral',
        administrativo: 'Administrativo',
        'responsabilidad-penal-pj': 'Responsabilidad Penal PJ',
        'capacitaciones-penal-pj': 'Capacitaciones Penal PJ',
      },
      serviceDescs: {
        'penal-personas': 'Defensa e investigación penal para personas naturales.',
        'ejecucion-penas': 'Redenciones, prisión domiciliaria y libertad condicional.',
        civil: 'Conflictos patrimoniales, contratos y obligaciones.',
        familia: 'Custodia, alimentos, divorcio y protección familiar.',
        laboral: 'Defensa en controversias laborales y prestaciones sociales.',
        administrativo: 'Recursos ante entidades públicas y jurisdicción contenciosa.',
        'responsabilidad-penal-pj': 'Prevención y defensa penal para personas jurídicas y juntas.',
        'capacitaciones-penal-pj': 'Formación en prevención y trazabilidad penal corporativa.',
      },
      serviceFor: {
        'penal-personas': 'Personas imputadas o investigadas',
        'ejecucion-penas': 'Personas privadas de la libertad',
        civil: 'Personas y familias',
        familia: 'Familias en conflicto',
        laboral: 'Trabajadores y empleadores',
        administrativo: 'Ciudadanos y empresas',
        'responsabilidad-penal-pj': 'Empresas y directivos',
        'capacitaciones-penal-pj': 'Comités de cumplimiento y órganos de control',
      },
    },
    auth: {
      clientArea: 'Área cliente',
      adminPanel: 'Panel admin',
      logout: 'Cerrar sesión',
    },
    footer: {
      tagline: 'Firma · Asesoría jurídica estratégica integral',
      motto: 'Criterio · Control · Tranquilidad',
      services: 'Servicios',
      contact: 'Contacto',
      rights: 'Todos los derechos reservados.',
    },
    mobile: {
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
  },

  en: {
    nav: {
      services: 'Services',
      tutelas: 'Writs',
      methodology: 'Methodology',
      blog: 'Blog',
      about: 'About',
      contact: 'Contact',
    },
    mega: {
      forPeople: 'For individuals',
      forCompanies: 'For businesses',
      notFound: "Can't find your area?",
      consultDirect: 'Consult directly →',
      featured: 'Featured',
      tutelaDesc: 'Rights protection before health insurers, public and private entities.',
      tutelaBadge: '⚡ Ruling in 10 business days',
      clientArea: 'Client area',
      serviceNames: {
        'penal-personas': 'Criminal Law',
        'ejecucion-penas': 'Sentence Execution',
        civil: 'Civil Law',
        familia: 'Family Law',
        laboral: 'Labor Law',
        administrativo: 'Administrative Law',
        'responsabilidad-penal-pj': 'Corporate Criminal Liability',
        'capacitaciones-penal-pj': 'Corporate Criminal Training',
      },
      serviceDescs: {
        'penal-personas': 'Criminal defense and investigation for individuals.',
        'ejecucion-penas': 'Sentence reductions, house arrest and conditional release.',
        civil: 'Asset disputes, contracts and obligations.',
        familia: 'Custody, alimony, divorce and family protection.',
        laboral: 'Defense in labor disputes and social benefits.',
        administrativo: 'Appeals before public entities and administrative courts.',
        'responsabilidad-penal-pj': 'Criminal prevention and defense for legal entities.',
        'capacitaciones-penal-pj': 'Training in corporate criminal prevention and traceability.',
      },
      serviceFor: {
        'penal-personas': 'Charged or investigated individuals',
        'ejecucion-penas': 'Incarcerated persons',
        civil: 'Individuals and families',
        familia: 'Families in conflict',
        laboral: 'Workers and employers',
        administrativo: 'Citizens and companies',
        'responsabilidad-penal-pj': 'Companies and executives',
        'capacitaciones-penal-pj': 'Compliance committees and oversight bodies',
      },
    },
    auth: {
      clientArea: 'Client area',
      adminPanel: 'Admin panel',
      logout: 'Log out',
    },
    footer: {
      tagline: 'Firm · Comprehensive strategic legal counsel',
      motto: 'Criteria · Control · Peace of mind',
      services: 'Services',
      contact: 'Contact',
      rights: 'All rights reserved.',
    },
    mobile: {
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
  },

  fr: {
    nav: {
      services: 'Services',
      tutelas: 'Tutelles',
      methodology: 'Méthodologie',
      blog: 'Blog',
      about: 'À propos',
      contact: 'Contact',
    },
    mega: {
      forPeople: 'Pour les particuliers',
      forCompanies: 'Pour les entreprises',
      notFound: 'Vous ne trouvez pas votre domaine ?',
      consultDirect: 'Consulter directement →',
      featured: 'En vedette',
      tutelaDesc: 'Protection des droits devant les organismes publics et privés.',
      tutelaBadge: '⚡ Décision en 10 jours ouvrables',
      clientArea: 'Espace client',
      serviceNames: {
        'penal-personas': 'Droit Pénal',
        'ejecucion-penas': 'Exécution des Peines',
        civil: 'Droit Civil',
        familia: 'Droit de la Famille',
        laboral: 'Droit du Travail',
        administrativo: 'Droit Administratif',
        'responsabilidad-penal-pj': 'Responsabilité Pénale des PJ',
        'capacitaciones-penal-pj': 'Formations Pénales Entreprises',
      },
      serviceDescs: {
        'penal-personas': 'Défense et enquête pénale pour les particuliers.',
        'ejecucion-penas': 'Réductions de peine, assignation à résidence et liberté conditionnelle.',
        civil: 'Litiges patrimoniaux, contrats et obligations.',
        familia: 'Garde, pension alimentaire, divorce et protection familiale.',
        laboral: 'Défense dans les litiges du travail et prestations sociales.',
        administrativo: "Recours devant les entités publiques et la juridiction administrative.",
        'responsabilidad-penal-pj': 'Prévention et défense pénale pour personnes morales.',
        'capacitaciones-penal-pj': "Formation en prévention et traçabilité pénale d'entreprise.",
      },
      serviceFor: {
        'penal-personas': 'Personnes poursuivies ou sous enquête',
        'ejecucion-penas': 'Personnes incarcérées',
        civil: 'Particuliers et familles',
        familia: 'Familles en conflit',
        laboral: 'Travailleurs et employeurs',
        administrativo: 'Citoyens et entreprises',
        'responsabilidad-penal-pj': 'Entreprises et dirigeants',
        'capacitaciones-penal-pj': 'Comités de conformité et organes de contrôle',
      },
    },
    auth: {
      clientArea: 'Espace client',
      adminPanel: 'Panel admin',
      logout: 'Se déconnecter',
    },
    footer: {
      tagline: 'Cabinet · Conseil juridique stratégique global',
      motto: 'Critères · Contrôle · Tranquillité',
      services: 'Services',
      contact: 'Contact',
      rights: 'Tous droits réservés.',
    },
    mobile: {
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
    },
  },

  it: {
    nav: {
      services: 'Servizi',
      tutelas: 'Ricorsi',
      methodology: 'Metodologia',
      blog: 'Blog',
      about: 'Chi siamo',
      contact: 'Contatto',
    },
    mega: {
      forPeople: 'Per le persone',
      forCompanies: 'Per le aziende',
      notFound: 'Non trova la sua area?',
      consultDirect: 'Consulta direttamente →',
      featured: 'In evidenza',
      tutelaDesc: 'Tutela dei diritti davanti a enti pubblici e privati.',
      tutelaBadge: '⚡ Sentenza in 10 giorni lavorativi',
      clientArea: 'Area clienti',
      serviceNames: {
        'penal-personas': 'Diritto Penale',
        'ejecucion-penas': 'Esecuzione della Pena',
        civil: 'Diritto Civile',
        familia: 'Diritto di Famiglia',
        laboral: 'Diritto del Lavoro',
        administrativo: 'Diritto Amministrativo',
        'responsabilidad-penal-pj': 'Responsabilità Penale PG',
        'capacitaciones-penal-pj': 'Formazioni Penali Aziende',
      },
      serviceDescs: {
        'penal-personas': 'Difesa e indagine penale per persone fisiche.',
        'ejecucion-penas': 'Riduzioni di pena, arresti domiciliari e libertà condizionale.',
        civil: 'Controversie patrimoniali, contratti e obbligazioni.',
        familia: 'Affido, alimenti, divorzio e protezione familiare.',
        laboral: 'Difesa in controversie di lavoro e prestazioni sociali.',
        administrativo: 'Ricorsi davanti a enti pubblici e giurisdizione amministrativa.',
        'responsabilidad-penal-pj': 'Prevenzione e difesa penale per persone giuridiche.',
        'capacitaciones-penal-pj': 'Formazione in prevenzione e tracciabilità penale aziendale.',
      },
      serviceFor: {
        'penal-personas': 'Persone imputate o indagate',
        'ejecucion-penas': 'Persone private della libertà',
        civil: 'Persone e famiglie',
        familia: 'Famiglie in conflitto',
        laboral: 'Lavoratori e datori di lavoro',
        administrativo: 'Cittadini e aziende',
        'responsabilidad-penal-pj': 'Aziende e dirigenti',
        'capacitaciones-penal-pj': 'Comitati di conformità e organi di controllo',
      },
    },
    auth: {
      clientArea: 'Area clienti',
      adminPanel: 'Pannello admin',
      logout: 'Esci',
    },
    footer: {
      tagline: 'Studio · Consulenza legale strategica integrale',
      motto: 'Criterio · Controllo · Tranquillità',
      services: 'Servizi',
      contact: 'Contatto',
      rights: 'Tutti i diritti riservati.',
    },
    mobile: {
      openMenu: 'Apri menu',
      closeMenu: 'Chiudi menu',
    },
  },
}
