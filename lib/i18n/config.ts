export const supportedLocales = ["es", "en"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = "es";

export type Dictionary = {
  navigation: {
    home: string;
    business: string;
    people: string;
    services: string;
    contact: string;
    advisory: string;
    register: string;
    login: string;
    about: string;
    signIn: string;
    peopleAdvisory: string;
    language: string;
  };
  common: {
    language: string;
    viewMore: string;
    backHome: string;
    loading: string;
    spanish: string;
    english: string;
  };
  home: {
    hero: {
      badges: string[];
      title: string;
      paragraph1: string;
      paragraph2: string;
      ctaPrimary: string;
      ctaSecondary: string;
      highlights: { label: string; value: string }[];
      model: {
        badge: string;
        title: string;
        badgeSecondary: string;
        items: string[];
        tags: string[];
      };
    };
    businessFocus: {
      pill: string;
      title: string;
      paragraphs: string[];
      cards: { title: string; body: string }[];
      noteLabel: string;
      noteText: string;
    };
    businessPanel: {
      badges: string[];
      title: string;
      paragraphs: string[];
      cards: { title: string; body: string }[];
      ctas: { label: string; href: string }[];
    };
    serviceAreas: {
      pill: string;
      title: string;
      description: string;
      noteLabel: string;
      noteText: string;
      cta: string;
      statusActive: string;
      statusInquiry: string;
      advisoryCta: string;
      contactCta: string;
      trainingCta: string;
      advisoryTitle: string;
      advisoryDescription: string;
      advisoryItems: string[];
      advisoryNote: string;
      agendaTitle: string;
      agendaDescription: string;
      agendaItems: string[];
      agendaNote: string;
      trainingTitle: string;
      trainingDescription: string;
      trainingItems: string[];
    };
    peopleLine: {
      title: string;
      paragraphs: string[];
      cards: { title: string; body: string }[];
    };
    methodology: {
      pill: string;
      title: string;
      pillars: { title: string; body: string }[];
      steps: { title: string; body: string }[];
    };
    motivations: {
      title: string;
      items: { title: string; body: string }[];
    };
    deliveries: {
      title: string;
      items: { title: string; body: string }[];
    };
    scenarios: {
      title: string;
      items: { title: string; body: string }[];
    };
  };
  business: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      items: string[];
      ctaPrimary: string;
      ctaSecondary: string;
    };
    services: {
      title: string;
      intro: string;
      blocks: { title: string; body: string }[];
      trainingTitle: string;
      trainingDescription: string;
      trainingModes: string[];
      trainingCta: string;
      trainingNote: string;
    };
    process: {
      title: string;
      description: string;
      steps: { title: string; body: string }[];
    };
  };
  people: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      items: string[];
      ctaPrimary: string;
      ctaSecondary: string;
    };
    flow: {
      title: string;
      description: string;
      steps: { title: string; body: string }[];
      notes: string[];
    };
    expectations: {
      title: string;
      items: { title: string; body: string }[];
    };
  };
  about: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
    };
    founder: {
      title: string;
      role: string;
      paragraphs: string[];
      bullets: string[];
      cta: string;
    };
    values: {
      title: string;
      items: { title: string; body: string }[];
    };
  };
  contact: {
    hero: {
      title: string;
      description: string;
    };
    form: {
      title: string;
      description: string;
      fields: {
        name: string;
        email: string;
        phone: string;
        message: string;
        submit: string;
      };
    };
    info: {
      title: string;
      items: string[];
    };
  };
  servicesPage: {
    hero: { title: string; description: string; cta: string };
    sections: { title: string; body: string }[];
  };
  forms: {
    email: string;
    password: string;
    confirmPassword: string;
    submit: string;
  };
  auth: {
    login: {
      title: string;
      description: string;
      submit: string;
      cta: string;
      error: string;
    };
    register: {
      title: string;
      description: string;
      submit: string;
      lawyerCta: string;
    };
  };
};

