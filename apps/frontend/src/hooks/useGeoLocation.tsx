"use client";
import { useState, useEffect } from "react";

const getCountryConfig = (code: string) => {
  return (
    countryConfig[code as keyof typeof countryConfig] || countryConfig["PE"]
  );
};

const countryConfig = {
  CL: { name: "Chile", currency: "USD" },
  PE: { name: "Peru", currency: "s./" },
  MX: { name: "Mexico", currency: "MXN" },
};

// Function to get data from localStorage
const getStorageValue = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

export const useGeoLocation = () => {
  const [location, setLocation] = useState({
    countryName: "Peru",
    currency: "s./",
  });

  // Function to change location manually
  const changeLocation = (countryCode: string) => {
    const config = getCountryConfig(countryCode);

    const newLocation = {
      countryName: config.name,
      currency: config.currency,
    };

    setLocation(newLocation);
    localStorage.setItem("geoLocation", JSON.stringify(newLocation)); // Save in localstorage
  };

  useEffect(() => {
    // First check if it already exists in localStorage
    const savedData = getStorageValue("geoLocation");
    if (savedData) {
      setLocation(savedData);
      return; // If there is saved data, do not fetch
    }

    // Only fetch if there is no saved data
    const detectLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        const apiCountryCode = data.country_code as string;
        const config = getCountryConfig(apiCountryCode);

        const newLocation = {
          countryName: config.name,
          currency: config.currency,
        };

        setLocation(newLocation);
        localStorage.setItem("geoLocation", JSON.stringify(newLocation)); // Save in localstorage
      } catch {
        const fallback = {
          countryName: "Peru",
          currency: "s./",
        };
        setLocation(fallback);
        localStorage.setItem("geoLocation", JSON.stringify(fallback));
      }
    };

    detectLocation();
  }, []);

  return { location, changeLocation };
};
