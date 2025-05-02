"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/me");
  }, [router]);

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-8">
        <p>Redirecting to profile...</p>
      </div>
    </div>
  );
}