export const dictionaries: Record<SupportedLocale, Dictionary> = {
  es: {
    navigation: {
      home: "Inicio",
      business: "Penal/Empresas",
      people: "Penal/Personas",
      services: "Servicios",
      contact: "Contacto",
      advisory: "Asesoría",
      register: "Registrarse",
      login: "Log in",
      about: "Acerca de nosotros",
      signIn: "Iniciar sesión",
      peopleAdvisory: "Asesoría a personas",
      language: "Idioma",
    },
    common: {
      language: "Idioma",
      viewMore: "Ver más",
      backHome: "Volver al inicio",
      loading: "Cargando",
      spanish: "Español",
      english: "Inglés",
    },
    home: {
      hero: {
        badges: [
          "Estrategia penal en contratación estatal",
          "Comités · Juntas · Decisiones críticas",
        ],
        title: "Control penal para decisiones sensibles y juntas que no admiten improvisación",
        paragraph1:
          "Proveemos acompañamiento ejecutivo para líderes que requieren criterio inmediato, documentación impecable y activación táctica sin ruido.",
        paragraph2:
          "Cada decisión se aborda con gestión de riesgo penal, trazabilidad y soporte documental que permite justificar el criterio adoptado ante auditorías, entes de control y órganos internos de gobierno. Sin promesas de resultado, dejamos rastro de control y límites operativos claros.",
        ctaPrimary: "Solicitar evaluación estratégica",
        ctaSecondary: "Ver cómo trabajamos",
        highlights: [
          { label: "Ámbito", value: "Contratación estatal, gobierno corporativo, órganos de control." },
          { label: "Enfoque", value: "Prevención penal, controles operativos, reacción táctica." },
          { label: "Ritmo", value: "Sesiones cortas, entregables ejecutivos, decisiones trazables." },
          { label: "Control", value: "Trazabilidad completa: actas, minutas, decisiones justificadas." },
        ],
        model: {
          badge: "Modelo",
          title: "Documento de acompañamiento estratégico",
          badgeSecondary: "Confidencial",
          items: [
            "Decisiones sensibles con exposición penal inmediata.",
            "Mapas de riesgo y reglas de actuación listos para junta.",
            "Activación táctica ante incidentes con contención y coordinación.",
          ],
          tags: ["Diagnóstico", "Protocolos", "Activación"],
        },
      },
      businessFocus: {
        pill: "Riesgo penal empresarial",
        title: "Penal para empresas: contratación estatal y gobierno corporativo",
        paragraphs: [
          "Nuestro foco exclusivo es la prevención y el control penal asociado a decisiones sensibles en contratación estatal y gobierno corporativo. Trabajamos con juntas, comités y representantes legales; los acompañamos con documentación ejecutiva y límites claros.",
          "Incluimos capacitación aplicada a los responsables que intervienen en la toma de decisiones y en la operación: sesiones de formación interna, charlas para juntas y entrenamientos puntuales en gestión del riesgo penal para proyectos y contratos de alto impacto.",
        ],
        cards: [
          { title: "Modelo", body: "Ruta táctica y preventiva alineada con órganos de control y cumplimiento." },
          { title: "Delimitación", body: "No intervenimos en litigios ni asumimos representación judicial." },
          { title: "Activación", body: "Sesiones ejecutivas previo, durante y posterior a decisiones críticas." },
          { title: "Trazabilidad", body: "Entregables ejecutivos, minutas y soportes listos para auditoría." },
          {
            title: "Formación",
            body: "Capacitaciones internas y jornadas para juntas sobre gestión del riesgo penal.",
          },
        ],
        noteLabel: "Línea paralela",
        noteText: "Asesoría penal a personas se gestiona de forma separada y secundaria.",
      },
      businessPanel: {
        badges: ["Foco principal", "Penal corporativo"],
        title: "Acompañamiento ejecutivo para juntas y comités",
        paragraphs: [
          "Definimos ritmo, soportes y responsables en decisiones de alto impacto: minutas, protocolos activables, reportes para auditoría y coordinación con control interno.",
          "La formación corporativa hace parte de la misma línea: diseñamos charlas ejecutivas, jornadas para juntas y capacitaciones internas sobre responsabilidad penal, documentación, flujo de aprobación y actuación frente a incidentes. Todo queda integrado en la agenda y soportes del comité.",
        ],
        cards: [
          {
            title: "Activación",
            body: "Sesiones urgentes con responsables clave para definir alcance y controles.",
          },
          {
            title: "Ejecución",
            body: "Documentación ejecutiva, instrucciones puntuales y coordinación con compliance.",
          },
        ],
        ctas: [
          { label: "Detalle de servicios", href: "/servicios" },
          { label: "Coordinar con junta", href: "/contacto" },
        ],
      },
      serviceAreas: {
        pill: "Servicios empresariales",
        title: "Áreas activas de riesgo penal corporativo",
        description:
          "Mostramos únicamente las áreas habilitadas en Supabase para empresas y órganos directivos. Priorizamos el ingreso por DRP-CE y escalamos cuando el comité lo exige.",
        noteLabel: "Capacitaciones",
        noteText: "Charlas, jornadas para juntas y formación interna en riesgo penal corporativo.",
        cta: "Solicitar ingreso",
        statusActive: "Activo",
        statusInquiry: "Consulta",
        advisoryCta: "Asesoría a personas",
        contactCta: "Contacto",
        trainingCta: "Penal/Empresas",
        advisoryTitle: "Asesoría a personas",
        advisoryDescription:
          "La agenda se habilita por disponibilidad del abogado asignado y solo se muestra la oferta real.",
        advisoryItems: [
          "Ingreso con registro y validación básica.",
          "Selección de horario disponible (sin promesas ni urgencias).",
          "Pago en línea para confirmar la sesión.",
        ],
        advisoryNote: "Coordinamos con defensa técnica cuando ya existe.",
        agendaTitle: "Coordinación con defensa",
        agendaDescription: "Mantenemos trazabilidad de cada paso y acuerdos con defensa principal.",
        agendaItems: [
          "Sesiones a ritmo corto y enfocadas.",
          "Registro de instrucciones y soportes.",
          "Seguimiento al plan acordado con el cliente.",
        ],
        agendaNote: "El pago se habilita solo cuando hay horario disponible.",
        trainingTitle: "Capacitaciones y conferencias",
        trainingDescription:
          "Línea de formación ejecutiva en responsabilidad penal, documentación y actuación en juntas y comités.",
        trainingItems: [
          "Charlas ejecutivas para juntas y comités.",
          "Capacitaciones internas para equipos legales y compliance.",
          "Modalidad virtual o presencial en español o inglés.",
        ],
      },
      peopleLine: {
        title: "Penal para personas: agenda visible y trazabilidad",
        paragraphs: [
          "La asesoría a personas sigue una ruta clara: disponibilidad real, pago al reservar y coordinación con defensa cuando aplica.",
          "Cada sesión deja registro de lo acordado y de los límites del servicio; no se ofrecen promesas ni actuaciones judiciales.",
        ],
        cards: [
          {
            title: "Disponibilidad real",
            body: "El horario visible es el que el abogado define como libre; no se ofrecen horas que no existan.",
          },
          {
            title: "Pago al reservar",
            body: "El enlace de pago se habilita solo cuando se selecciona un espacio disponible.",
          },
          {
            title: "Coordinación",
            body: "Si ya existe defensa técnica, alineamos criterios y límites antes de la sesión.",
          },
          {
            title: "Historial",
            body: "Cada sesión queda documentada para evitar confusiones y mantener el foco.",
          },
        ],
      },
      methodology: {
        pill: "Cómo operamos",
        title: "Metodología de acompañamiento y control",
        pillars: [
          { title: "Criterio", body: "Evaluamos riesgo penal con base en hechos, roles y exposición real." },
          { title: "Documentación", body: "Cada decisión deja trazabilidad ejecutiva y soportes listos para auditoría." },
          { title: "Control", body: "Definimos límites operativos y responsables para evitar improvisación." },
        ],
        steps: [
          {
            title: "Ingreso",
            body: "Sesión corta para delimitar alcance, responsables y documentación existente.",
          },
          {
            title: "Acompañamiento",
            body: "Sesiones ejecutivas con minutas, protocolos y entregables para junta o comité.",
          },
          {
            title: "Seguimiento",
            body: "Registro de decisiones, bloqueos y excepciones; actualización con defensa o compliance.",
          },
        ],
      },
      motivations: {
        title: "Por qué nos buscan",
        items: [
          {
            title: "Decisiones sensibles",
            body: "Necesidad de criterio penal inmediato en juntas, comités o proyectos con presión de tiempo.",
          },
          {
            title: "Documentación y trazabilidad",
            body: "Requerimiento de actas y soportes que resistan auditoría y expliquen límites de actuación.",
          },
          {
            title: "Prevención en contratación estatal",
            body: "Control penal para procesos de contratación, interventoría, supervisión y ejecución." ,
          },
          {
            title: "Formación aplicada",
            body: "Capacitaciones y jornadas para órganos directivos y equipos jurídicos en responsabilidad penal.",
          },
        ],
      },
      deliveries: {
        title: "Qué entregamos",
        items: [
          {
            title: "Minutas ejecutivas",
            body: "Resúmenes accionables con criterios penales y decisiones acordadas.",
          },
          {
            title: "Protocolos activables",
            body: "Rutas de actuación frente a incidentes, con responsables y límites claros.",
          },
          {
            title: "Trazabilidad",
            body: "Registro de acuerdos, bloqueos y excepciones para sustentar cada paso.",
          },
          {
            title: "Formación",
            body: "Charlas y capacitaciones enfocadas en prevención y toma de decisiones responsables.",
          },
        ],
      },
      scenarios: {
        title: "Escenarios frecuentes",
        items: [
          {
            title: "Contratación estatal",
            body: "Definición de límites penales en procesos de contratación y ejecución de proyectos.",
          },
          {
            title: "Gobierno corporativo",
            body: "Acompañamiento a juntas y comités en decisiones con exposición penal personal.",
          },
          {
            title: "Crisis e incidentes",
            body: "Activación táctica ante hallazgos, auditorías o requerimientos de entes de control.",
          },
          {
            title: "Personas",
            body: "Asesoría individual con coordinación de defensa y agenda real disponible.",
          },
        ],
      },
    },
    business: {
      hero: {
        title: "Riesgo penal empresarial en contratación estatal y gobierno corporativo",
        subtitle: "Acompañamiento preventivo y táctico para juntas, comités y órganos decisores.",
        description:
          "Estructuramos la documentación y los límites operativos que soportan las decisiones críticas frente a control interno, auditoría y entes externos.",
        items: [
          "Sesiones ejecutivas con minutas y acuerdos claros.",
          "Protocolos activables y rutas de escalamiento.",
          "Capacitaciones y jornadas para órganos directivos.",
        ],
        ctaPrimary: "Solicitar coordinación",
        ctaSecondary: "Ver servicios activos",
      },
      services: {
        title: "Servicios y líneas activas",
        intro:
          "Trabajamos con líderes corporativos que requieren orden, trazabilidad y soporte penal preventivo. Integrar capacitación hace parte del control.",
        blocks: [
          {
            title: "Diagnóstico DRP-CE",
            body: "Evaluación rápida del riesgo penal en contratación estatal y gobierno corporativo para definir alcance y responsables.",
          },
          {
            title: "Acompañamiento AEC-CE",
            body: "Sesiones periódicas con juntas y comités para documentar decisiones sensibles y sus límites.",
          },
          {
            title: "Incidentes ICP-CE",
            body: "Actuación táctica frente a hallazgos o eventos que requieren documentación y contención inmediata.",
          },
          {
            title: "Formación corporativa",
            body: "Charlas, capacitaciones internas y jornadas para juntas sobre responsabilidad penal y documentación.",
          },
        ],
        trainingTitle: "Capacitaciones y conferencias en riesgo penal",
        trainingDescription:
          "Diseñamos programas de formación para juntas, comités y equipos jurídicos. Todo queda integrado a la agenda y soportes del comité.",
        trainingModes: [
          "Charlas ejecutivas",
          "Capacitaciones internas",
          "Jornadas para juntas o comités",
          "Modalidad virtual o presencial",
          "Español e inglés",
        ],
        trainingCta: "Solicitar agenda de capacitación",
        trainingNote: "Las capacitaciones se coordinan por agenda; el pago se gestiona directamente por el administrador.",
      },
      process: {
        title: "Cómo operamos con empresas",
        description: "Ruta ordenada con responsables claros y soporte documental.",
        steps: [
          { title: "Ingreso", body: "Validamos alcance, responsables y documentación existente." },
          { title: "Disponibilidad", body: "Definimos agenda y bloques para juntas, comités o equipos." },
          { title: "Acompañamiento", body: "Sesiones ejecutivas con minutas, acuerdos y tareas por rol." },
          { title: "Formación", body: "Capacitaciones integradas al plan de control penal corporativo." },
        ],
      },
    },
    people: {
      hero: {
        title: "Asesoría penal para personas con agenda real",
        subtitle: "Sesiones responsables, sin promesas, coordinadas con defensa técnica cuando aplica.",
        description:
          "La disponibilidad que define el abogado es la única visible. El pago se activa al reservar y cada sesión deja registro de lo acordado.",
        items: [
          "Reserva según horarios disponibles.",
          "Pago en línea al confirmar.",
          "Historial de sesiones y acuerdos.",
        ],
        ctaPrimary: "Agendar asesoría",
        ctaSecondary: "Ver proceso",
      },
      flow: {
        title: "Proceso de acompañamiento",
        description: "Ruta clara desde el registro hasta la sesión y su seguimiento.",
        steps: [
          { title: "Registro", body: "Creación de cuenta y validación básica del caso." },
          { title: "Disponibilidad real", body: "Selección de horario visible según agenda definida por el abogado." },
          { title: "Pago", body: "Checkout habilitado solo sobre espacios disponibles." },
          { title: "Sesión", body: "Encuentro con registro de acuerdos y recomendaciones." },
          { title: "Seguimiento", body: "Historial accesible y coordinación con defensa si aplica." },
        ],
        notes: [
          "No se ofrecen actuaciones judiciales ni promesas de resultado.",
          "La agenda puede ser bloqueada o ajustada por el administrador si es necesario.",
        ],
      },
      expectations: {
        title: "Qué puedes esperar",
        items: [
          { title: "Criterio claro", body: "Enfoque penal responsable y explicaciones sin triunfalismo." },
          { title: "Coordinación", body: "Si ya tienes defensa, alineamos límites y responsabilidades." },
          { title: "Transparencia", body: "Costos y alcances definidos antes de cada sesión." },
          { title: "Documentación", body: "Minutas ejecutivas para que no se pierdan instrucciones." },
        ],
      },
    },
    about: {
      hero: {
        title: "Acerca de Castellanos Abogados",
        subtitle: "Riesgo penal, documentación ejecutiva y acompañamiento directo del fundador.",
        description:
          "Trabajamos con precisión para juntas, comités y personas que necesitan criterio penal responsable. Cada interacción queda documentada y coordinada.",
      },
      founder: {
        title: "Fundador",
        role: "Abogado penal y licenciado en lenguas modernas",
        paragraphs: [
          "Abogado con experiencia en el sector público y análisis jurídico penal. Licenciado en lenguas modernas, maneja varios idiomas y dirige personalmente la estrategia jurídica de la firma.",
          "Su enfoque combina gestión del riesgo penal, documentación rigurosa y formación corporativa en español e inglés. Cada caso se aborda con cercanía operativa y control de trazabilidad.",
        ],
        bullets: [
          "Experiencia en poder público y coordinación con órganos de control.",
          "Diseño de rutas de actuación penal para juntas y comités.",
          "Capacitaciones y charlas para equipos jurídicos y órganos directivos.",
          "Acompañamiento directo en español e inglés.",
        ],
        cta: "Ver agenda de coordinación",
      },
      values: {
        title: "Cómo trabajamos",
        items: [
          { title: "Precisión", body: "Textos claros, minutas accionables y soporte verificable." },
          { title: "Control", body: "Límites operativos, responsables definidos y trazabilidad completa." },
          { title: "Formación", body: "Capacitaciones integradas al plan de riesgo penal." },
        ],
      },
    },
    contact: {
      hero: {
        title: "Coordinemos la agenda",
        description: "Escríbenos para coordinar asesorías, capacitaciones o ingreso a los programas empresariales.",
      },
      form: {
        title: "Envíanos un mensaje",
        description: "Respondemos con opciones de agenda y el canal adecuado para tu caso.",
        fields: {
          name: "Nombre completo",
          email: "Correo electrónico",
          phone: "Teléfono",
          message: "Mensaje",
          submit: "Enviar",
        },
      },
      info: {
        title: "También puedes",
        items: [
          "Agendar una evaluación",
          "Solicitar una capacitación",
          "Coordinar con junta o comité",
        ],
      },
    },
    servicesPage: {
      hero: {
        title: "Detalle de servicios",
        description: "Selecciona la línea que aplica: empresas, juntas y comités; o asesoría individual con agenda real.",
        cta: "Volver al inicio",
      },
      sections: [
        {
          title: "Penal empresarial",
          body: "DRP-CE, AEC-CE e ICP-CE con documentación ejecutiva, protocolos activables y formación corporativa.",
        },
        {
          title: "Capacitaciones",
          body: "Charlas, jornadas para juntas y capacitaciones internas en responsabilidad penal y documentación.",
        },
        {
          title: "Penal para personas",
          body: "Agenda visible según disponibilidad real, pago al reservar y coordinación con defensa si existe.",
        },
      ],
    },
    forms: {
      email: "Correo electrónico",
      password: "Contraseña",
      confirmPassword: "Confirmar contraseña",
      submit: "Enviar",
    },
    auth: {
      login: {
        title: "Iniciar sesión",
        description: "Accede a tu cuenta para gestionar tus asesorías.",
        submit: "Entrar",
        cta: "¿No tienes cuenta? Regístrate como abogado",
        error: "Error al iniciar sesión",
      },
      register: {
        title: "Crear cuenta",
        description: "Regístrate para agendar asesorías o administrar disponibilidad.",
        submit: "Registrarme",
        lawyerCta: "Regístrate como abogado",
      },
    },
  },
  en: {
    navigation: {
      home: "Home",
      business: "Corporate Defense",
      people: "Individuals",
      services: "Services",
      contact: "Contact",
      advisory: "Advisory",
      register: "Sign up",
      login: "Log in",
      about: "About us",
      signIn: "Sign in",
      peopleAdvisory: "Advisory for individuals",
      language: "Language",
    },
    common: {
      language: "Language",
      viewMore: "View more",
      backHome: "Back to home",
      loading: "Loading",
      spanish: "Spanish",
      english: "English",
    },
    home: {
      hero: {
        badges: ["Criminal strategy for public procurement", "Boards · Committees · Critical decisions"],
        title: "Criminal control for sensitive decisions and boards that cannot improvise",
        paragraph1:
          "We provide executive support for leaders who need immediate judgment, impeccable documentation, and tactical activation without noise.",
        paragraph2:
          "Every decision is handled with criminal risk management, traceability, and documentation that justifies the chosen course before audits, oversight bodies, and internal governance. No promises of outcome—only documented control and clear operational limits.",
        ctaPrimary: "Request strategic evaluation",
        ctaSecondary: "See how we work",
        highlights: [
          { label: "Scope", value: "Public procurement, corporate governance, oversight bodies." },
          { label: "Approach", value: "Criminal prevention, operational controls, tactical response." },
          { label: "Pace", value: "Short sessions, executive deliverables, traceable decisions." },
          { label: "Control", value: "Full traceability: minutes, notes, justified decisions." },
        ],
        model: {
          badge: "Model",
          title: "Strategic accompaniment document",
          badgeSecondary: "Confidential",
          items: [
            "Sensitive decisions with immediate criminal exposure.",
            "Risk maps and rules of engagement ready for the board.",
            "Tactical activation for incidents with containment and coordination.",
          ],
          tags: ["Diagnosis", "Protocols", "Activation"],
        },
      },
      businessFocus: {
        pill: "Corporate criminal risk",
        title: "Criminal for companies: public procurement and corporate governance",
        paragraphs: [
          "We focus exclusively on criminal prevention and control tied to sensitive decisions in public procurement and corporate governance. We work with boards, committees, and legal reps; we support them with executive documentation and clear boundaries.",
          "Training is integrated: internal sessions, board-oriented talks, and targeted workshops on criminal risk for high-impact projects and contracts.",
        ],
        cards: [
          { title: "Model", body: "Tactical and preventive route aligned with oversight and compliance." },
          { title: "Delimitation", body: "We do not litigate or assume judicial representation." },
          { title: "Activation", body: "Executive sessions before, during, and after critical decisions." },
          { title: "Traceability", body: "Executive deliverables, minutes, and audit-ready support." },
          {
            title: "Training",
            body: "Internal trainings and board workshops on criminal risk management.",
          },
        ],
        noteLabel: "Parallel line",
        noteText: "Advisory for individuals is managed separately as a secondary line.",
      },
      businessPanel: {
        badges: ["Primary focus", "Corporate criminal"],
        title: "Executive support for boards and committees",
        paragraphs: [
          "We set pace, documentation, and responsible roles for high-impact decisions: minutes, actionable protocols, audit reports, and coordination with internal control.",
          "Training is part of the same line: we design board talks, committee workshops, and internal trainings on criminal liability, documentation, approval flow, and incident response—everything integrated into the committee agenda and records.",
        ],
        cards: [
          { title: "Activation", body: "Urgent sessions with key roles to define scope and controls." },
          { title: "Execution", body: "Executive documentation, pointed instructions, and compliance coordination." },
        ],
        ctas: [
          { label: "Service detail", href: "/servicios" },
          { label: "Coordinate with board", href: "/contacto" },
        ],
      },
      serviceAreas: {
        pill: "Corporate services",
        title: "Active corporate criminal risk areas",
        description:
          "We display only the areas enabled in Supabase for companies and governing bodies. Entry starts with DRP-CE and scales when the committee requires it.",
        noteLabel: "Training",
        noteText: "Talks, board workshops, and internal training on corporate criminal risk.",
        cta: "Request onboarding",
        statusActive: "Active",
        statusInquiry: "Inquiry",
        advisoryCta: "Advisory for individuals",
        contactCta: "Contact",
        trainingCta: "Corporate", 
        advisoryTitle: "Advisory for individuals",
        advisoryDescription:
          "Scheduling depends on the assigned lawyer's availability; only real slots are shown.",
        advisoryItems: [
          "Sign-up with basic validation.",
          "Choose an available slot (no promises, no urgency).",
          "Online payment to confirm the session.",
        ],
        advisoryNote: "We coordinate with existing defense when applicable.",
        agendaTitle: "Coordination with defense",
        agendaDescription: "We keep traceability of every step and agreements with lead defense.",
        agendaItems: [
          "Short, focused sessions.",
          "Record of instructions and support.",
          "Follow-up on the plan agreed with the client.",
        ],
        agendaNote: "Payment is enabled only when a real slot is selected.",
        trainingTitle: "Training and conferences",
        trainingDescription:
          "Executive training on criminal liability, documentation, and action for boards and committees.",
        trainingItems: [
          "Executive talks for boards and committees.",
          "Internal trainings for legal and compliance teams.",
          "Virtual or onsite delivery in Spanish or English.",
        ],
      },
      peopleLine: {
        title: "Criminal advisory for individuals: visible schedule and traceability",
        paragraphs: [
          "Individual advisory follows a clear path: real availability, pay when reserving, and coordination with defense when needed.",
          "Each session is documented with scope and limits—no promises of outcome or litigation offers.",
        ],
        cards: [
          { title: "Real availability", body: "Displayed slots are exactly what the lawyer has opened." },
          { title: "Pay on reserve", body: "Payment link appears only after choosing an available time." },
          { title: "Coordination", body: "If defense already exists, we align criteria and limits first." },
          { title: "History", body: "Every session is documented to avoid confusion and keep focus." },
        ],
      },
      methodology: {
        pill: "How we operate",
        title: "Methodology for accompaniment and control",
        pillars: [
          { title: "Judgment", body: "We assess criminal risk based on facts, roles, and real exposure." },
          { title: "Documentation", body: "Every decision leaves executive traceability and audit-ready support." },
          { title: "Control", body: "We set operational limits and responsible roles to avoid improvisation." },
        ],
        steps: [
          { title: "Intake", body: "Brief session to set scope, roles, and existing documentation." },
          { title: "Support", body: "Executive sessions with minutes, protocols, and deliverables for boards or committees." },
          { title: "Follow-up", body: "Record of decisions, blocks, and exceptions; updates with defense or compliance." },
        ],
      },
      motivations: {
        title: "Why clients engage us",
        items: [
          {
            title: "Sensitive decisions",
            body: "Need for immediate criminal judgment in boards, committees, or projects under time pressure.",
          },
          {
            title: "Documentation and traceability",
            body: "Requirement for minutes and support that withstand audit and clarify boundaries.",
          },
          {
            title: "Public procurement prevention",
            body: "Criminal control for procurement processes, oversight, supervision, and execution.",
          },
          {
            title: "Applied training",
            body: "Training and workshops for governing bodies and legal teams on criminal responsibility.",
          },
        ],
      },
      deliveries: {
        title: "What we deliver",
        items: [
          { title: "Executive minutes", body: "Actionable summaries with criminal criteria and agreed decisions." },
          { title: "Activatable protocols", body: "Response routes for incidents with roles and clear limits." },
          { title: "Traceability", body: "Record of agreements, blocks, and exceptions to justify each move." },
          { title: "Training", body: "Talks and training focused on prevention and responsible decisions." },
        ],
      },
      scenarios: {
        title: "Common scenarios",
        items: [
          { title: "Public procurement", body: "Defining criminal limits in procurement and project execution." },
          { title: "Corporate governance", body: "Support for boards and committees facing personal exposure." },
          { title: "Crises and incidents", body: "Tactical activation for findings, audits, or oversight requests." },
          { title: "Individuals", body: "Individual advisory with defense coordination and real availability." },
        ],
      },
    },
    business: {
      hero: {
        title: "Corporate criminal risk for public procurement and governance",
        subtitle: "Preventive and tactical support for boards, committees, and decision-makers.",
        description:
          "We structure documentation and operational limits that sustain critical decisions before internal control, audit, and external regulators.",
        items: [
          "Executive sessions with clear minutes and agreements.",
          "Activatable protocols and escalation routes.",
          "Training and workshops for governing bodies.",
        ],
        ctaPrimary: "Request coordination",
        ctaSecondary: "See active services",
      },
      services: {
        title: "Services and active lines",
        intro:
          "We work with corporate leaders who need order, traceability, and preventive criminal support. Training is integrated into control.",
        blocks: [
          {
            title: "DRP-CE Assessment",
            body: "Rapid evaluation of criminal risk in public procurement and governance to set scope and roles.",
          },
          {
            title: "AEC-CE Support",
            body: "Regular sessions with boards and committees to document sensitive decisions and boundaries.",
          },
          {
            title: "ICP-CE Incidents",
            body: "Tactical action for findings or events requiring immediate documentation and containment.",
          },
          {
            title: "Corporate training",
            body: "Talks, internal training, and board workshops on criminal liability and documentation.",
          },
        ],
        trainingTitle: "Training and conferences on criminal risk",
        trainingDescription:
          "We design training programs for boards, committees, and legal teams. Everything is integrated into the committee agenda and records.",
        trainingModes: [
          "Executive talks",
          "Internal trainings",
          "Workshops for boards or committees",
          "Virtual or onsite delivery",
          "Spanish and English",
        ],
        trainingCta: "Request training schedule",
        trainingNote: "Trainings are coordinated via agenda; payment is handled directly by the administrator.",
      },
      process: {
        title: "How we operate with companies",
        description: "Ordered route with clear roles and documentary support.",
        steps: [
          { title: "Intake", body: "We validate scope, roles, and existing documentation." },
          { title: "Availability", body: "We define agenda blocks for boards, committees, or teams." },
          { title: "Support", body: "Executive sessions with minutes, agreements, and tasks per role." },
          { title: "Training", body: "Trainings integrated into the corporate criminal risk plan." },
        ],
      },
    },
    people: {
      hero: {
        title: "Criminal advisory for individuals with real availability",
        subtitle: "Responsible sessions—no promises—coordinated with defense when applicable.",
        description:
          "Only the availability set by the lawyer is shown. Payment activates upon booking and every session leaves a record.",
        items: [
          "Book according to available times.",
          "Online payment upon confirmation.",
          "Session history and agreements.",
        ],
        ctaPrimary: "Book advisory",
        ctaSecondary: "View process",
      },
      flow: {
        title: "Accompaniment process",
        description: "Clear path from registration to session and follow-up.",
        steps: [
          { title: "Registration", body: "Account creation with basic case validation." },
          { title: "Real availability", body: "Choose a visible time slot set by the lawyer." },
          { title: "Payment", body: "Checkout enabled only for available slots." },
          { title: "Session", body: "Meeting with documented agreements and recommendations." },
          { title: "Follow-up", body: "Accessible history and coordination with defense if needed." },
        ],
        notes: [
          "No litigation or promises of outcome are offered.",
          "The administrator may block or adjust the agenda if needed.",
        ],
      },
      expectations: {
        title: "What to expect",
        items: [
          { title: "Clear judgment", body: "Responsible criminal focus with straightforward explanations." },
          { title: "Coordination", body: "If you already have defense, we align boundaries and duties." },
          { title: "Transparency", body: "Costs and scope defined before each session." },
          { title: "Documentation", body: "Executive minutes to keep instructions clear." },
        ],
      },
    },
    about: {
      hero: {
        title: "About Castellanos Abogados",
        subtitle: "Criminal risk, executive documentation, and direct involvement from the founder.",
        description:
          "We work with precision for boards, committees, and individuals who need responsible criminal judgment. Every interaction is documented and coordinated.",
      },
      founder: {
        title: "Founder",
        role: "Criminal lawyer and modern languages graduate",
        paragraphs: [
          "Lawyer with public sector experience and criminal legal analysis. Graduate in modern languages, fluent in multiple languages, and personally leading the firm's legal strategy.",
          "His approach blends criminal risk management, rigorous documentation, and corporate training in Spanish and English. Each matter is handled with operational closeness and traceability control.",
        ],
        bullets: [
          "Experience in public entities and coordination with oversight bodies.",
          "Design of criminal action routes for boards and committees.",
          "Training and talks for legal teams and governing bodies.",
          "Direct support in Spanish and English.",
        ],
        cta: "View coordination schedule",
      },
      values: {
        title: "How we work",
        items: [
          { title: "Precision", body: "Clear texts, actionable minutes, and verifiable support." },
          { title: "Control", body: "Operational limits, defined roles, and full traceability." },
          { title: "Training", body: "Training integrated into the criminal risk plan." },
        ],
      },
    },
    contact: {
      hero: {
        title: "Let's coordinate the agenda",
        description: "Write to coordinate advisory sessions, trainings, or entry into corporate programs.",
      },
      form: {
        title: "Send us a message",
        description: "We respond with scheduling options and the right channel for your matter.",
        fields: {
          name: "Full name",
          email: "Email",
          phone: "Phone",
          message: "Message",
          submit: "Send",
        },
      },
      info: {
        title: "You can also",
        items: [
          "Book an evaluation",
          "Request a training",
          "Coordinate with a board or committee",
        ],
      },
    },
    servicesPage: {
      hero: {
        title: "Service detail",
        description: "Choose the applicable line: companies, boards and committees; or individual advisory with real availability.",
        cta: "Back to home",
      },
      sections: [
        {
          title: "Corporate criminal",
          body: "DRP-CE, AEC-CE, and ICP-CE with executive documentation, activatable protocols, and corporate training.",
        },
        {
          title: "Training",
          body: "Talks, board workshops, and internal trainings on criminal liability and documentation.",
        },
        {
          title: "Individuals",
          body: "Visible agenda based on real availability, payment upon booking, and coordination with defense if any.",
        },
      ],
    },
    forms: {
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      submit: "Submit",
    },
    auth: {
      login: {
        title: "Sign in",
        description: "Access your account to manage advisory sessions.",
        submit: "Enter",
        cta: "Don't have an account? Register as a lawyer",
        error: "Sign-in error",
      },
      register: {
        title: "Create account",
        description: "Register to book advisory sessions or manage availability.",
        submit: "Register",
        lawyerCta: "Register as a lawyer",
      },
    },
  },
};
