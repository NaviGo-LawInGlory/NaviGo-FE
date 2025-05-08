"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    setMobileMenuOpenState: React.Dispatch<React.SetStateAction<boolean>> | null;
    mobileMenuOpenState: boolean | null;
  }
}

export default function ClientSidebarWrapper() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path === "/dashboard/me") return "My Profile";
    if (path === "/dashboard/document-generator") return "Document Generator";
    if (path === "/dashboard/document-analyzer") return "Document Analyzer";
    if (path === "/dashboard/chat") return "AI Chat Bot";
    if (path === "/dashboard/find-lawyer") return "Find Lawyer";
    if (path === "/dashboard/history") return "History";
    return "Dashboard";
  };

  useEffect(() => {
    setMounted(true);

    window.setMobileMenuOpenState = setIsMobileMenuOpen;
    window.mobileMenuOpenState = isMobileMenuOpen;

    return () => {
      window.setMobileMenuOpenState = null;
      window.mobileMenuOpenState = null;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleMenuStateChange = () => {
      if (window.mobileMenuOpenState !== null && window.mobileMenuOpenState !== isMobileMenuOpen) {
        setIsMobileMenuOpen(window.mobileMenuOpenState);
      }
    };

    window.addEventListener("storage", handleMenuStateChange);
    return () => window.removeEventListener("storage", handleMenuStateChange);
  }, [isMobileMenuOpen]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <DashboardHeader title={getPageTitle(pathname)} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
    </>
  );
}

