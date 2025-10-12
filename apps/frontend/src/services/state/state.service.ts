import api from "@/services/api.service";
import { State } from "@/domain/entities/state";

export const getStates = async () => {
  try {
    const response = await api.get("states/");
    return response.data as State[];
  } catch (error) {
    console.error("Error fetching states", error);
    throw error;
  }
};
