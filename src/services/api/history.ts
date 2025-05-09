import { Activity } from "@/types/models";
import api from "../api_interceptor";

export const fetchUserHistory = async (): Promise<Activity[]> => {
  try {
    const response = await api.get("/activities");
    return response.data;
  } catch (error) {
    throw error;
  }
};
