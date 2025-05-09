import { Lawyer, LawyerSearchParams } from "@/types/models";
import api from "../api_interceptor";

export const searchLawyers = async (params: LawyerSearchParams): Promise<{ data: Lawyer[]; total: number }> => {
  try {
    const response = await api.get("/lawyers/search", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
