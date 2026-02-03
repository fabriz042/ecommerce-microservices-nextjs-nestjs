import api from "../api.service";
import { Filters } from "@/modules/filter/filter.interface";
import { Tag, TagAdmin } from "./tag.interface";

export const getTags = async () => {
    try {
        const response = await api.get("tags/");
        return response.data as Tag[];
    } catch (error) {
        console.error("Error fetching tags", error);
        throw error;
    }
};

export const getAdminTags = async (filters?: Filters) => {
    try {
        const params = filters ? { ...filters } : {};
        const response = await api.get("admin/tags/", { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching tags", error);
        throw error;
    }
};

export const getTagById = async (id: string) => {
    try {
        const response = await api.get(`admin/tags/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tag by ID", error);
        throw error;
    }
};

export const createTag = async (data: { name: string }) => {
    try {
        const response = await api.post("admin/tags/", data);
        return response.data;
    } catch (error) {
        console.error("Error creating tag", error);
        throw error;
    }
};

export const updateTag = async (id: string, data: { name: string }) => {
    try {
        const response = await api.patch(`admin/tags/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating tag", error);
        throw error;
    }
};

export const deleteTag = async (id: string) => {
    try {
        await api.delete(`admin/tags/${id}/`);
    } catch (error) {
        console.error("Error deleting tag", error);
        throw error;
    }
};
