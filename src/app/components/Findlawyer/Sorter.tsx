import React, { useState } from "react";

interface SorterProps {
  onSort: (sortOption: { sort_by: "rating" | "experience" | "name"; sort_order: "asc" | "desc" }) => void;
}

const Sorter: React.FC<SorterProps> = ({ onSort }) => {
  const [selected, setSelected] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelected(value);

    switch (value) {
      case "rating_desc":
        onSort({ sort_by: "rating", sort_order: "desc" });
        break;
      case "rating_asc":
        onSort({ sort_by: "rating", sort_order: "asc" });
        break;
      case "experience_desc":
        onSort({ sort_by: "experience", sort_order: "desc" });
        break;
      case "experience_asc":
        onSort({ sort_by: "experience", sort_order: "asc" });
        break;
      case "name_asc":
        onSort({ sort_by: "name", sort_order: "asc" });
        break;
      case "name_desc":
        onSort({ sort_by: "name", sort_order: "desc" });
        break;
      default:
        onSort({ sort_by: "rating", sort_order: "desc" });
    }
  };

  const options = [
    { value: "rating_desc", label: "Rating (High to Low)" },
    { value: "rating_asc", label: "Rating (Low to High)" },
    { value: "experience_desc", label: "Experience (Most)" },
    { value: "experience_asc", label: "Experience (Least)" },
    { value: "name_asc", label: "Name (A-Z)" },
    { value: "name_desc", label: "Name (Z-A)" },
  ];

  return (
    <div className="w-full flex items-center justify-end gap-3 mb-4">
      <label htmlFor="filter" className="text-[1rem] font-medium text-gray-700 whitespace-nowrap">
        Sort by
      </label>
      <div className="relative">
        <select id="filter" value={selected} onChange={handleChange} className="w-40 p-3 pl-4 pr-10 rounded-xl shadow-sm border-0 bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option value="" className="font-medium" disabled hidden>
            --Select--
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="py-2">
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-purple-700">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Sorter;

