import api from "../api.service";
import { Character } from "./character.interface";

export const getCharacter = async () => {
  try {
    const response = await api.get("character/");
    return response.data as Character[];
  } catch (error) {
    console.error("Error fetching character", error);
    throw error;
  }
};
