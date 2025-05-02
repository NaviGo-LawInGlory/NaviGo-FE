import React from 'react'

interface usernameProps  {
  username: string;
}
const DashboardBar : React.FC<usernameProps> = ({username}) => {
  return (
    <div className="w-full h-[6rem] justify-end flex px-[10rem]" style={{ background: 'linear-gradient(to right, #61008D 0%, #A31ABE 100%)' }}>
        <button className="h-auto w-auto bg-white rounded-[0.5rem] px-[1.5rem] my-[1.5rem] font-semibold text-[#5D5F61] ">
            Upgrade Plan
        </button>
        <button className="h-auto w-auto bg-transparent rounded-[0.5rem] px-[1.5rem] my-[1.5rem] font-semibold text-[#FFFFFF] flex items-center justify-center gap-4">
            {username}
            <img src="/ikonprofile.svg" alt="" className="w-[1rem]"/>
        </button>
    </div>
  )
}

export default DashboardBar