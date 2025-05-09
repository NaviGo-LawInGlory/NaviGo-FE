"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ClientSidebarWrapper from "@/components/sidebar/ClientSidebarWrapper";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, token, authInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authInitialized && !token) {
      router.push("/login");
    }
  }, [authInitialized, token, router]);

  if (!authInitialized) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (authInitialized && !user) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ClientSidebarWrapper />

      <main className="flex-1 ml-0 md:ml-[280px] lg:ml-[300px] overflow-hidden">{children}</main>
    </div>
  );
}

