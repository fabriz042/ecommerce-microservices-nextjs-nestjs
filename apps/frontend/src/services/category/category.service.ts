import api from "@/services/api.service";

import { Category } from "@/domain/entities/category";

export const getCategories = async () => {
  try {
    const response = await api.get("categories/");
    return response.data as Category[];
  } catch (error) {
    console.error("Error fetching categories", error);
    throw error;
  }
};
