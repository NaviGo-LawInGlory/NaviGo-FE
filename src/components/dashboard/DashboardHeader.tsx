"use client";

import { useAuth } from "@/context/AuthContext";
import { Menu, X } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  showUpgrade?: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export default function DashboardHeader({ title, showUpgrade = true, isMobileMenuOpen, setIsMobileMenuOpen }: DashboardHeaderProps) {
  const { user } = useAuth();

  return (
    <header
      className="sticky top-0 z-30 p-3 md:p-5 flex items-center w-full md:w-[calc(100%-280px)] lg:w-[calc(100%-300px)] md:ml-auto"
      style={{
        background: "linear-gradient(to right, #61008D 0%, #A31ABE 100%)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >

      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden mr-3 p-2 rounded-md text-white hover:bg-white/10 transition-colors" aria-label="Toggle menu">
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <h1 className="text-lg md:text-xl font-semibold text-white flex-1">{title}</h1>

      <div className="flex items-center gap-2 md:gap-4">
        {showUpgrade && <button className="hidden sm:block bg-white text-purple-700 px-3 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-gray-100 transition-colors shadow-md text-sm md:text-base">Upgrade Plan</button>}

        <div className="flex items-center gap-2 md:gap-3">
          <span className="hidden sm:inline text-white opacity-95 text-sm md:text-base">{user?.name || "User"}</span>
          <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-white/20 shadow-inner flex items-center justify-center">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/90 shadow-sm overflow-hidden flex items-center justify-center">
              <span className="text-xs md:text-sm font-medium text-purple-700">{user?.name?.charAt(0)?.toUpperCase() || "U"}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

