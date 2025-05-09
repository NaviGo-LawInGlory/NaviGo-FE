import { User, UserStats, UpdateUserProfileRequest } from "@/types/models";
import api from "../api_interceptor";

export const fetchUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserStats = async (): Promise<UserStats> => {
  try {
    const response = await api.get("/users/stats");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (data: UpdateUserProfileRequest): Promise<User> => {
  try {
    const response = await api.put("/users/profile", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
