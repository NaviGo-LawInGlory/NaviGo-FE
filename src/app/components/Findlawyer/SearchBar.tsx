import React from "react";
import { Search } from "lucide-react";

interface InputProps {
  value: string;
  type?: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<InputProps> = ({ value, type, placeholder, onChange }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-purple-600" />
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-14 pl-12 pr-4 py-3 bg-white text-gray-700 rounded-xl shadow-sm border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
        />
      </div>
    </div>
  );
};

export default SearchBar;
