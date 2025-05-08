import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  compact?: boolean;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry, compact = false }) => {
  return (
    <div className={`bg-white shadow-md rounded-xl overflow-hidden ${compact ? "p-4" : "p-6 md:p-8"}`}>
      <div className="flex flex-col items-center text-center">
        <div className="bg-purple-50 p-3 rounded-full mb-4">
          <AlertCircle className="text-purple-600 w-6 h-6 md:w-8 md:h-8" />
        </div>

        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{compact ? "Error" : "Oops! Something went wrong"}</h3>

        <p className="text-purple-600 mb-4">{message}</p>

        {onRetry && (
          <button onClick={onRetry} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:opacity-90 transition-all shadow-sm">
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};
