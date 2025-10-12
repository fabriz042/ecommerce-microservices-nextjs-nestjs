import api from "@/services/api.service";

import { Brand } from "@/types/brand";

export const getBrands = async () => {
  try {
    const response = await api.get("brands/");
    return response.data as Brand[];
  } catch (error) {
    console.error("Error fetching brands", error);
    throw error;
  }
};
