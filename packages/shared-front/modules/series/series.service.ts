import api from "../api.service";
import { Series } from "../series";

export const getSeries = async () => {
  try {
    const response = await api.get("series/");
    return response.data as Series[];
  } catch (error) {
    console.error("Error fetching series", error);
    throw error;
  }
};
