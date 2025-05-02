"use client";

import React, { useState } from "react";
import SearchBar from "../../components/Findlawyer/SearchBar";
import Sorter from "../../components/Findlawyer/Sorter";
import LawyerCard from "../../components/Findlawyer/LawyerCard";
import Filter from "../../components/Findlawyer/Filter";

export default function FindLawyerPage() {
  const [results, setResults] = useState("");

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto pb-20">
          <div className="mb-6">
            <SearchBar placeholder="Search for lawyers by name, specialization, or location" type="text" value={results} onChange={(e) => setResults(e.target.value)} />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 order-2 md:order-1 min-w-0">
              <Sorter />
              <LawyerCard />
            </div>

            <div className="w-full md:w-80 order-1 md:order-2 flex-shrink-0">
              <Filter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
