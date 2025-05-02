"use client";

import React, { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SearchBar from "../../components/Findlawyer/SearchBar";
import Sorter from "../../components/Findlawyer/Sorter";
import LawyerCard from "../../components/Findlawyer/LawyerCard";
import Filter from "../../components/Findlawyer/Filter";

export default function FindLawyerPage() {
  const [results, setResults] = useState("");

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <DashboardHeader title="Find Lawyer" />

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-4">
          <SearchBar placeholder="Search lawyer" type="text" value={results} onChange={(e) => setResults(e.target.value)} />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filter - Mobile: Top, Desktop: Right */}
          <div className="w-full md:w-80 order-1 md:order-2 flex-shrink-0">
            <Filter />
          </div>

          {/* Main Content - Mobile: Bottom, Desktop: Left */}
          <div className="flex-1 order-2 md:order-1 min-w-0">
            <Sorter />
            <LawyerCard />
          </div>
        </div>
      </div>
    </div>
  );
}
