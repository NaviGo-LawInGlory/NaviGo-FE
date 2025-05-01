"use client";

import React from "react";

interface BtnSignProps {
  text: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BtnSign: React.FC<BtnSignProps> = ({ text, disabled = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="submit"
      className="w-[30rem] h-[3.5rem] flex items-center justify-center rounded-lg text-white font-medium text-base cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      style={{
        background: "linear-gradient(90deg, #A31ABE 0%, #E250CE 100%)",
      }}
    >
      {text}
    </button>
  );
};

export default BtnSign;
