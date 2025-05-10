import { Bot } from "lucide-react";
import { Message } from "@/types/models/chat";
import { LoadingSpinner, LoadingDots } from "@/components/ui/LoadingIndicators";
import ChatMessage from "./ChatMessage";
import { RefObject } from "react";

interface EmptyStateProps {
  loading: boolean;
}

function EmptyState({ loading }: EmptyStateProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <LoadingSpinner size="lg" />
        <p className="text-purple-600 mt-4">Loading conversation...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-400">
      <Bot size={48} className="mb-3 text-purple-400" />
      <p className="text-lg">Start a conversation with the AI assistant</p>
      <p className="text-sm mt-2">Ask about legal advice, document analysis, or any legal questions</p>
    </div>
  );
}

interface ChatMessageListProps {
  messages: Message[];
  loading: boolean;
  error: string | null;
  username: string;
  messagesEndRef: RefObject<HTMLDivElement>;
}

export default function ChatMessageList({ messages, loading, error, username, messagesEndRef }: ChatMessageListProps) {
  const showEmptyState = messages.length === 0;

  return (
    <div className="absolute inset-0 top-[38px] md:top-[38px] bottom-[72px] overflow-y-auto p-4 md:p-6 space-y-6">
      {showEmptyState && <EmptyState loading={loading} />}

      {!showEmptyState && messages.map((message) => <ChatMessage key={message.id} message={message} username={username} />)}

      {error && (
        <div className="flex justify-center">
          <div className="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg">{error}</div>
        </div>
      )}

      {loading && messages.length > 0 && (
        <div className="flex justify-start">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex-shrink-0 flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="rounded-2xl p-4 shadow-sm bg-white">
              <LoadingDots />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef}></div>
    </div>
  );
}
