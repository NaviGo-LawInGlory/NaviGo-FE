"use client";

import { useAuth } from "@/context/AuthContext";

export default function DocumentGeneratorPage() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Document Generator</h1>
      <p className="mt-4">Welcome to the document generator tool.</p>
    </div>
  );
}
