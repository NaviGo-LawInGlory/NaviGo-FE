import { User, UserStats } from "@/types/models";
import { API_BASE_URL, handleApiError, getAuthOptions } from "./core";

export const fetchUserProfile = async (token: string): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, getAuthOptions(token));
    if (!response.ok) throw new Error("Failed to fetch user profile");
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchUserStats = async (token: string): Promise<UserStats> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/stats`, getAuthOptions(token));
    if (!response.ok) throw new Error("Failed to fetch user stats");
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

