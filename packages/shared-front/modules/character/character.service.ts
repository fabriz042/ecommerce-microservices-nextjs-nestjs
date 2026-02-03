import api from "../api.service";
import { Filters } from "@/modules/filter/filter.interface";
import { Character } from "./character.interface";

export interface CharacterAdmin extends Character { }

export const getCharacter = async () => {
  try {
    const response = await api.get("character/");
    return response.data as Character[];
  } catch (error) {
    console.error("Error fetching character", error);
    throw error;
  }
};

export const getAdminCharacter = async (filters?: Filters) => {
  try {
    const params = filters ? { ...filters } : {};
    const response = await api.get("admin/character/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching character", error);
    throw error;
  }
};

export const getCharacterById = async (id: string) => {
  try {
    const response = await api.get(`admin/character/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching character by ID", error);
    throw error;
  }
};

export const createCharacter = async (data: { name: string }) => {
  try {
    const response = await api.post("admin/character/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating character", error);
    throw error;
  }
};

export const updateCharacter = async (id: string, data: { name: string }) => {
  try {
    const response = await api.patch(`admin/character/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating character", error);
    throw error;
  }
};

export const deleteCharacter = async (id: string) => {
  try {
    await api.delete(`admin/character/${id}/`);
  } catch (error) {
    console.error("Error deleting character", error);
    throw error;
  }
};
