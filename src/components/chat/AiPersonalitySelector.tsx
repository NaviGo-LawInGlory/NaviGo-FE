import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface AiPersonality {
  id: string;
  name: string;
  description: string;
}

interface AiPersonalitySelectorProps {
  personalities: AiPersonality[];
  selectedPersonalityId: string;
  onSelectPersonality: (id: string) => void;
}

export default function AiPersonalitySelector({ personalities, selectedPersonalityId, onSelectPersonality }: AiPersonalitySelectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const selectedPersonality = personalities.find((p) => p.id === selectedPersonalityId);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-1.5 font-medium text-gray-800 hover:bg-gray-50 py-1 px-2 rounded-md transition-colors">
        <span>{selectedPersonality?.name || "NaviGo AI Assistant"}</span>
        {isDropdownOpen ? <ChevronUp className="w-3.5 h-3.5 text-gray-500" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />}
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg w-56 z-30 border border-gray-100">
          {personalities.map((personality) => (
            <button
              key={personality.id}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${selectedPersonalityId === personality.id ? "bg-purple-50 text-purple-700" : "text-gray-700"}`}
              onClick={() => {
                onSelectPersonality(personality.id);
                setIsDropdownOpen(false);
              }}
            >
              <div className="font-medium">{personality.name}</div>
              <div className="text-xs text-gray-500">{personality.description}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
