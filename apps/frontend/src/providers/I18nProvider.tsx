"use client";

import { createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { getLangFromPath } from "@/utils/getLangFromPath";
import "@/i18n/config";

type Language = "en" | "es";

interface I18nContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const pathname = usePathname();

  const language = i18n.language as Language;

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const langFromPath = getLangFromPath(pathname) || "es"; // Siempre devolverá un idioma válido
    if (langFromPath !== i18n.language) {
      i18n.changeLanguage(langFromPath);
    }
  }, [pathname, i18n]);

  return (
    <I18nContext.Provider value={{ language, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
