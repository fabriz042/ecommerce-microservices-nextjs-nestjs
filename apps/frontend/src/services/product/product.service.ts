import api from "@/services/api.service";

interface Busqueda {
  search: string;
  per_page?: number;
  page?: number;
  status?: string;
  brand?: string;
  category?: string;
}

export const getSearchResults = async ({
  search,
  per_page,
  status,
  page,
  brand,
  category,
}: Busqueda) => {
  try {
    const params = new URLSearchParams();
    params.append("search", search);
    if (per_page) params.append("per_page", per_page.toString());
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
