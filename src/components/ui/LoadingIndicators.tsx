import React from "react";

export const LoadingSpinner = ({ size = "md", color = "purple" }: { size?: "sm" | "md" | "lg"; color?: "purple" | "white" }) => {
  const sizeClass = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const colorClass = {
    purple: "text-purple-600",
    white: "text-white",
  };

  return (
    <div className="flex justify-center">
      <svg className={`animate-spin ${sizeClass[size]} ${colorClass[color]}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );
};

export const LoadingDots = () => {
  return (
    <div className="flex space-x-2">
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
    </div>
  );
};

export const SkeletonLoader = ({ className = "", rows = 1 }: { className?: string; rows?: number }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="animate-pulse bg-gray-200 rounded-md h-6"></div>
      ))}
    </div>
  );
};

export const CardSkeletonLoader = () => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white animate-pulse h-full flex flex-col">
      {/* Image skeleton */}
      <div className="w-full h-52 bg-gray-200"></div>

      {/* Content skeleton */}
      <div className="p-5 flex-grow flex flex-col">
        {/* Name */}
        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-3"></div>

        {/* Experience and location */}
        <div className="flex justify-between items-center mb-3">
          <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
        </div>

        {/* Availability */}
        <div className="h-4 bg-gray-200 rounded-md w-2/5 mb-3"></div>

        {/* Specializations */}
        <div className="flex gap-2 mt-auto mb-4 flex-wrap">
          <div className="h-6 bg-gray-200 rounded-xl w-20"></div>
          <div className="h-6 bg-gray-200 rounded-xl w-24"></div>
          <div className="h-6 bg-gray-200 rounded-xl w-16"></div>
        </div>

        {/* Contact button */}
        <div className="h-10 bg-gray-200 rounded-xl w-full mt-auto"></div>
      </div>
    </div>
  );
};

export const HistoryCardSkeletonLoader = () => {
  return (
    <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6 animate-pulse transition-all hover:shadow-lg">
      <div className="flex flex-row items-center w-full justify-between">
        <div className="flex flex-row items-center">
          <div className="h-12 md:h-16 w-16 md:w-16 mr-4 bg-gray-200 rounded-md"></div>

          <div className="flex flex-col">
            <div className="h-6 bg-gray-200 rounded-md w-48 mb-2"></div>

            <div className="h-4 bg-gray-200 rounded-md w-64"></div>
          </div>
        </div>

        <div className="h-4 bg-gray-200 rounded-md w-24"></div>
      </div>
    </div>
  );
};

export const StatsLoader = () => {
  return (
    <div className="animate-pulse flex items-center justify-between p-3 hover:bg-purple-50 rounded-lg transition-colors">
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-3 bg-gray-200 rounded w-40"></div>
      </div>
      <div className="h-8 w-8 bg-purple-100 rounded-full"></div>
    </div>
  );
};
