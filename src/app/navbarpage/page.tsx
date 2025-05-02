import React from 'react'
import DashboardBar from '../components/Findlawyer/DashboardBar'
import Sidebar from './../components/Sidebar/Sidebar';

const username = "Elgin Brian";
const Navbarpage = () => {
  return (
    <div className="flex flex-auto w-screen">
      <Sidebar/>
      <div className="flex-3">
      <DashboardBar username={username}/>

      </div>


    </div>
  )
}

export default Navbarpage
