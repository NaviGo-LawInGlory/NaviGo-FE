import { Activity } from "@/types/models";
import { API_BASE_URL, handleApiError, getAuthOptions } from "./core";

export const fetchUserHistory = async (token: string): Promise<Activity[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/activities`, getAuthOptions(token));
    if (!response.ok) throw new Error("Failed to fetch user history");
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

