"use client";

import { useState, useEffect, useRef, RefObject } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchChatHistory, sendChatMessage, createNewChatSession, fetchAllChatSessions } from "@/services/api/chat";
import { Message, ChatSession } from "@/types/models/chat";
import { LoadingSpinner } from "@/components/ui/LoadingIndicators";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInput from "@/components/chat/ChatInput";

export default function ChatPage() {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [creatingNewSession, setCreatingNewSession] = useState(false);
  const [sessionListOpen, setSessionListOpen] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [selectedPersonality, setSelectedPersonality] = useState<string>("legal-assistant");

  const aiPersonalities = [
    { id: "legal-assistant", name: "Legal Assistant", description: "Specialized in legal advice" },
    { id: "document-expert", name: "Document Expert", description: "For document generation and analysis" },
    { id: "case-analyst", name: "Case Analyst", description: "For analyzing legal cases and precedents" },
    { id: "general", name: "General Assistant", description: "General-purpose legal assistant" },
  ];

  useEffect(() => {
    const loadAllSessions = async () => {
      if (!token) return;

      try {
        setLoadingSessions(true);
        const sessions = await fetchAllChatSessions();
        setChatSessions(sessions);

        if (sessions.length > 0) {
          setCurrentSessionId(sessions[0].id);
        }
      } catch (err) {
        console.error("Failed to load chat sessions:", err);
      } finally {
        setLoadingSessions(false);
      }
    };

    loadAllSessions();
  }, [token]);

  useEffect(() => {
    const loadSessionMessages = async () => {
      if (!token || !currentSessionId) return;

      try {
        setLoading(true);
        const session = await fetchChatHistory(currentSessionId);
        if (session && session.messages) {
          setMessages(session.messages);
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentSessionId) {
      loadSessionMessages();
    } else if (chatSessions.length > 0) {
      setCurrentSessionId(chatSessions[0].id);
    }
  }, [token, currentSessionId, chatSessions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (input: string) => {
    if (!input.trim() || !token) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setError(null);

    try {
      setLoading(true);
      const aiResponse = await sendChatMessage(input);
      setMessages((prev) => [...prev, aiResponse]);

      const updatedSessions = await fetchAllChatSessions();
      setChatSessions(updatedSessions);
    } catch (err) {
      setError("Failed to get response. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartNewConversation = async () => {
    if (!token) return;

    try {
      setCreatingNewSession(true);
      setError(null);
      const newSession = await createNewChatSession();
      setMessages(newSession.messages || []);

      const updatedSessions = await fetchAllChatSessions();
      setChatSessions(updatedSessions);
      setCurrentSessionId(newSession.id);
      setSessionListOpen(false);
    } catch (err) {
      setError("Failed to start a new conversation. Please try again.");
      console.error(err);
    } finally {
      setCreatingNewSession(false);
    }
  };

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setSessionListOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getChatPreview = (session: ChatSession): string => {
    if (!session.messages || session.messages.length === 0) return "No messages";
    const firstMessage = session.messages[0];
    return firstMessage.content.substring(0, 30) + (firstMessage.content.length > 30 ? "..." : "");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 relative" onClick={() => setSessionListOpen(false)}>
      <ChatHeader
        personalities={aiPersonalities}
        selectedPersonalityId={selectedPersonality}
        onSelectPersonality={setSelectedPersonality}
        chatSessions={chatSessions}
        currentSessionId={currentSessionId}
        sessionListOpen={sessionListOpen}
        setSessionListOpen={setSessionListOpen}
        loadingSessions={loadingSessions}
        onSelectSession={handleSelectSession}
        formatDate={formatDate}
        getChatPreview={getChatPreview}
      />

      <ChatMessageList messages={messages} loading={loading} error={error} username={user.name || ""} messagesEndRef={messagesEndRef as RefObject<HTMLDivElement>} />

      <ChatInput onSendMessage={handleSendMessage} onStartNewConversation={handleStartNewConversation} loading={loading} creatingNewSession={creatingNewSession} />
    </div>
  );
}

