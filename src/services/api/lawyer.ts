import { Lawyer, LawyerSearchParams } from "@/types/models";
import { API_BASE_URL, handleApiError, getAuthOptions } from "./core";

export const searchLawyers = async (token: string, params: LawyerSearchParams): Promise<{ data: Lawyer[]; total: number }> => {
  try {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((item) => queryParams.append(key, item.toString()));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    const response = await fetch(`${API_BASE_URL}/lawyers/search?${queryParams.toString()}`, getAuthOptions(token));
    if (!response.ok) throw new Error("Failed to search lawyers");
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

