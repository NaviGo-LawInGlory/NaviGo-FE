import { Message, ChatSession } from "@/types/models";
import { API_BASE_URL, handleApiError, getAuthOptions } from "./core";

export const sendChatMessage = async (token: string, content: string): Promise<Message> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/send`, {
      ...getAuthOptions(token, {
        method: "POST",
        body: JSON.stringify({ content }),
      }),
    });

    if (!response.ok) throw new Error("Failed to send message");
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchChatHistory = async (token: string, sessionId?: string): Promise<ChatSession> => {
  try {
    const endpoint = sessionId ? `${API_BASE_URL}/chat/sessions/${sessionId}` : `${API_BASE_URL}/chat/sessions/latest`;

    const response = await fetch(endpoint, getAuthOptions(token));
    if (!response.ok) throw new Error("Failed to fetch chat history");
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

