import api from "@/services/api.service";

interface Busqueda {
  search: string;
  limit?: number;
  page?: number;
  status?: string;
  brand?: string;
  category?: string;
}

export const getSearchResults = async ({
  search,
  limit,
  status,
  page,
  brand,
  category,
}: Busqueda) => {
  try {
    const params = new URLSearchParams();
    params.append("search", search);
    if (limit) params.append("limit", limit.toString());
    if (status) params.append("status", status.toString());
    if (brand) params.append("brand", brand.toString());
    if (page) params.append("page", page.toString());
    if (category) params.append("category", category.toString());

    const response = await api.get(`products/?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error to fetch search results", error);
    throw error;
  }
};

export const getDetalles = async (slug: string) => {
  try {
    const response = await api.get(`products/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error to fetch product details", error);
    throw error;
  }
};
