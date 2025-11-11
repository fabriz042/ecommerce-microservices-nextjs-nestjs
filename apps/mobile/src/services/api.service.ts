import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Log from url
console.log("Base URL:", process.env.EXPO_PUBLIC_API_URL);

export default api;
