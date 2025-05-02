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
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 p-3 md:p-4 lg:p-6 overflow-y-auto">
        <div className="max-w-full lg:max-w-[95%] xl:max-w-[90%] mx-auto space-y-4 md:space-y-6 pb-20">
          <div className="space-y-4">
            {historyData.length > 0 ? (
              historyData.map((item, index) => <HistoryList key={index} type={item.type} title={item.title} date={item.date} />)
            ) : (
              <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6 text-center">
                <p className="text-gray-500">No history found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
