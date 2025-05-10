import { useState } from "react";
import { SendIcon, Paperclip, RefreshCcw } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingIndicators";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onStartNewConversation: () => void;
  loading: boolean;
  creatingNewSession: boolean;
}

export default function ChatInput({ onSendMessage, onStartNewConversation, loading, creatingNewSession }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || creatingNewSession) return;

    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <button
            type="button"
            onClick={onStartNewConversation}
            disabled={creatingNewSession}
            className="p-3 rounded-full text-purple-600 hover:bg-purple-100 transition-all duration-200 flex items-center justify-center flex-shrink-0"
            title="Start a new conversation"
          >
            {creatingNewSession ? <LoadingSpinner size="sm" /> : <RefreshCcw className="w-5 h-5" />}
          </button>

          <div className="flex-1 flex items-center gap-3 bg-gray-50 p-1 pl-2 pr-2 rounded-full shadow-inner">
            <button type="button" className="p-2.5 rounded-full text-purple-600 hover:bg-purple-100 transition-all duration-200 flex items-center justify-center">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-500"
              disabled={loading || creatingNewSession}
            />

            <button
              type="submit"
              className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-md transition-all duration-200 flex-shrink-0 flex items-center justify-center"
              disabled={!input.trim() || loading || creatingNewSession}
            >
              {loading ? <LoadingSpinner size="sm" color="white" /> : <SendIcon className="w-5 h-5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
