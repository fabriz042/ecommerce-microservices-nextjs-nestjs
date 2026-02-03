import api from "../api.service";

import { Filters } from "@/modules/filter/filter.interface";
import { Category } from "./category.interface";

export interface CategoryAdmin extends Category { }

export const getCategories = async () => {
    try {
        const response = await api.get("category/");
        return response.data as Category[];
    } catch (error) {
        console.error("Error fetching categories", error);
        throw error;
    }
};

export const getAdminCategory = async (filters?: Filters) => {
    try {
        const params = filters ? { ...filters } : {};
        const response = await api.get("admin/category/", { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching categories", error);
        throw error;
    }
};

export const getCategoryById = async (id: string) => {
    try {
        const response = await api.get(`admin/category/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching category by ID", error);
        throw error;
    }
};

export const createCategory = async (data: { name: string }) => {
    try {
        const response = await api.post("admin/category/", data);
        return response.data;
    } catch (error) {
        console.error("Error creating category", error);
        throw error;
    }
};

export const updateCategory = async (id: string, data: { name: string }) => {
    try {
        const response = await api.patch(`admin/category/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating category", error);
        throw error;
    }
};

export const deleteCategory = async (id: string) => {
    try {
        await api.delete(`admin/category/${id}/`);
    } catch (error) {
        console.error("Error deleting category", error);
        throw error;
    }
};
