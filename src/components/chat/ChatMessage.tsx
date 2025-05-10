import { Bot } from "lucide-react";
import { Message } from "@/types/models/chat";

interface ChatMessageProps {
  message: Message;
  username: string;
}

export default function ChatMessage({ message, username }: ChatMessageProps) {
  return (
    <div className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
      <div className="flex items-start gap-3 max-w-3xl">
        {!message.isUser && (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex-shrink-0 flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-white" />
          </div>
        )}
        <div className={`rounded-2xl p-4 shadow-sm max-w-[calc(100vw-5rem)] md:max-w-2xl ${message.isUser ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white" : "bg-white text-gray-800"}`}>{message.content}</div>
        {message.isUser && (
          <div className="w-9 h-9 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center shadow-sm overflow-hidden">
            <div className="text-sm font-medium text-purple-700">{username?.charAt(0)?.toUpperCase() || "U"}</div>
          </div>
        )}
      </div>
    </div>
  );
}
