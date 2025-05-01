'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SendIcon } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };

    setMessages([...messages, newMessage]);
    setInput('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,',
        isUser: false,
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat header */}
      <header className="bg-purple-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">AI Chat Bot</h1>
        <div className="flex items-center gap-4">
          <button className="hidden sm:block bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500">
            Upgrade Plan
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Elgin Brian</span>
            <div className="w-8 h-8 rounded-full bg-gray-300" />
          </div>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-start gap-2 max-w-3xl">
              {!message.isUser && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
              )}
              <div
                className={`rounded-lg p-4 ${
                  message.isUser
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-gray-800'
                } max-w-[calc(100vw-4rem)] md:max-w-2xl`}
              >
                {message.content}
              </div>
              {message.isUser && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Chat input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-500"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
} 