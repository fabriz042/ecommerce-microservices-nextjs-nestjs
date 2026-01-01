import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/";

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Log from url
console.log("Base URL:", baseURL);
export default api;
