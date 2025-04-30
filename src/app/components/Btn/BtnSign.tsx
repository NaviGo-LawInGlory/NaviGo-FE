"use client";

import React from 'react'

type BtnSignProps = {
    text: string
}
const BtnSign: React.FC<BtnSignProps> = ({text}) => {
  return (
    <button
         type="button"
         className="w-[30rem] h-[3.5rem] flex items-center bg-gradient-to-r from-[#A31ABE] to-[#E250CE] text-white justify-center py-2 rounded-[10px] shadow-sm hover:bg-gradient-to-r from-[#a010bd] to-[#e22aca] transition"
       >
        {text}
       </button>
  )
}

export default BtnSign