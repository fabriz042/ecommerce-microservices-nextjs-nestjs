import api from "../api.service";

import { Filters } from "@/modules/filter/filter.interface";

export const getStatus = async (filters?: Filters) => {
  try {
    const params = filters ? { ...filters } : {};
    const response = await api.get("admin/status/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching status", error);
    throw error;
  }
};

export const deleteStatus = async (id: string) => {
  try {
    await api.delete(`status/${id}/`);
  } catch (error) {
    console.error("Error deleting status", error);
    throw error;
  }
};