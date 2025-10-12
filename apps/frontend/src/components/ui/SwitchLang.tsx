"use client";
import { useI18n } from "@/providers/I18nProvider";
import { useRouter, usePathname } from "next/navigation";

const SwitchLang = () => {
  const { language, changeLanguage } = useI18n();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLang = language === "en" ? "es" : "en";
    changeLanguage(newLang);

    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center">
      <button
        className="w-12 h-5 bg-gray-600 rounded-full relative cursor-pointer"
        onClick={toggleLanguage}
      >
        <div
          className={`mt-[-2px] absolute top-0 left-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow transition-transform ${
            language === "en" ? "translate-x-0" : "translate-x-6"
          }`}
        >
          <span className="text-gray-800 text-xs font-medium">
            {language.toUpperCase()}
          </span>
        </div>
      </button>
    </div>
  );
};

export default SwitchLang;
