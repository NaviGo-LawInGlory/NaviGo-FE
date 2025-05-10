import React from "react";

interface ProgressIndicatorProps {
  completionPercentage: number;
}

export default function ProgressIndicator({ completionPercentage }: ProgressIndicatorProps) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700">Progress</h3>
        <span className={`text-sm font-medium ${completionPercentage === 100 ? "text-green-600" : "text-amber-600"}`}>{completionPercentage}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${completionPercentage === 100 ? "bg-green-600" : "bg-amber-500"}`} style={{ width: `${completionPercentage}%` }}></div>
      </div>
    </div>
  );
}
