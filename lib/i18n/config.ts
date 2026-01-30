export const supportedLocales = ["es", "en"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = "es";

export type Dictionary = {
  navigation: {
    home: string;
    business: string;
    people: string;
    services: string;
    methodology: string;
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
      label: string;
      badges: string[];
      titleA: string;
      subtitleA: string;
      titleB: string;
      subtitleB: string;
      note: string;
      ctaPrimary: string;
      ctaSecondary: string;
      trustNote: string;
    };
    outcomes: { title: string }[];
    outcomesTitle: string;
    howWeWork: {
      title: string;
      steps: { title: string; body: string }[];
    };
    servicesPreview: {
      title: string;
      description: string;
      cards: { title: string; body: string; href: string; cta: string }[];
    };
    fit: {
      title: string;
      forTitle: string;
      forItems: string[];
      notForTitle: string;
      notForItems: string[];
    };
    faq: { title: string; items: { question: string; answer: string }[] };
    finalCta: {
      title: string;
      description: string;
      note: string;
      ctaPrimary: string;
      ctaSecondary: string;
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
    problems: { title: string; items: { title: string; body: string }[] };
    deliverables: { title: string; items: { title: string; body: string }[] };
    faq: { title: string; items: { question: string; answer: string }[] };
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
        company: string;
        role: string;
        email: string;
        phone: string;
        caseType: string;
        urgency: string;
        message: string;
        privacy: string;
        submit: string;
      };
      options: {
        caseType: string[];
        urgency: string[];
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
  methodologyPage: {
    hero: { title: string; subtitle: string; note: string };
    phases: {
      title: string;
      description: string;
      deliverables: string[];
    }[];
    safeguards: { title: string; items: string[] };
    faq: { title: string; items: { question: string; answer: string }[] };
    cta: { title: string; description: string; primary: string; secondary: string };
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
      methodology: "Metodología",
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
        label: "Gestión penal preventiva",
        badges: ["Decisiones sensibles · juntas y comités", "Contratación estatal · compliance · control"],
        titleA: "Decisiones sensibles que no admiten improvisación.",
        subtitleA:
          "Estrategia penal preventiva para órganos de gobierno y áreas jurídicas que exigen criterio, trazabilidad y documentación ejecutiva.",
        titleB: "Criterio penal para decisiones críticas con respaldo documental.",
        subtitleB:
          "Acompañamiento preventivo y confidencial para líderes responsables que deben justificar sus decisiones ante control interno y externo.",
        note: "Actuamos con discreción, límites claros y soporte escrito.",
        ctaPrimary: "Solicitar evaluación estratégica",
        ctaSecondary: "Ver cómo trabajamos",
        trustNote: "Tu información se maneja con confidencialidad.",
      },
      outcomes: [
        { title: "Trazabilidad y soporte documental." },
        { title: "Coordinación jurídica en decisiones críticas." },
        { title: "Protocolos claros para prevención y contención." },
      ],
      outcomesTitle: "Resultados clave",
      howWeWork: {
        title: "Cómo trabajamos",
        steps: [
          {
            title: "Diagnóstico",
            body: "Levantamos hechos, actores y riesgos para definir alcance y prioridades.",
          },
          {
            title: "Protocolos",
            body: "Definimos criterios, documentación y rutas de aprobación para la decisión.",
          },
          {
            title: "Activación",
            body: "Acompañamiento táctico en sesiones clave, con control y seguimiento.",
          },
        ],
      },
      servicesPreview: {
        title: "Líneas de servicio",
        description:
          "Dos frentes complementarios. Empresas concentra el foco principal; Personas se atiende bajo disponibilidad y coordinación.",
        cards: [
          {
            title: "Penal/Empresas",
            body: "Prevención penal para juntas, comités y áreas jurídicas con alto nivel de exposición.",
            href: "/penal-empresarial",
            cta: "Ver Penal/Empresas",
          },
          {
            title: "Penal/Personas",
            body: "Asesoría preventiva individual con trazabilidad y coordinación con defensa cuando aplica.",
            href: "/personas",
            cta: "Ver Penal/Personas",
          },
        ],
      },
      fit: {
        title: "Para quién es / Para quién no es",
        forTitle: "Es para",
        forItems: [
          "Juntas, comités y representantes legales que deben justificar decisiones.",
          "Áreas jurídicas y compliance que requieren soporte documental y control.",
          "Organizaciones con exposición penal preventiva en procesos críticos.",
        ],
        notForTitle: "No es para",
        notForItems: [
          "Litigios o representación judicial.",
          "Promesas de resultado o soluciones improvisadas.",
          "Procesos sin voluntad de documentación y control.",
        ],
      },
      faq: {
        title: "Preguntas frecuentes",
        items: [
          {
            question: "¿Cuándo llamar?",
            answer:
              "Cuando la decisión es sensible y requiere criterio, trazabilidad y soporte documental.",
          },
          {
            question: "¿Qué entregables recibo?",
            answer: "Minutas, protocolos, criterios y rutas de actuación con responsables definidos.",
          },
          {
            question: "¿Qué pasa ante incidentes urgentes?",
            answer: "Activamos sesiones tácticas y coordinamos instrucciones con el equipo clave.",
          },
          {
            question: "¿Cómo manejan la confidencialidad?",
            answer: "Toda la información se trata con reserva y control documental interno.",
          },
          {
            question: "¿Incluye representación judicial?",
            answer: "No. Nos enfocamos en prevención, documentación y acompañamiento estratégico.",
          },
          {
            question: "¿Qué incluye una evaluación estratégica?",
            answer: "Diagnóstico inicial, definición de alcance y prioridades de control.",
          },
        ],
      },
      finalCta: {
        title: "Solicitar evaluación estratégica",
        description: "Conversemos sobre el contexto, el alcance y el nivel de exposición.",
        note: "Respuesta en 24–48 horas hábiles.",
        ctaPrimary: "Solicitar evaluación estratégica",
        ctaSecondary: "Ver cómo trabajamos",
      },
      businessFocus: {
        pill: "Penal/Empresas",
        title: "Riesgo penal preventivo para órganos de gobierno y contratación sensible",
        paragraphs: [
          "Trabajamos con juntas, comités y representantes legales que requieren criterio penal preventivo, soportes ejecutivos y límites claros para decisiones de alto impacto.",
          "El foco es la trazabilidad: actas, minutas, criterios y rutas de aprobación que permitan justificar decisiones ante control interno y externo.",
        ],
        cards: [
          { title: "Trazabilidad", body: "Documentación ejecutiva y soportes listos para auditoría." },
          { title: "Criterio", body: "Definición de límites, riesgos y responsables con claridad." },
          { title: "Activación", body: "Sesiones tácticas cuando se presentan incidentes o alertas." },
        ],
        noteLabel: "Línea paralela",
        noteText: "La asesoría a personas se atiende como línea secundaria y bajo disponibilidad.",
      },
      businessPanel: {
        badges: ["Foco principal", "Penal corporativo"],
        title: "Acompañamiento ejecutivo para juntas y comités",
        paragraphs: [
          "Definimos ritmo, soportes y responsables en decisiones de alto impacto: minutas, criterios y reportes listos para auditoría.",
          "Capacitaciones y jornadas para juntas complementan el acompañamiento con reglas de actuación y documentación clara.",
        ],
        cards: [
          { title: "Activación", body: "Sesiones urgentes con responsables clave para definir alcance." },
          { title: "Ejecución", body: "Documentación ejecutiva y coordinación con compliance." },
        ],
        ctas: [
          { label: "Detalle de servicios", href: "/servicios" },
          { label: "Coordinar con junta", href: "/contacto" },
        ],
      },
      serviceAreas: {
        pill: "Servicios",
        title: "Áreas activas de riesgo penal",
        description:
          "Servicios habilitados según el contexto del cliente. Priorizamos trazabilidad, documentación y control de decisiones.",
        noteLabel: "Capacitaciones",
        noteText: "Charlas y jornadas internas para juntas, compliance y áreas jurídicas.",
        cta: "Ver servicios",
        statusActive: "Activo",
        statusInquiry: "Consulta",
        advisoryCta: "Asesoría a personas",
        contactCta: "Contacto",
        trainingCta: "Penal/Empresas",
        advisoryTitle: "Penal/Personas",
        advisoryDescription:
          "Asesoría preventiva con agenda real, coordinación con defensa y soporte documental.",
        advisoryItems: [
          "Ingreso con validación básica.",
          "Selección de horario disponible.",
          "Pago al reservar la sesión.",
        ],
        advisoryNote: "Coordinamos con defensa técnica cuando ya existe.",
        agendaTitle: "Coordinación con defensa",
        agendaDescription: "Trazabilidad de instrucciones y acuerdos con la defensa principal.",
        agendaItems: [
          "Sesiones a ritmo corto y enfocadas.",
          "Registro de instrucciones y soportes.",
          "Seguimiento al plan acordado.",
        ],
        agendaNote: "El pago se habilita solo cuando hay horario disponible.",
        trainingTitle: "Capacitaciones",
        trainingDescription: "Formación ejecutiva en responsabilidad penal y documentación.",
        trainingItems: [
          "Charlas para juntas y comités.",
          "Capacitaciones internas para equipos legales y compliance.",
          "Modalidad virtual o presencial en español o inglés.",
        ],
      },
      peopleLine: {
        title: "Penal/Personas",
        paragraphs: [
          "La asesoría a personas es una línea paralela con agenda real y coordinación con defensa cuando aplica.",
          "Cada sesión deja registro de lo acordado y de los límites del servicio.",
        ],
        cards: [
          { title: "Disponibilidad real", body: "Se muestran únicamente horarios confirmados." },
          { title: "Pago al reservar", body: "Se habilita al seleccionar un horario disponible." },
          { title: "Coordinación", body: "Se articula con defensa técnica cuando existe." },
        ],
      },
      methodology: {
        pill: "Metodología",
        title: "Cómo trabajamos",
        pillars: [
          { title: "Diagnóstico", body: "Contexto y hechos críticos para definir alcance." },
          { title: "Protocolos", body: "Reglas de actuación y documentación ejecutiva." },
          { title: "Activación", body: "Acompañamiento táctico y seguimiento a decisiones." },
        ],
        steps: [
          { title: "Levantamiento", body: "Revisión de documentos, actores y cronología." },
          { title: "Criterios", body: "Definición de límites y rutas de aprobación." },
          { title: "Reporte", body: "Entregables listos para junta y archivo." },
        ],
      },
      motivations: {
        title: "Por qué nos buscan",
        items: [
          {
            title: "Decisiones sensibles",
            body: "Juntas y comités que requieren criterio penal preventivo.",
          },
          {
            title: "Contratación estatal",
            body: "Procesos con exposición a entes de control y auditorías.",
          },
          {
            title: "Incidentes urgentes",
            body: "Activaciones tácticas para contener riesgos y coordinar equipos.",
          },
        ],
      },
      deliveries: {
        title: "Qué entregamos",
        items: [
          {
            title: "Actas y minutas",
            body: "Registro ejecutivo y trazable de decisiones y soportes.",
          },
          {
            title: "Protocolos",
            body: "Reglas claras de actuación y documentación por área.",
          },
          {
            title: "Mapas de riesgo",
            body: "Rutas de mitigación con responsables y controles.",
          },
        ],
      },
      scenarios: {
        title: "Escenarios frecuentes",
        items: [
          {
            title: "Comités y juntas",
            body: "Decisiones con impacto penal y necesidad de documentación formal.",
          },
          {
            title: "Contratación estatal",
            body: "Procesos críticos con auditorías y supervisión permanente.",
          },
          {
            title: "Crisis e incidentes",
            body: "Activaciones urgentes para definir alcance y responsabilidades.",
          },
        ],
      },
    },
    business: {
      hero: {
        title: "Penal/Empresas: criterio preventivo para decisiones críticas",
        subtitle: "Acompañamiento preventivo para juntas, comités y áreas jurídicas.",
        description:
          "Definimos criterios, límites y documentación ejecutiva que respaldan decisiones sensibles ante control interno y externo.",
        items: [
          "Documentación ejecutiva y trazabilidad.",
          "Protocolos activables y rutas de escalamiento.",
          "Capacitaciones para órganos directivos.",
        ],
        ctaPrimary: "Solicitar evaluación estratégica",
        ctaSecondary: "Ver cómo trabajamos",
      },
      problems: {
        title: "Problemas típicos",
        items: [
          {
            title: "Contratación estatal",
            body: "Procesos con exposición a entes de control que requieren criterio y trazabilidad.",
          },
          {
            title: "Juntas y comités",
            body: "Decisiones críticas que necesitan documentación ejecutiva y límites claros.",
          },
          {
            title: "Compliance penal",
            body: "Riesgos internos que exigen protocolos, responsables y rutas de aprobación.",
          },
        ],
      },
      deliverables: {
        title: "Entregables clave",
        items: [
          { title: "Minutas ejecutivas", body: "Registro claro de decisiones y criterios adoptados." },
          { title: "Protocolos", body: "Reglas de actuación y documentación por cada frente." },
          { title: "Mapas de riesgo", body: "Prioridades, responsables y controles definidos." },
        ],
      },
      faq: {
        title: "Preguntas frecuentes",
        items: [
          {
            question: "¿Incluye representación judicial?",
            answer: "No. Nos enfocamos en prevención, documentación y acompañamiento estratégico.",
          },
          {
            question: "¿Qué obtiene la junta?",
            answer: "Minutas, criterios, protocolos y soportes trazables para auditoría.",
          },
          {
            question: "¿Cómo se coordinan decisiones urgentes?",
            answer: "Activamos sesiones tácticas y acompañamos la documentación.",
          },
          {
            question: "¿Incluye capacitaciones?",
            answer: "Sí. Charlas y jornadas para juntas y equipos internos.",
          },
        ],
      },
      services: {
        title: "Servicios y líneas activas",
        intro:
          "Trabajamos con líderes corporativos que requieren orden, trazabilidad y soporte penal preventivo. Integrar capacitación hace parte del control.",
        blocks: [
          {
            title: "Diagnóstico preventivo",
            body: "Evaluación inicial para definir riesgos, alcance y responsables.",
          },
          {
            title: "Protocolos y criterios",
            body: "Reglas de actuación y documentación para decisiones sensibles.",
          },
          {
            title: "Acompañamiento a juntas",
            body: "Sesiones ejecutivas con minutas, acuerdos y trazabilidad.",
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
        title: "Penal/Personas con enfoque preventivo",
        subtitle: "Línea paralela con agenda real y coordinación con defensa cuando aplica.",
        description:
          "Asesoría responsable, sin promesas de resultado y con trazabilidad documental en cada sesión.",
        items: [
          "Agenda según disponibilidad real.",
          "Pago al reservar la sesión.",
          "Registro de acuerdos y límites.",
        ],
        ctaPrimary: "Agendar asesoría",
        ctaSecondary: "Ver proceso",
      },
      flow: {
        title: "Proceso de acompañamiento",
        description: "Ruta breve y clara para sesiones individuales.",
        steps: [
          { title: "Registro y contexto", body: "Recibimos la información esencial y validamos alcance." },
          { title: "Horario disponible", body: "Se selecciona un horario real y se confirma la reserva." },
          { title: "Sesión y registro", body: "Sesión enfocada con registro de acuerdos y próximos pasos." },
        ],
        notes: [
          "Coordinamos con defensa existente cuando aplica.",
          "No asumimos representación judicial ni litigios.",
        ],
      },
      expectations: {
        title: "Qué puedes esperar",
        items: [
          { title: "Confidencialidad", body: "Manejo reservado de información y soporte documental." },
          { title: "Criterio preventivo", body: "Enfoque en decisiones responsables y límites claros." },
          { title: "Trazabilidad", body: "Registro de acuerdos, instrucciones y compromisos." },
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
        title: "Solicitar evaluación estratégica",
        description:
          "Comparte el contexto y el nivel de exposición. Te respondemos con la ruta adecuada y los siguientes pasos.",
      },
      form: {
        title: "Envíanos un mensaje",
        description: "Esta información es confidencial. Respondemos en 24–48 horas hábiles.",
        fields: {
          name: "Nombre completo",
          company: "Empresa",
          role: "Rol o cargo",
          email: "Correo electrónico",
          phone: "Teléfono",
          caseType: "Tipo de situación",
          urgency: "Nivel de urgencia",
          message: "Cuéntanos el contexto",
          privacy: "Acepto tratamiento de datos",
          submit: "Solicitar evaluación estratégica",
        },
        options: {
          caseType: [
            "Contratación estatal",
            "Decisión de junta o comité",
            "Riesgo penal corporativo",
            "Asesoría individual",
            "Otro",
          ],
          urgency: ["Inmediata (24–48h)", "Alta (7 días)", "Normal (15 días)"],
        },
      },
      info: {
        title: "También puedes",
        items: [
          "Coordinar una sesión con junta o comité",
          "Solicitar una capacitación interna",
          "Ver cómo trabajamos antes de agendar",
        ],
      },
    },
    servicesPage: {
      hero: {
        title: "Servicios y líneas de actuación",
        description:
          "Selecciona la línea que aplica según tu contexto. Cada servicio incluye trazabilidad y límites claros.",
        cta: "Ver inicio",
      },
      sections: [
        {
          title: "Penal/Empresas",
          body: "Diagnóstico, protocolos activables y acompañamiento ejecutivo para juntas y comités.",
        },
        {
          title: "Capacitaciones",
          body: "Charlas y jornadas internas para juntas, compliance y áreas jurídicas.",
        },
        {
          title: "Penal/Personas",
          body: "Asesoría preventiva con agenda real y coordinación con defensa cuando aplica.",
        },
      ],
    },
    methodologyPage: {
      hero: {
        title: "Metodología de trabajo",
        subtitle: "Diagnóstico → Protocolos → Activación con entregables claros y trazables.",
        note: "No incluye representación judicial ni litigios.",
      },
      phases: [
        {
          title: "Diagnóstico",
          description: "Revisión de contexto, actores, riesgos y documentación existente.",
          deliverables: [
            "Mapa de riesgos preliminar",
            "Cronología crítica",
            "Alcance y prioridades",
          ],
        },
        {
          title: "Protocolos",
          description: "Definición de criterios, rutas de aprobación y documentación ejecutiva.",
          deliverables: [
            "Criterios de actuación",
            "Minutas y formatos ejecutivos",
            "Checklist de control",
          ],
        },
        {
          title: "Activación",
          description: "Acompañamiento táctico en sesiones clave y seguimiento.",
          deliverables: [
            "Registro de decisiones",
            "Instrucciones coordinadas",
            "Plan de seguimiento",
          ],
        },
      ],
      safeguards: {
        title: "Salvaguardas de criterio",
        items: [
          "Confidencialidad y trazabilidad documental.",
          "Límites de servicio definidos desde el inicio.",
          "Coordinación con defensa cuando exista.",
        ],
      },
      faq: {
        title: "Preguntas frecuentes",
        items: [
          {
            question: "¿Cuánto dura cada fase?",
            answer: "Se ajusta al alcance. Priorizamos entregables ejecutivos en ciclos cortos.",
          },
          {
            question: "¿Qué recibe la junta o el comité?",
            answer: "Minutas, criterios, checklist y soportes de decisión trazables.",
          },
          {
            question: "¿Incluye representación judicial?",
            answer: "No. La metodología se enfoca en prevención y documentación.",
          },
          {
            question: "¿Puede integrarse con compliance interno?",
            answer: "Sí, coordinamos con los responsables internos.",
          },
        ],
      },
      cta: {
        title: "Solicitar evaluación estratégica",
        description: "Definamos el alcance y la fase adecuada para tu caso.",
        primary: "Solicitar evaluación estratégica",
        secondary: "Ver cómo trabajamos",
      },
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
      methodology: "Methodology",
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
        label: "Preventive criminal risk",
        badges: ["Sensitive decisions · boards and committees", "Public procurement · compliance · control"],
        titleA: "Sensitive decisions that leave no room for improvisation.",
        subtitleA:
          "Preventive criminal strategy for governing bodies and legal teams that require judgment, traceability, and executive documentation.",
        titleB: "Criminal judgment for critical decisions with documentary backing.",
        subtitleB:
          "Confidential, preventive support for leaders who must justify decisions to internal and external oversight.",
        note: "We operate discreetly, with clear limits and written support.",
        ctaPrimary: "Request strategic evaluation",
        ctaSecondary: "See how we work",
        trustNote: "Your information is handled confidentially.",
      },
      outcomes: [
        { title: "Traceability and documentary support." },
        { title: "Legal coordination for critical decisions." },
        { title: "Clear protocols for prevention and containment." },
      ],
      outcomesTitle: "Key outcomes",
      howWeWork: {
        title: "How we work",
        steps: [
          {
            title: "Diagnosis",
            body: "We gather facts, actors, and risks to define scope and priorities.",
          },
          {
            title: "Protocols",
            body: "We set criteria, documentation, and approval routes for the decision.",
          },
          {
            title: "Activation",
            body: "Tactical support in key sessions, with control and follow-up.",
          },
        ],
      },
      servicesPreview: {
        title: "Service lines",
        description:
          "Two complementary fronts. Companies is the main focus; Individuals is handled with availability and coordination.",
        cards: [
          {
            title: "Corporate Defense",
            body: "Preventive criminal support for boards, committees, and legal teams with high exposure.",
            href: "/penal-empresarial",
            cta: "View Corporate Defense",
          },
          {
            title: "Individuals",
            body: "Preventive advisory with traceability and coordination with defense when needed.",
            href: "/personas",
            cta: "View Individuals",
          },
        ],
      },
      fit: {
        title: "For whom / Not for whom",
        forTitle: "It is for",
        forItems: [
          "Boards, committees, and legal representatives who must justify decisions.",
          "Legal and compliance teams that require documentary support and control.",
          "Organizations with preventive criminal exposure in critical processes.",
        ],
        notForTitle: "It is not for",
        notForItems: [
          "Litigation or court representation.",
          "Result guarantees or improvised solutions.",
          "Processes without willingness to document and control.",
        ],
      },
      faq: {
        title: "Frequently asked questions",
        items: [
          {
            question: "When should we call?",
            answer:
              "When a decision is sensitive and requires judgment, traceability, and documentary support.",
          },
          {
            question: "What deliverables do we receive?",
            answer: "Minutes, protocols, criteria, and action routes with defined owners.",
          },
          {
            question: "What happens in urgent incidents?",
            answer: "We activate tactical sessions and coordinate instructions with the key team.",
          },
          {
            question: "How do you handle confidentiality?",
            answer: "All information is treated with reserve and internal documentary control.",
          },
          {
            question: "Does this include court representation?",
            answer: "No. We focus on prevention, documentation, and strategic support.",
          },
          {
            question: "What is included in a strategic evaluation?",
            answer: "Initial diagnosis, scope definition, and control priorities.",
          },
        ],
      },
      finalCta: {
        title: "Request strategic evaluation",
        description: "Let us review the context, scope, and level of exposure.",
        note: "Response within 24–48 business hours.",
        ctaPrimary: "Request strategic evaluation",
        ctaSecondary: "See how we work",
      },
      businessFocus: {
        pill: "Corporate Defense",
        title: "Preventive criminal risk for governing bodies and sensitive contracting",
        paragraphs: [
          "We advise boards, committees, and legal representatives who require preventive criminal judgment, executive documentation, and clear limits for high-impact decisions.",
          "The focus is traceability: minutes, criteria, and approval routes that help justify decisions before internal and external oversight.",
        ],
        cards: [
          { title: "Traceability", body: "Executive documentation and audit-ready support." },
          { title: "Judgment", body: "Clear limits, risks, and responsible parties." },
          { title: "Activation", body: "Tactical sessions when incidents or alerts arise." },
        ],
        noteLabel: "Parallel line",
        noteText: "Individual advisory is handled as a secondary line under availability.",
      },
      businessPanel: {
        badges: ["Primary focus", "Corporate criminal"],
        title: "Executive support for boards and committees",
        paragraphs: [
          "We define rhythm, documentation, and responsibilities in high-impact decisions: minutes, criteria, and audit-ready reports.",
          "Training and board sessions complement the support with rules of action and clear documentation.",
        ],
        cards: [
          { title: "Activation", body: "Urgent sessions with key owners to define scope." },
          { title: "Execution", body: "Executive documentation and compliance coordination." },
        ],
        ctas: [
          { label: "Service details", href: "/servicios" },
          { label: "Coordinate with board", href: "/contacto" },
        ],
      },
      serviceAreas: {
        pill: "Services",
        title: "Active criminal risk areas",
        description:
          "Services enabled based on client context. We prioritize traceability, documentation, and decision control.",
        noteLabel: "Training",
        noteText: "Executive sessions for boards, compliance, and legal teams.",
        cta: "View services",
        statusActive: "Active",
        statusInquiry: "Inquiry",
        advisoryCta: "Individuals advisory",
        contactCta: "Contact",
        trainingCta: "Corporate Defense",
        advisoryTitle: "Individuals",
        advisoryDescription: "Preventive advisory with real availability and documentary support.",
        advisoryItems: [
          "Access with basic validation.",
          "Select an available time.",
          "Payment when booking the session.",
        ],
        advisoryNote: "We coordinate with defense counsel when already engaged.",
        agendaTitle: "Defense coordination",
        agendaDescription: "Traceability of instructions and agreements with lead counsel.",
        agendaItems: [
          "Short, focused sessions.",
          "Instruction logs and support.",
          "Follow-up on the agreed plan.",
        ],
        agendaNote: "Payment is enabled only when a slot is available.",
        trainingTitle: "Training",
        trainingDescription: "Executive training on criminal responsibility and documentation.",
        trainingItems: [
          "Executive talks for boards and committees.",
          "Internal training for legal and compliance teams.",
          "Virtual or in-person in Spanish or English.",
        ],
      },
      peopleLine: {
        title: "Individuals",
        paragraphs: [
          "Individuals advisory is a parallel line with real availability and coordination with defense when needed.",
          "Each session records agreements and service limits.",
        ],
        cards: [
          { title: "Real availability", body: "Only confirmed times are shown." },
          { title: "Pay to book", body: "Enabled when selecting a real slot." },
          { title: "Coordination", body: "Aligned with defense counsel when applicable." },
        ],
      },
      methodology: {
        pill: "Methodology",
        title: "How we work",
        pillars: [
          { title: "Diagnosis", body: "Context and critical facts to define scope." },
          { title: "Protocols", body: "Rules of action and executive documentation." },
          { title: "Activation", body: "Tactical support and decision follow-up." },
        ],
        steps: [
          { title: "Review", body: "Documents, actors, and timeline." },
          { title: "Criteria", body: "Limits and approval routes." },
          { title: "Report", body: "Deliverables ready for board review." },
        ],
      },
      motivations: {
        title: "Why clients engage us",
        items: [
          { title: "Sensitive decisions", body: "Boards and committees needing preventive criminal judgment." },
          { title: "Public procurement", body: "Processes exposed to audits and oversight." },
          { title: "Urgent incidents", body: "Tactical activations to contain risk." },
        ],
      },
      deliveries: {
        title: "What we deliver",
        items: [
          { title: "Minutes", body: "Executive, traceable records of decisions." },
          { title: "Protocols", body: "Clear rules of action and documentation." },
          { title: "Risk maps", body: "Mitigation routes with owners and controls." },
        ],
      },
      scenarios: {
        title: "Frequent scenarios",
        items: [
          { title: "Boards and committees", body: "Decisions with criminal exposure and documentation needs." },
          { title: "Public procurement", body: "Critical processes with continuous oversight." },
          { title: "Crises and incidents", body: "Urgent activations to define scope and responsibility." },
        ],
      },
    },
    business: {
      hero: {
        title: "Corporate Defense: preventive judgment for critical decisions",
        subtitle: "Preventive support for boards, committees, and legal teams.",
        description:
          "We define criteria, limits, and executive documentation that support sensitive decisions before internal and external oversight.",
        items: [
          "Executive documentation and traceability.",
          "Activatable protocols and escalation routes.",
          "Training for governing bodies.",
        ],
        ctaPrimary: "Request strategic evaluation",
        ctaSecondary: "See how we work",
      },
      problems: {
        title: "Typical scenarios",
        items: [
          {
            title: "Public procurement",
            body: "Processes exposed to oversight that require judgment and traceability.",
          },
          {
            title: "Boards and committees",
            body: "Critical decisions needing executive documentation and clear limits.",
          },
          {
            title: "Criminal compliance",
            body: "Internal risks that demand protocols, owners, and approval routes.",
          },
        ],
      },
      deliverables: {
        title: "Key deliverables",
        items: [
          { title: "Executive minutes", body: "Clear record of decisions and criteria adopted." },
          { title: "Protocols", body: "Rules of action and documentation for each front." },
          { title: "Risk maps", body: "Priorities, owners, and defined controls." },
        ],
      },
      faq: {
        title: "Frequently asked questions",
        items: [
          {
            question: "Does it include court representation?",
            answer: "No. We focus on prevention, documentation, and strategic support.",
          },
          {
            question: "What does the board receive?",
            answer: "Minutes, criteria, protocols, and traceable audit support.",
          },
          {
            question: "How are urgent decisions handled?",
            answer: "We activate tactical sessions and support documentation.",
          },
          {
            question: "Does it include training?",
            answer: "Yes. Talks and workshops for boards and internal teams.",
          },
        ],
      },
      services: {
        title: "Services and active lines",
        intro:
          "We work with corporate leaders who need order, traceability, and preventive criminal support. Training is integrated into control.",
        blocks: [
          {
            title: "Preventive diagnosis",
            body: "Initial assessment to define risks, scope, and responsible parties.",
          },
          {
            title: "Protocols and criteria",
            body: "Rules of action and documentation for sensitive decisions.",
          },
          {
            title: "Board accompaniment",
            body: "Executive sessions with minutes, agreements, and traceability.",
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
        title: "Individuals with preventive focus",
        subtitle: "Parallel line with real availability and defense coordination when needed.",
        description:
          "Responsible advisory, no outcome promises, and documentary traceability in every session.",
        items: [
          "Schedule based on real availability.",
          "Payment when booking the session.",
          "Recorded agreements and limits.",
        ],
        ctaPrimary: "Book advisory",
        ctaSecondary: "View process",
      },
      flow: {
        title: "Advisory process",
        description: "A short, clear route for individual sessions.",
        steps: [
          { title: "Registration and context", body: "We receive essential information and validate scope." },
          { title: "Available time", body: "Select a real slot and confirm the booking." },
          { title: "Session and record", body: "Focused session with documented agreements and next steps." },
        ],
        notes: [
          "We coordinate with existing defense counsel when applicable.",
          "We do not provide litigation or court representation.",
        ],
      },
      expectations: {
        title: "What to expect",
        items: [
          { title: "Confidentiality", body: "Reserved handling of information and documentary support." },
          { title: "Preventive judgment", body: "Focus on responsible decisions and clear limits." },
          { title: "Traceability", body: "Records of agreements, instructions, and commitments." },
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
        title: "Request strategic evaluation",
        description:
          "Share the context and level of exposure. We reply with the appropriate route and next steps.",
      },
      form: {
        title: "Send us a message",
        description: "This information is confidential. We respond within 24–48 business hours.",
        fields: {
          name: "Full name",
          company: "Company",
          role: "Role or title",
          email: "Email",
          phone: "Phone",
          caseType: "Situation type",
          urgency: "Urgency level",
          message: "Share the context",
          privacy: "I accept data processing",
          submit: "Request strategic evaluation",
        },
        options: {
          caseType: [
            "Public procurement",
            "Board or committee decision",
            "Corporate criminal risk",
            "Individual advisory",
            "Other",
          ],
          urgency: ["Immediate (24–48h)", "High (7 days)", "Standard (15 days)"],
        },
      },
      info: {
        title: "You can also",
        items: [
          "Coordinate a board or committee session",
          "Request an internal training",
          "See how we work before scheduling",
        ],
      },
    },
    servicesPage: {
      hero: {
        title: "Services and engagement lines",
        description:
          "Select the line that fits your context. Each service includes traceability and clear limits.",
        cta: "Back to home",
      },
      sections: [
        {
          title: "Corporate Defense",
          body: "Diagnosis, activatable protocols, and executive support for boards and committees.",
        },
        {
          title: "Training",
          body: "Talks and internal workshops for boards, compliance, and legal teams.",
        },
        {
          title: "Individuals",
          body: "Preventive advisory with real availability and defense coordination when applicable.",
        },
      ],
    },
    methodologyPage: {
      hero: {
        title: "Methodology",
        subtitle: "Diagnosis → Protocols → Activation with clear, traceable deliverables.",
        note: "Does not include litigation or court representation.",
      },
      phases: [
        {
          title: "Diagnosis",
          description: "Review of context, actors, risks, and existing documentation.",
          deliverables: ["Preliminary risk map", "Critical timeline", "Scope and priorities"],
        },
        {
          title: "Protocols",
          description: "Definition of criteria, approval routes, and executive documentation.",
          deliverables: ["Decision criteria", "Executive minutes and formats", "Control checklist"],
        },
        {
          title: "Activation",
          description: "Tactical support in key sessions and follow-up.",
          deliverables: ["Decision log", "Coordinated instructions", "Follow-up plan"],
        },
      ],
      safeguards: {
        title: "Judgment safeguards",
        items: [
          "Confidentiality and documentary traceability.",
          "Clear service limits from the outset.",
          "Coordination with defense counsel when applicable.",
        ],
      },
      faq: {
        title: "Frequently asked questions",
        items: [
          {
            question: "How long does each phase take?",
            answer: "It depends on scope. We prioritize executive deliverables in short cycles.",
          },
          {
            question: "What does the board receive?",
            answer: "Minutes, criteria, checklists, and traceable decision support.",
          },
          {
            question: "Does it include court representation?",
            answer: "No. The methodology focuses on prevention and documentation.",
          },
          {
            question: "Can it integrate with internal compliance?",
            answer: "Yes, we coordinate with internal stakeholders.",
          },
        ],
      },
      cta: {
        title: "Request strategic evaluation",
        description: "Define the scope and the right phase for your case.",
        primary: "Request strategic evaluation",
        secondary: "See how we work",
      },
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
