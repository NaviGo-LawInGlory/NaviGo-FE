"use client";

import { useState } from "react";
import { SendIcon, Bot, Paperclip } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { user } = useAuth();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };

    setMessages([...messages, newMessage]);
    setInput("");

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
        isUser: false,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <DashboardHeader title="AI Chat Bot" />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Bot size={48} className="mb-3 text-purple-400" />
            <p className="text-lg">Start a conversation with the AI assistant</p>
            <p className="text-sm mt-2">Ask about legal advice, document analysis, or any legal questions</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start gap-3 max-w-3xl">
                {!message.isUser && (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex-shrink-0 flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className={`rounded-2xl p-4 shadow-sm max-w-[calc(100vw-5rem)] md:max-w-2xl ${message.isUser ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white" : "bg-white text-gray-800"}`}>{message.content}</div>
                {message.isUser && (
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center shadow-sm overflow-hidden">
                    <div className="text-sm font-medium text-purple-700">{user.name?.charAt(0)?.toUpperCase() || "U"}</div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 bg-gray-50 p-1 pl-2 pr-2 rounded-full shadow-inner">
            <button type="button" className="p-2.5 rounded-full text-purple-600 hover:bg-purple-100 transition-all duration-200 flex items-center justify-center">
              <Paperclip className="w-5 h-5" />
            </button>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 px-3 py-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-500" />
            <button type="submit" className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-md transition-all duration-200 flex-shrink-0 flex items-center justify-center" disabled={!input.trim()}>
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
