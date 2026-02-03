import api from "../api.service";
import { Filters } from "@/modules/filter/filter.interface";
import { Attribute, AttributeAdmin } from "./attribute.interface";

export const getAttribute = async () => {
    try {
        const response = await api.get("attribute/");
        return response.data as Attribute[];
    } catch (error) {
        console.error("Error fetching attributes", error);
        throw error;
    }
};

export const getAdminAttribute = async (filters?: Filters) => {
    try {
        const params = filters ? { ...filters } : {};
        const response = await api.get("admin/attribute/", { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching attributes", error);
        throw error;
    }
};

export const getAttributeById = async (id: string) => {
    try {
        const response = await api.get(`admin/attribute/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching attribute by ID", error);
        throw error;
    }
};

export const createAttribute = async (data: { name: string }) => {
    try {
        const response = await api.post("admin/attribute/", data);
        return response.data;
    } catch (error) {
        console.error("Error creating attribute", error);
        throw error;
    }
};

export const updateAttribute = async (id: string, data: { name: string }) => {
    try {
        const response = await api.patch(`admin/attribute/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating attribute", error);
        throw error;
    }
};

export const deleteAttribute = async (id: string) => {
    try {
        await api.delete(`admin/attribute/${id}/`);
    } catch (error) {
        console.error("Error deleting attribute", error);
        throw error;
    }
};
