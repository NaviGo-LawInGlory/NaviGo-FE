import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import DashboardBar from '../components/Findlawyer/DashboardBar';
import SearchBar from '../components/Findlawyer/SearchBar';
import LawyerCard from '../components/Findlawyer/LawyerCard';


const findlawyer = () => {
  return (
     <div className="flex">
        <div>
        <Sidebar/>
        </div>
        <div>
            <div>
                <DashboardBar/>
            </div>
            <div>
                
                <LawyerCard/>
            </div>

        </div>

     </div>
  )
}

export default findlawyer;