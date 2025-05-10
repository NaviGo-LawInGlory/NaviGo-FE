import React, { useState, ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({ children, content, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-t-purple-700 border-r-transparent border-b-transparent border-l-transparent",
    bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-b-purple-700 border-r-transparent border-t-transparent border-l-transparent",
    left: "left-full top-1/2 transform -translate-y-1/2 border-l-purple-700 border-r-transparent border-b-transparent border-t-transparent",
    right: "right-full top-1/2 transform -translate-y-1/2 border-r-purple-700 border-l-transparent border-b-transparent border-t-transparent",
  };

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} onClick={() => setIsVisible(!isVisible)}>
      {children}

      {isVisible && (
        <div className={`absolute z-50 w-max max-w-xs ${positionClasses[position]}`}>
          <div className="bg-purple-700 text-white text-xs rounded p-2 shadow-lg">{content}</div>
          <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
