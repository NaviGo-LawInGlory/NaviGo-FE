import React from 'react'


interface InputProps {
    // label: string;
    // color: string;
    value: string;
    type?: string;
    // size: string;
    placeholder: string;
    // isError: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // name?: string
}

const SearchBar: React.FC<InputProps> = ({
        // label,
        value,
        type,
        placeholder,
        onChange
        // name,
    }) => {
  return (
    <div className="flex flex-col gap-1 ">
      {/* <label className="text-[1.125rem] font-medium text-[#000000]">{label}</label> */}
      <input
        type={type}
        value={value}
        // name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="w-[90%] h-[4rem]  px-4 py-2 border-[1px] border-[#BABEC1] placeholder-[#BABEC1] rounded-2xl mx-[1rem] mt-[2.5rem] focus:outline-none focus:ring-2 focus:ring-[#61008D] transition duration-200"
      />
    </div>
  )
}

export default SearchBar