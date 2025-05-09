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
  const [allLawyers, setAllLawyers] = useState<Lawyer[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<LawyerSearchParams>({
    page: 1,
    limit: 100,
    sort_by: "rating",
    sort_order: "desc",
  });

  const fetchAllLawyers = async () => {
    if (!token) return;

    try {
      setInitialLoading(true);

      const initialParams = {
        page: 1,
        limit: 100,
        sort_by: "rating" as const,
        sort_order: "desc" as const,
      };

      const { data, total } = await searchLawyers(initialParams);
      setAllLawyers(data);
      setLawyers(data);
      setTotalResults(total);
    } catch (err) {
      setError("Failed to fetch lawyers. Please try again later.");
      console.error(err);
    } finally {
      setInitialLoading(false);
    }
  };

  const applyFilters = () => {
    if (allLawyers.length === 0) return;

    setLoading(true);

    try {
      let filteredLawyers = [...allLawyers];

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredLawyers = filteredLawyers.filter((lawyer) => lawyer.name.toLowerCase().includes(query) || lawyer.location.toLowerCase().includes(query) || lawyer.specialization.some((spec) => spec.toLowerCase().includes(query)));
      }

      if (searchParams.specialization && searchParams.specialization.length > 0) {
        filteredLawyers = filteredLawyers.filter((lawyer) => lawyer.specialization.some((spec) => searchParams.specialization?.includes(spec)));
      }

      if (searchParams.location) {
        const location = searchParams.location.toLowerCase();
        filteredLawyers = filteredLawyers.filter((lawyer) => lawyer.location.toLowerCase().includes(location));
      }

      if (searchParams.rating) {
        filteredLawyers = filteredLawyers.filter((lawyer) => lawyer.rating >= (searchParams.rating || 0));
      }

      if (searchParams.sort_by) {
        filteredLawyers = filteredLawyers.sort((a, b) => {
          let comparison = 0;

          if (searchParams.sort_by === "rating") {
            comparison = b.rating - a.rating;
          } else if (searchParams.sort_by === "experience") {
            comparison = b.experience_years - a.experience_years;
          } else if (searchParams.sort_by === "name") {
            comparison = a.name.localeCompare(b.name);
          }

          return searchParams.sort_order === "asc" ? -comparison : comparison;
        });
      }

      setLawyers(filteredLawyers);
      setTotalResults(filteredLawyers.length);
    } catch (err) {
      console.error("Error filtering lawyers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLawyers();
  }, [token]);

  useEffect(() => {
    if (!initialLoading) {
      applyFilters();
    }
  }, [searchParams, searchQuery, initialLoading]);

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

  const handleRetry = () => {
    fetchAllLawyers();
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

              {initialLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <CardSkeletonLoader />
                  <CardSkeletonLoader />
                  <CardSkeletonLoader />
                </div>
              ) : error ? (
                <ErrorDisplay message={error} onRetry={handleRetry} />
              ) : lawyers.length > 0 ? (
                <>
                  <p className="text-sm text-gray-600 my-3">{totalResults} lawyers found</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lawyers.map((lawyer) => (
                      <LawyerCard key={lawyer.id} lawyer={lawyer} />
                    ))}
                  </div>
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
