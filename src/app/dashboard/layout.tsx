"use client";

import ClientSidebarWrapper from "@/components/sidebar/ClientSidebarWrapper";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!user && typeof window !== "undefined") {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex">
      <ClientSidebarWrapper />
      <main className="flex-1 ml-[280px] md:ml-[280px] lg:ml-[300px] min-h-screen">{children}</main>
    </div>
  );
}
