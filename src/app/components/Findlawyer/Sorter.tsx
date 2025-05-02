import React, { useState } from "react";

const Sorter: React.FC = () => {
  const [selected, setSelected] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  const options = [
    { value: "nama", label: "Nama" },
    { value: "gaji", label: "Gaji" },
    { value: "umur", label: "Umur" },
  ];

  return (
    <div className="w-full flex items-center justify-end gap-2 mb-4">
      <label htmlFor="filter" className="text-[1rem] font-medium text-[#3D3F40] whitespace-nowrap">
        Sort by
      </label>
      <select id="filter" value={selected} onChange={handleChange} className="w-36 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500">
        <option value="" className="font-bold" disabled hidden>
          --Pilih--
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sorter;
