"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Image from "next/image";
import { useI18n } from "@/providers/I18nProvider";

import { AiOutlineSearch } from "react-icons/ai";

import { getSearchResults } from "@/services/product/product.service";

import { PaginatedProducts } from "@/domain/entities/product";

const moneda = "s/. ";
const searchSuggestions = [
  "Guantes Rawlings",
  "Equipos deportivos",
  "Bolsa para beisbol",
];
const SearchBar = () => {
  const { language } = useI18n();

  const handleSearch = () => {
    setIsOpen(false);
  };

  // Logic to open and close the search box
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [searchStatus, setSearchStatus] = useState("");

  // Logic to manage the search input and results
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [productsData, setProductsData] = useState<PaginatedProducts>({
    count: 0,
    num_pages: 0,
    results: [],
  });
  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (ref.current?.contains(event.target as Node)) {
        if (search.trim() !== "") {
          setIsOpen(true);
        }
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", handleOutSideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref, search, isOpen]);

  // USEFFECT to delay the search and avoid overloading the API
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search); // Updates the value after the delay
    }, 300);

    return () => {
      clearTimeout(handler); // Clears the timeout if the user keeps typing
    };
  }, [search]);

  // USEFFECT to call the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsData({ count: 0, num_pages: 0, results: [] });
        setSearchStatus("Searching...");
        const data = await getSearchResults({
          search: debouncedSearch,
          limit: 4,
        });

        setProductsData(data);
        setSearchStatus(
          data.count === 0
            ? "No se encontraron productos"
            : `Ver los ${data.count} productos encontrados ->`
        );
      } catch (error) {
        console.error("Error fetching the product list", error);
      }
    };
    if (debouncedSearch.trim() !== "") {
      fetchProducts();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [debouncedSearch]);

  // Typing effect for the placeholder-----------------------------------------------------------------
  const [placeholderText, setPlaceholderText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [inputFocused, setInputFocused] = useState(false);
  useEffect(() => {
    if (inputFocused) return;
    const currentSuggestion = searchSuggestions[currentSuggestionIndex];

    if (isTyping) {
      if (placeholderText.length < currentSuggestion.length) {
        const timer = setTimeout(() => {
          setPlaceholderText(
            currentSuggestion.substring(0, placeholderText.length + 1)
          );
        }, 70); // Typing speed
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, 1000);
        return () => clearTimeout(timer);
      }
    } else {
      if (placeholderText.length > 0) {
        const timer = setTimeout(() => {
          setPlaceholderText(
            currentSuggestion.substring(0, placeholderText.length - 1)
          );
        }, 25); // Deleting speed
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentSuggestionIndex(
            (prevIndex) => (prevIndex + 1) % searchSuggestions.length
          );
          setIsTyping(true);
        }, 300); // Time before starting to type again
        return () => clearTimeout(timer);
      }
    }
  }, [placeholderText, isTyping, currentSuggestionIndex, inputFocused]);

  return (
    <div className="w-full flex relative mr-5 ml-5" ref={ref}>
      <div className="w-full flex">
        <input
          className={`h-[50px] w-full bg-white/70 ${
            isOpen ? "rounded-t-[30px]" : "rounded-[30px]"
          } text-xl pl-[30px] pr-[70px] text-black focus:outline-none`}
          type="text"
          placeholder={placeholderText}
          onFocus={() => {
            setInputFocused(true);
            setPlaceholderText("");
          }}
          onBlur={() => {
            if (!search) {
            }
            const timer = setTimeout(() => {
              setInputFocused(false);
            }, 700);
            return () => clearTimeout(timer);
          }}
          required
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="cursor-pointer" onClick={() => setSearch("")}>
          <Link
            href={search ? `/${language}/productos/busqueda/${search}` : "#"}
            onClick={handleSearch}
          >
            <AiOutlineSearch className="text-black h-[40px] w-[40px] ml-[-50px] mt-1" />
          </Link>
        </div>
      </div>

      <div
        className="bg-white/70 absolute w-full mt-[50px] p-3 z-20 rounded-b-[30px]"
        style={{ display: isOpen ? "block" : "none" }}
      >
        {productsData.results.map(({ name, price, slug, images }) => (
          <Link href={`/productos/categoria/${slug}`} key={slug}>
            <div
              className="flex space-x-1 rounded-lg p-3 m-1 border-2 border-black-500 cursor-pointer bg-slate-200 hover:bg-slate-300 shadow-sm"
              onClick={handleSearch}
            >
              <div className="border-red-500 border-2 col-start-3 h-[70px] w-[70px] items-center flex bg-white">
                {images && images.length > 0 && (
                  <Image
                    src={images[0].image_url}
                    alt={images[0].alt_text}
                    width={70}
                    height={70}
                    className="object-contain max-w-full max-h-full"
                  />
                )}
              </div>
              <div className="border-black border-2 col-start-4 text-lg items-center flex">
                {name}
              </div>
              <div className="border-green-500 border-2 col-start-6 text-lg ml-auto items-center flex">
                {moneda}
                {price.toLocaleString("en-US")}
              </div>
            </div>
          </Link>
        ))}

        {/* Url to view all results */}
        <Link
          href={
            language === "es"
              ? `/es/productos/busqueda/${search}`
              : `/en/products/search/${search}`
          }
        >
          <div className="text-right cursor-pointer" onClick={handleSearch}>
            <div className="p-2">
              <p>{searchStatus}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
