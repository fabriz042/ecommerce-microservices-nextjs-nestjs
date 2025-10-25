import api from "@/services/api.service";

import { Category } from "@/types/category";

export const getCategory = async () => {
  try {
    const response = await api.get("category/");
    return response.data as Category[];
  } catch (error) {
    console.error("Error fetching categories", error);
    throw error;
  }
};
