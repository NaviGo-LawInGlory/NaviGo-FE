"use client";

import { useAuth } from "@/context/AuthContext";

interface DashboardHeaderProps {
  title: string;
  showUpgrade?: boolean;
}

export default function DashboardHeader({ title, showUpgrade = true }: DashboardHeaderProps) {
  const { user } = useAuth();

  return (
    <header
      className="p-5 flex justify-between items-center"
      style={{
        background: "linear-gradient(to right, #61008D 0%, #A31ABE 100%)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <h1 className="text-xl font-semibold text-white">{title}</h1>
      <div className="flex items-center gap-4">
        {showUpgrade && <button className="hidden sm:block bg-white text-purple-700 px-5 py-2 rounded-full hover:bg-gray-100 transition-colors shadow-md">Upgrade Plan</button>}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-white opacity-95">{user?.name || "User"}</span>
          <div className="w-9 h-9 rounded-full bg-white/20 shadow-inner flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/90 shadow-sm overflow-hidden">{/* User avatar could go here */}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
