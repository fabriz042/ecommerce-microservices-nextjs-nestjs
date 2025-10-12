import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importar los recursos de traducción
import enCommon from "../locales/en/common.json";
import esCommon from "../locales/es/common.json";

const resources = {
  en: {
    common: enCommon,
  },
  es: {
    common: esCommon,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es", // idioma por defecto
  fallbackLng: "es",
  supportedLngs: ["en", "es"],
  ns: ["common"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false, // Evita problemas con hydration
  },
});

export default i18n;
