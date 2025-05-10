import { Message, ChatSession } from "@/types/models";
import api from "../api_interceptor";

export const sendChatMessage = async (content: string): Promise<Message> => {
  try {
    const response = await api.post("/chat/send", { content });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchChatHistory = async (sessionId?: string): Promise<ChatSession> => {
  try {
    const endpoint = sessionId ? `/chat/sessions/${sessionId}` : "/chat/sessions/latest";
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createNewChatSession = async (): Promise<ChatSession> => {
  try {
    const response = await api.post("/chat/sessions/new");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAllChatSessions = async (): Promise<ChatSession[]> => {
  try {
    const response = await api.get("/chat/sessions");
    return response.data;
  } catch (error) {
    throw error;
  }
};
