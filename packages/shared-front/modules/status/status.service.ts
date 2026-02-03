import api from "../api.service";

import { Filters } from "@/modules/filter/filter.interface";

export const getStatus = async () => {
  try {
    const response = await api.get("status/");
    return response.data;
  } catch (error) {
    console.error("Error fetching status", error);
    throw error;
  }
};

export const getAdminStatus = async (filters?: Filters) => {
  try {
    const params = filters ? { ...filters } : {};
    const response = await api.get("admin/status/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching status", error);
    throw error;
  }
};

export const getStatusById = async (id: string) => {
  try {
    const response = await api.get(`admin/status/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching status by ID", error);
    throw error;
  }
};

export const createStatus = async (data: { name: string }) => {
  try {
    const response = await api.post("admin/status/", data);
    return response.data;;
  } catch (error) {
    console.error("Error creating status", error);
    throw error;
  }
};

export const updateStatus = async (id: string, data: { name: string }) => {
  try {
    const response = await api.patch(`admin/status/${id}/`, data);
    return response.data;;
  } catch (error) {
    console.error("Error updating status", error);
    throw error;
  }
};

export const deleteStatus = async (id: string) => {
  try {
    await api.delete(`admin/status/${id}/`);
  } catch (error) {
    console.error("Error deleting status", error);
    throw error;
  }
};