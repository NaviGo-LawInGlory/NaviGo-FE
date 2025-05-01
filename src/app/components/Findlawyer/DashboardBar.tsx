import React from 'react'

const DashboardBar = () => {
  return (
    <div className="w-[79%] h-[6rem] justify-end flex" style={{ background: 'linear-gradient(to right, #61008D 0%, #A31ABE 100%)' }}>
        <button className="h-auto w-auto bg-white rounded-[0.5rem] px-[1.5rem] my-[1.5rem] font-semibold text-[#5D5F61] ">
            Upgrade Plan
        </button>
        <button className="h-auto w-auto bg-transparent rounded-[0.5rem] px-[1.5rem] my-[1.5rem] font-semibold text-[#FFFFFF] flex items-center justify-center gap-4">
            Elgin Brian
            <img src="/ikonprofile.svg" alt="" className="w-[1rem]"/>
        </button>
    </div>
  )
}

export default DashboardBar