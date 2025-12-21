export const supportedLocales = ["es", "en"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = "es";

export const dictionaries: Record<SupportedLocale, any> = {
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
    },
    hero: {
      languageToggle: "Idioma",
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
    },
    hero: {
      languageToggle: "Language",
    },
  },
};
