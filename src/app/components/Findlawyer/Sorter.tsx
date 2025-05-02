import React, { useState } from 'react';

const Sorter: React.FC = () => {
  const [selected, setSelected] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  
  const options = [
    { value: 'nama', label: 'Nama' },
    { value: 'gaji', label: 'Gaji' },
    { value: 'umur', label: 'Umur' },
  ];

  return (
    <div className="w-[100%] h-auto max-w-sm  mt-5 flex justify-end gap-[0.5rem]">
      <label htmlFor="filter" className="block mb-2 text-[1rem] font-medium text-[#3D3F40]">
        Sort by
      </label>
      <select
        id="filter"
        value={selected}
        onChange={handleChange}
        className="block w-[50%] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
      >
        <option value="" className="font-bold" disabled hidden>--Pilih--</option>
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
