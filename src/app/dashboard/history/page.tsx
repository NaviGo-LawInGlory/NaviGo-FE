"use client";

import { useState, useEffect } from "react";
import HistoryList from "@/app/components/History/HistoryList";
import { useAuth } from "@/context/AuthContext";
import { fetchUserHistory } from "@/services/api";
import { Activity } from "@/types/models";
import { LoadingSpinner, HistoryCardSkeletonLoader } from "@/components/ui/LoadingIndicators";
import { ErrorDisplay } from "@/components/ui/ErrorDisplay";

export default function HistoryPage() {
  const { user, token } = useAuth();
  const [historyData, setHistoryData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const history = await fetchUserHistory(token);
      setHistoryData(history);
      setError(null);
    } catch (err) {
      setError("Failed to load history. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [token]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 p-3 md:p-4 lg:p-6 overflow-y-auto">
        <div className="max-w-full lg:max-w-[95%] xl:max-w-[90%] mx-auto space-y-4 md:space-y-6 pb-20">
          <div className="space-y-4">
            {loading ? (
              <>
                <HistoryCardSkeletonLoader />
                <HistoryCardSkeletonLoader />
                <HistoryCardSkeletonLoader />
              </>
            ) : error ? (
              <ErrorDisplay message={error} onRetry={loadHistory} />
            ) : historyData.length > 0 ? (
              historyData.map((item) => <HistoryList key={item.id} type={item.type} title={item.title} date={item.date} />)
            ) : (
              <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-8 text-center">
                <p className="text-gray-500 font-medium text-lg">No history found</p>
                <p className="text-gray-400 text-sm mt-2">Your activity history will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
