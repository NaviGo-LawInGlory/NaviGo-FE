"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Sidebar from "@/components/sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getPageTitle = (path: string) => {
    const segment = path.split("/").pop() || "dashboard";

    if (segment === "me") return "My Profile";
    if (segment === "document-analyzer") return "Document Analyzer";
    if (segment === "document-generator") return "Document Generator";
    if (segment === "find-lawyer") return "Find Lawyer";
    if (segment === "chat") return "AI Chat Bot";

    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!user && typeof window !== "undefined") {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader title={getPageTitle(pathname)} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="flex-1 ml-0 md:ml-[280px] lg:ml-[300px] overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
