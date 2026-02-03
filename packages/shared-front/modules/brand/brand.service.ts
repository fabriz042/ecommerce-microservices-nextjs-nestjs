import api from "../api.service";

import { Filters } from "@/modules/filter/filter.interface";
import { Brand, BrandAdmin } from "./brand.interface";

export const getBrands = async () => {
  try {
    const response = await api.get("brand/");
    return response.data as Brand[];
  } catch (error) {
    console.error("Error fetching brands", error);
    throw error;
  }
};

export const getAdminBrand = async (filters?: Filters) => {
  try {
    const params = filters ? { ...filters } : {};
    const response = await api.get("admin/brand/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching brands", error);
    throw error;
  }
};

export const getBrandById = async (id: string) => {
  try {
    const response = await api.get(`admin/brand/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching brand by ID", error);
    throw error;
  }
};

export const createBrand = async (data: { name: string }) => {
  try {
    const response = await api.post("admin/brand/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating brand", error);
    throw error;
  }
};

export const updateBrand = async (id: string, data: { name: string }) => {
  try {
    const response = await api.patch(`admin/brand/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating brand", error);
    throw error;
  }
};

export const deleteBrand = async (id: string) => {
  try {
    await api.delete(`admin/brand/${id}/`);
  } catch (error) {
    console.error("Error deleting brand", error);
    throw error;
  }
};
