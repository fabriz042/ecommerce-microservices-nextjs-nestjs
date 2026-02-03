import api from "../api.service";
import { Filters } from "@/modules/filter/filter.interface";
import { Sport, SportAdmin } from "./sport.interface";

export const getSports = async () => {
    try {
        const response = await api.get("sports/");
        return response.data as Sport[];
    } catch (error) {
        console.error("Error fetching sports", error);
        throw error;
    }
};

export const getAdminSports = async (filters?: Filters) => {
    try {
        const params = filters ? { ...filters } : {};
        const response = await api.get("admin/sports/", { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching sports", error);
        throw error;
    }
};

export const getSportById = async (id: string) => {
    try {
        const response = await api.get(`admin/sports/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching sport by ID", error);
        throw error;
    }
};

export const createSport = async (data: { name: string }) => {
    try {
        const response = await api.post("admin/sports/", data);
        return response.data;
    } catch (error) {
        console.error("Error creating sport", error);
        throw error;
    }
};

export const updateSport = async (id: string, data: { name: string }) => {
    try {
        const response = await api.patch(`admin/sports/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating sport", error);
        throw error;
    }
};

export const deleteSport = async (id: string) => {
    try {
        await api.delete(`admin/sports/${id}/`);
    } catch (error) {
        console.error("Error deleting sport", error);
        throw error;
    }
};
