"use client";


import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import DashboardBar from "../components/Findlawyer/DashboardBar";
import SearchBar from '../components/Findlawyer/SearchBar';
import Sorter from '../components/Findlawyer/Sorter';
import {useState} from 'react';
import LawyerCard from "../components/Findlawyer/LawyerCard";
import Filter from "../components/Findlawyer/Filter";


// const username = getUserNameFromLocalStorage();
const username = "Elgin Brian";
const FindLawyer = () => {

    const [results, setResults] = useState("");
    
  return (
    <div className="flex flex-auto w-screen">
      <Sidebar />
      <div className="flex-3">
        
        <DashboardBar username={username} /> 
        <div className="flex flex-row">
            <div className="flex-3">
            <SearchBar placeholder="Search lawyer" type="text" value={results} onChange={(e) => setResults(e.target.value)} />
            <div className="w-[90%] flex justify-end">
            <Sorter/>
            </div>
            <LawyerCard/>
                
            </div>

            <div className="">
             <Filter/>
            </div>  
        </div>
      </div>
    </div>
  );
};

export default FindLawyer;
