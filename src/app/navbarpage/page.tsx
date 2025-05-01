import React from 'react'
// import Sidebar from '../components/Sidebar/Sidebar'
import DashboardBar from '../components/Findlawyer/DashboardBar'
// import Link from 'next/link'
import Sidebar from './../components/Sidebar/Sidebar';

const Navbarpage = () => {
  return (
    <div className="flex flex-auto w-screen">
      <Sidebar/>
      <div className="flex-3">
      <DashboardBar/>

      </div>


      

    </div>
  )
}

export default Navbarpage