import api from "../api.service";
import { Filters } from "@/modules/filter/filter.interface";
import { Series } from "./series.interface";

export interface SeriesAdmin extends Series { }

export const getSeries = async () => {
  try {
    const response = await api.get("series/");
    return response.data as Series[];
  } catch (error) {
    console.error("Error fetching series", error);
    throw error;
  }
};

export const getAdminSeries = async (filters?: Filters) => {
  try {
    const params = filters ? { ...filters } : {};
    const response = await api.get("admin/series/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching series", error);
    throw error;
  }
};

export const getSeriesById = async (id: string) => {
  try {
    const response = await api.get(`admin/series/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching series by ID", error);
    throw error;
  }
};

export const createSeries = async (data: { name: string }) => {
  try {
    const response = await api.post("admin/series/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating series", error);
    throw error;
  }
};

export const updateSeries = async (id: string, data: { name: string }) => {
  try {
    const response = await api.patch(`admin/series/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating series", error);
    throw error;
  }
};

export const deleteSeries = async (id: string) => {
  try {
    await api.delete(`admin/series/${id}/`);
  } catch (error) {
    console.error("Error deleting series", error);
    throw error;
  }
};
