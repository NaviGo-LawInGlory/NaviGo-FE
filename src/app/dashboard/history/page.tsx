"use client";

import HistoryList from "@/app/components/History/HistoryList";
import { useAuth } from "@/context/AuthContext";

const historyData = [
  {
    type: "generator",
    title: "Draft Perjanjian Sewa Rumah",
    date: "01/05/2025",
  },
  {
    type: "analyzer",
    title: "Review Dokumen Kontrak Kerja",
    date: "28/04/2025",
  },
  {
    type: "generator",
    title: "Template Surat Kuasa",
    date: "25/04/2025",
  },
];

export default function HistoryPage() {
  const { user } = useAuth();

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-8">
        {historyData.map((item, index) => (
          <HistoryList key={index} type={item.type} title={item.title} date={item.date} />
        ))}
      </div>
    </div>
  );
}
