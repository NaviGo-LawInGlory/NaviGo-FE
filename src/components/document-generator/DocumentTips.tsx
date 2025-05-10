import React from "react";
import { Info } from "lucide-react";

export default function DocumentTips() {
  return (
    <div className="mt-4 bg-blue-50 rounded-lg p-3 text-sm text-blue-700">
      <div className="flex">
        <Info className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
        <div>
          <p className="font-medium mb-1">Tips:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Pastikan semua informasi yang dimasukkan akurat</li>
            <li>Isi semua bidang yang ditandai dengan tanda bintang (*)</li>
            <li>Gunakan bahasa formal dan spesifik</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
