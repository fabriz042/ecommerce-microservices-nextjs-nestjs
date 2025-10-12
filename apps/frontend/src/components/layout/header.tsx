"use client";

import Image from "next/image";
import SearchBar from "@/components/ui/SearchBar";
import { AiOutlineUser } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import Link from "next/link";
import SwitchLang from "@/components/ui/SwitchLang";
import DropdownCountry from "@/components/ui/DropdownCountry";

import { useTranslation } from "react-i18next";

import { useI18n } from "@/providers/I18nProvider";

export default function Header() {
  const { language } = useI18n();
  const { t } = useTranslation("common");

  return (
    <header className="justify-center flex top-0 relative">
      {/*Country and lang*/}
      <div className="absolute top-0 right-0 z-50 flex p-3 space-x-3">
        <DropdownCountry />
        <SwitchLang />
      </div>
      <div className="flex fixed space-x-12 z-50 items-center">
        {/*Logo*/}
        <div>
          <Link href={`/${language}`}>
            <Image src="/logo.png" alt="Logo" width={150} height={150} />
          </Link>
        </div>
        {/*Menu Categorias*/}
        <div className="flex space-x-5">
          <div>
            <h1 className="text-2xl text-title font-medium">
              {t("categories")}
            </h1>
          </div>
          <div>
            <h1 className="text-2xl text-title font-medium">
              {t("promotions")}
            </h1>
          </div>
          <div>
            <h1 className="text-2xl text-title font-medium">{t("blog")}</h1>
          </div>
        </div>
        {/*Barra Busqueda*/}
        <div>
          <SearchBar />
        </div>
        {/*Menu Usuario*/}
        <div className="flex space-x-3">
          <AiOutlineUser className="h-10 w-10 text-title" />
          <MdFavoriteBorder className="h-10 w-10 text-title" />
        </div>
      </div>
    </header>
  );
}
