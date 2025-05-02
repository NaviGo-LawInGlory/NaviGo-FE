"use client";

import React from 'react'

interface InputProps {
    label: string;
    value: string;
    type?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputProps> = ({
        label,
        value,
        type,
        onChange
    }) => {
  return (
    <div className="flex flex-col gap-1 ">
      <label className="text-[1.125rem] font-medium text-[#000000]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-[30rem] h-[3rem] px-4 py-2 border-[1px] border-[#BABEC1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61008D] transition duration-200"
      />
    </div>
  )
}

export default InputField
