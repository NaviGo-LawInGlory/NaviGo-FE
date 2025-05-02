"use client";

import { useAuth } from "@/context/AuthContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DocumentAnalyzerPage() {
  const { user } = useAuth();

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader title="Document Analyzer" />

      <div className="flex-1 p-8">
        <p className="mt-4">Analyze your legal documents here.</p>
      </div>
    </div>
  );
}
