"use client";
import { useState, useEffect } from "react";
import "flag-icons/css/flag-icons.min.css";
import { useGeoLocation } from "@/hooks/useGeoLocation";

const DropdownCountry = () => {
  const { location, changeLocation } = useGeoLocation();
  const [selectedCountry, setSelectedCountry] = useState("pe");
  const [isOpen, setIsOpen] = useState(false);

  const countries = [
    { code: "cl", name: "Chile", flag: "fi fi-cl", countryCode: "CL" },
    { code: "mx", name: "México", flag: "fi fi-mx", countryCode: "MX" },
    { code: "pe", name: "Perú", flag: "fi fi-pe", countryCode: "PE" },
  ];

  // Sincronizar el dropdown con la ubicación del hook
  useEffect(() => {
    const currencyToCode = {
      USD: "cl",
      MXN: "mx",
      PEN: "pe",
    };
    const countryCode =
      currencyToCode[location.currency as keyof typeof currencyToCode] || "pe";
    setSelectedCountry(countryCode);
  }, [location.currency]);

  const currentCountry = countries.find((c) => c.code === selectedCountry);

  return (
    <div>
      <button
        className="text-textBlanco flex justify-between items-center text-md w-25 px-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`fi ${currentCountry?.flag} w-4 h-3`}></span>
        <span>{currentCountry?.name}</span>
        <span className="text-xs">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-10 bg-colorOscuro border border-gray-600 rounded shadow-lg z-10">
          {countries.map((country) => (
            <button
              key={country.code}
              className="flex items-center space-x-2 w-full px-2 py-1 text-textBlanco hover:bg-white/20 text-md cursor-pointer"
              onClick={() => {
                setSelectedCountry(country.code);
                changeLocation(country.countryCode); // Actualizar la ubicación en el hook
                setIsOpen(false);
              }}
            >
              <span className={`fi ${country.flag} w-4 h-3`}></span>
              <span>{country.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default DropdownCountry;
