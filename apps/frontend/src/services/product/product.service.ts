import api from "@/services/api.service";

interface ProductSearchParams {
  search: string;
  page?: number;
  per_page?: number;
  statusId?: string;
  brandId?: string;
  categoryId?: string;
}

export const getSearchResults = async ({
  search,
  page,
  per_page,
  statusId,
  brandId,
  categoryId,
}: ProductSearchParams) => {
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

export const getProductDetail = async (slug: string) => {
  try {
    const response = await api.get(`products/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error to fetch product details", error);
    throw error;
  }
};

export const getProductRecommendations = async (id: string) => {
  try {
    const response = await api.get(`products/${id}/recommendations`);
    return response.data;
  } catch (error) {
    console.error("Error to fetch product recommendations", error);
    throw error;
  }
};
