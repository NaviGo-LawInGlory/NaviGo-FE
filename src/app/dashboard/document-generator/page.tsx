"use client";

import { useAuth } from "@/context/AuthContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DocumentGeneratorPage() {
  const { user } = useAuth();

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader title="Document Generator" />

      <div className="flex-1 p-8">
        <p className="mt-4">Welcome to the document generator tool.</p>
      </div>
    </div>
  );
}
