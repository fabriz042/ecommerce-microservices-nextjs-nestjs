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
    <header className="justify-center flex top-0 relative debug">
      <div className="flex relative space-x-12 z-50 items-center bg-gray-800 shadow-xl w-full justify-center h-20">
        {/*Country and lang*/}
        <div className="absolute top-0 right-0  flex p-2 space-x-3 ">
          <DropdownCountry />
          <SwitchLang />
        </div>
        {/*Logo*/}
        <div>
          <Link href={`/${language}`}>
            <Image
              src="/images/MainLogo.png"
              alt="Logo"
              width={170}
              height={170}
            />
          </Link>
        </div>
        {/*Categories Menu*/}
        <div className="flex space-x-5">
          <div>
            <h1 className="text-2xl text-title cursor-pointer hover:underline">
              {t("categories")}
            </h1>
          </div>
          <div>
            <h1 className="text-2xl text-title cursor-pointer">
              {t("promotions")}
            </h1>
          </div>
          <div>
            <Link href={`/${language}/blog`}>
              <h1 className="text-2xl text-title">{t("blog")}</h1>
            </Link>
          </div>
        </div>
        {/*Search Bar*/}
        <div>
          <SearchBar />
        </div>
        {/*User Menu*/}
        <div className="flex space-x-3">
          <AiOutlineUser className="h-10 w-10 text-title" />
          <MdFavoriteBorder className="h-10 w-10 text-title" />
        </div>
      </div>
    </header>
  );
}
