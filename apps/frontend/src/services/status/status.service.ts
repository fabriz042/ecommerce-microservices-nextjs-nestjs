import api from "@/services/api.service";
import { Status } from "@/types/status";

export const getStatus = async () => {
  try {
    const response = await api.get("status/");
    return response.data as Status[];
  } catch (error) {
    console.error("Error fetching status", error);
    throw error;
  }
};
