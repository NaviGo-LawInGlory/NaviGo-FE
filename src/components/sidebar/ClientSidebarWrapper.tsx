"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

declare global {
  interface Window {
    setMobileMenuOpenState: React.Dispatch<React.SetStateAction<boolean>> | null;
    mobileMenuOpenState: boolean | null;
  }
}

export default function ClientSidebarWrapper() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
}
