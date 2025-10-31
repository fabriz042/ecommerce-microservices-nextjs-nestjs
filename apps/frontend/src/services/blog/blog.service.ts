import api from "@/services/api.service";

export const getBlogList = async () => {
  try {
    const response = await api.get("blog");
    return response.data;
  } catch (error) {
    console.error("Error fetching blog list:", error);
    throw error;
  }
};

export const getBlogDetail = async (slug: string) => {
  try {
    const response = await api.get(`blog/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog detail:", error);
    throw error;
  }
};
