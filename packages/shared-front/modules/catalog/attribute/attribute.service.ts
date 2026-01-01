import api from "../../api.service";

export const getAttributes = async () => {
  try {
    const response = await api.get("attribute/");
    return response.data;
  } catch (error) {
    console.error("Error fetching attributes", error);
    throw error;
  }
};
