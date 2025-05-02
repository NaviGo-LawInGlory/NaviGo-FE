"use client";

import { FcGoogle } from "react-icons/fc";

const BtnGoogle= () =>{
  return (
    <button
      type="button"
      className="w-[30rem] h-[3.5rem] flex items-center bg-[#FFFFFF] justify-center gap-2 border border-gray-300 py-2 rounded-[10px] shadow-sm hover:bg-gray-100 transition"
    >
      <FcGoogle size={26} />
      <span className="text-[18px] font-medium text-gray-700">Continue with Google</span>
    </button>
  );
}

export default BtnGoogle
