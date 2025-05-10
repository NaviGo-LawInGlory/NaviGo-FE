import { Bot } from "lucide-react";
import { ChatSession } from "@/types/models/chat";
import AiPersonalitySelector from "./AiPersonalitySelector";
import ChatSessionList from "./ChatSessionList";

interface AiPersonality {
  id: string;
  name: string;
  description: string;
}

interface ChatHeaderProps {
  personalities: AiPersonality[];
  selectedPersonalityId: string;
  onSelectPersonality: (id: string) => void;
  chatSessions: ChatSession[];
  currentSessionId: string | null;
  sessionListOpen: boolean;
  setSessionListOpen: (value: boolean) => void;
  loadingSessions: boolean;
  onSelectSession: (sessionId: string) => void;
  formatDate: (dateString: string) => string;
  getChatPreview: (session: ChatSession) => string;
}

export default function ChatHeader({
  personalities,
  selectedPersonalityId,
  onSelectPersonality,
  chatSessions,
  currentSessionId,
  sessionListOpen,
  setSessionListOpen,
  loadingSessions,
  onSelectSession,
  formatDate,
  getChatPreview,
}: ChatHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white py-1.5 px-3 md:px-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      <div className="flex items-center">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-sm mr-2.5">
          <Bot className="w-4 h-4 text-white" />
        </div>

        <div className="flex-1 flex items-center">
          <AiPersonalitySelector personalities={personalities} selectedPersonalityId={selectedPersonalityId} onSelectPersonality={onSelectPersonality} />
          <span className="text-[11px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full ml-2">Ask legal questions</span>
        </div>

        <ChatSessionList
          isOpen={sessionListOpen}
          toggleOpen={() => setSessionListOpen(!sessionListOpen)}
          sessions={chatSessions}
          currentSessionId={currentSessionId}
          loading={loadingSessions}
          onSelectSession={onSelectSession}
          formatDate={formatDate}
          getChatPreview={getChatPreview}
        />
      </div>
    </div>
  );
}
