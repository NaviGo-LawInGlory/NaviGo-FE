"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "../../components/Findlawyer/SearchBar";
import Sorter from "../../components/Findlawyer/Sorter";
import LawyerCard from "../../components/Findlawyer/LawyerCard";
import Filter from "../../components/Findlawyer/Filter";
import { useAuth } from "@/context/AuthContext";
import { searchLawyers } from "@/services/api/lawyer";
import { Lawyer, LawyerSearchParams } from "@/types/models/lawyer";
import { LoadingSpinner, CardSkeletonLoader } from "@/components/ui/LoadingIndicators";
import { ErrorDisplay } from "@/components/ui/ErrorDisplay";

export default function FindLawyerPage() {
  const { token } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<LawyerSearchParams>({
    page: 1,
    limit: 10,
    sort_by: "rating",
    sort_order: "desc",
  });

  const fetchLawyers = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const params: LawyerSearchParams = {
        ...searchParams,
        query: searchQuery || undefined,
      };

      const { data, total } = await searchLawyers(token, params);
      setLawyers(data);
      setTotalResults(total);
    } catch (err) {
      setError("Failed to fetch lawyers. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, [searchParams, token, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = (filters: Partial<LawyerSearchParams>) => {
    setSearchParams((prev) => ({
      ...prev,
      ...filters,
      page: 1,
    }));
  };

  const handleSort = (sortOption: { sort_by: "rating" | "experience" | "name"; sort_order: "asc" | "desc" }) => {
    setSearchParams((prev) => ({
      ...prev,
      ...sortOption,
    }));
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto pb-20">
          <div className="mb-6">
            <SearchBar placeholder="Search for lawyers by name, specialization, or location" type="text" value={searchQuery} onChange={handleSearch} />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 order-2 md:order-1 min-w-0">
              <Sorter onSort={handleSort} />

              {loading ? (
                <div className="space-y-4">
                  <CardSkeletonLoader />
                  <CardSkeletonLoader />
                  <CardSkeletonLoader />
                </div>
              ) : error ? (
                <ErrorDisplay message={error} onRetry={fetchLawyers} />
              ) : lawyers.length > 0 ? (
                <>
                  <p className="text-sm text-gray-600 my-3">{totalResults} lawyers found</p>
                  {lawyers.map((lawyer) => (
                    <LawyerCard key={lawyer.id} lawyer={lawyer} />
                  ))}
                </>
              ) : (
                <div className="bg-white shadow-md rounded-xl p-6 text-center">
                  <p className="text-gray-500">No lawyers found matching your criteria</p>
                  <p className="text-gray-400 text-sm mt-2">Try adjusting your search filters</p>
                </div>
              )}
            </div>

            <div className="w-full md:w-80 order-1 md:order-2 flex-shrink-0">
              <Filter onFilter={handleFilter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

