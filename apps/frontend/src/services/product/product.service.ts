import api from "@/services/api.service";

interface Busqueda {
  search: string;
  per_page?: number;
  page?: number;
  statusId?: string;
  brandId?: string;
  categoryId?: string;
}

export const getSearchResults = async ({
  search,
  per_page,
  page,
  statusId,
  brandId,
  categoryId,
}: Busqueda) => {
  try {
    const params = new URLSearchParams();
    params.append("search", search);
    if (per_page) params.append("per_page", per_page.toString());
    if (statusId) params.append("status", statusId.toString());
    if (brandId) params.append("brand", brandId.toString());
    if (page) params.append("page", page.toString());
    if (categoryId) params.append("category", categoryId.toString());

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
