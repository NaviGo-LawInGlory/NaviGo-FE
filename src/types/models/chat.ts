export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp?: string;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  created_at: string;
}
