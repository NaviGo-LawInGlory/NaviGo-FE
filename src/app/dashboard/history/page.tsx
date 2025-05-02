"use client";

import { useAuth } from "@/context/AuthContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function HistoryPage() {
  const { user } = useAuth();

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader title="History" />

      <div className="flex-1 p-8">
        <p className="mt-4">Your activity history will appear here.</p>
      </div>
    </div>
  );
}
