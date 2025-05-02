"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function DocumentAnalyzer() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState({
    judul: "",
    tanggal: "",
    pihak: "",
    deskripsi: "",
    pihak2: "",
    perjanjian: "",
  });

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    // TODO: Implement actual document analysis
    console.log("Analyzing document:", selectedFile.name);
    setAnalysisResult({
      judul: "Sample Title",
      tanggal: "2024-03-15",
      pihak: "Party One",
      deskripsi: "Sample description of the document...",
      pihak2: "Party Two",
      perjanjian: "Agreement Type",
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 p-3 md:p-4 lg:p-6 overflow-y-auto">
        <div className="max-w-full lg:max-w-[95%] xl:max-w-[90%] mx-auto space-y-4 md:space-y-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

            <div className="space-y-5">
              <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Upload Document</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  {previewUrl ? (
                    <div className="relative w-full aspect-square max-w-[280px] mx-auto mb-4">
                      <Image src={previewUrl} alt="Document preview" fill className="object-contain rounded-lg" />
                    </div>
                  ) : (
                    <div className="text-gray-500 mb-4">Drag and drop your PDF here or click to browse</div>
                  )}
                  <input type="file" accept="application/pdf,image/*" onChange={handleFileChange} className="hidden" id="fileInput" />
                  <label htmlFor="fileInput" className="inline-block px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    Browse Files
                  </label>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!selectedFile}
                className="w-full px-4 py-3 text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl hover:opacity-90 focus:outline-none transition-all shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Analyze Document
              </button>
            </div>


            <div>
              <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Analysis Results</h3>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Judul</label>
                  <input type="text" value={analysisResult.judul} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50" placeholder="Extracted title will appear here" />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Tanggal</label>
                  <input type="text" value={analysisResult.tanggal} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50" placeholder="Extracted date will appear here" />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Pihak 1</label>
                  <input type="text" value={analysisResult.pihak} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50" placeholder="Extracted party name will appear here" />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Deskripsi</label>
                  <textarea value={analysisResult.deskripsi} readOnly rows={4} className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50" placeholder="Extracted description will appear here" />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Pihak 2</label>
                  <input type="text" value={analysisResult.pihak2} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50" placeholder="Extracted second party name will appear here" />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Perjanjian</label>
                  <input type="text" value={analysisResult.perjanjian} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50" placeholder="Extracted agreement type will appear here" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

