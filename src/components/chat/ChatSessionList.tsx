import { MessageSquare, ChevronUp, ChevronDown } from "lucide-react";
import { ChatSession } from "@/types/models/chat";
import { LoadingSpinner } from "@/components/ui/LoadingIndicators";

interface ChatSessionListProps {
  isOpen: boolean;
  toggleOpen: () => void;
  sessions: ChatSession[];
  currentSessionId: string | null;
  loading: boolean;
  onSelectSession: (sessionId: string) => void;
  formatDate: (dateString: string) => string;
  getChatPreview: (session: ChatSession) => string;
}

export default function ChatSessionList({ isOpen, toggleOpen, sessions, currentSessionId, loading, onSelectSession, formatDate, getChatPreview }: ChatSessionListProps) {
  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleOpen();
        }}
        className="flex items-center gap-1 text-xs text-purple-600 hover:bg-purple-50 py-1 px-2 rounded transition-colors"
      >
        Chat History
        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border border-gray-100 mt-1 max-h-64 overflow-y-auto z-20">
          {loading ? (
            <div className="p-4 flex justify-center">
              <LoadingSpinner size="sm" />
            </div>
          ) : sessions.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No chat history found</div>
          ) : (
            <>
              <div className="p-3 border-b border-gray-100 font-medium text-gray-700 bg-gray-50">Previous Conversations</div>
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => onSelectSession(session.id)}
                  className={`w-full text-left p-3 border-b border-gray-100 hover:bg-purple-50 transition-colors flex items-start ${currentSessionId === session.id ? "bg-purple-50" : ""}`}
                >
                  <MessageSquare className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" />
                  <div className="flex-1 overflow-hidden">
                    <div className="font-medium text-gray-800 truncate">{getChatPreview(session)}</div>
                    <div className="text-xs text-gray-500">{formatDate(session.created_at)}</div>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
}
