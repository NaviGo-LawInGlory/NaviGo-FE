"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { FileText } from "lucide-react";

export default function DocumentGeneratorPage() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    judul: "",
    perjanjian: "",
    pihak1: "",
    pihak2: "",
    deskripsi: "",
    tanggal: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateDocument = () => {
    console.log("Generating document with:", formData);
  };

  const handleDownloadDocument = () => {
    console.log("Downloading document");
  };

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 p-3 md:p-4 lg:p-6 overflow-y-auto">
        <div className="max-w-full lg:max-w-[95%] xl:max-w-[90%] mx-auto space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-5 pb-20">
              <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6">
                <label htmlFor="judul" className="block text-lg font-semibold mb-3 text-gray-800">
                  Judul
                </label>
                <input
                  type="text"
                  id="judul"
                  name="judul"
                  value={formData.judul}
                  onChange={handleInputChange}
                  placeholder="Masukkan judul dokumen"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700"
                />
              </div>

              <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6">
                <label htmlFor="perjanjian" className="block text-lg font-semibold mb-3 text-gray-800">
                  Perjanjian
                </label>
                <input
                  type="text"
                  id="perjanjian"
                  name="perjanjian"
                  value={formData.perjanjian}
                  onChange={handleInputChange}
                  placeholder="Masukkan jenis perjanjian"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700"
                />
              </div>

              <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Pihak</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Pihak 1</div>
                    <input
                      type="text"
                      id="pihak1"
                      name="pihak1"
                      value={formData.pihak1}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama pihak pertama"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700"
                    />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Pihak 2</div>
                    <input
                      type="text"
                      id="pihak2"
                      name="pihak2"
                      value={formData.pihak2}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama pihak kedua"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6">
                <label htmlFor="deskripsi" className="block text-lg font-semibold mb-3 text-gray-800">
                  Deskripsi
                </label>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  placeholder="Masukkan deskripsi dokumen"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700"
                />
              </div>

              <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6">
                <label htmlFor="tanggal" className="block text-lg font-semibold mb-3 text-gray-800">
                  Tanggal
                </label>
                <input
                  type="date"
                  id="tanggal"
                  name="tanggal"
                  value={formData.tanggal}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700"
                />
              </div>

              <button onClick={handleGenerateDocument} className="w-full px-4 py-3 text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl hover:opacity-90 focus:outline-none transition-all shadow-md font-medium">
                Generate Dokumen
              </button>
            </div>

            <div className="relative lg:h-[calc(100vh-2rem)]">
              <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6 lg:sticky lg:top-6 h-full flex flex-col">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-700" />
                  Preview Dokumen
                </h2>

                <div className="flex-1 border rounded-lg p-4 bg-gray-50 overflow-auto flex flex-col mb-4" style={{ minHeight: "500px" }}>
                  <div className="flex-1 flex items-center justify-center text-gray-500">Preview dokumen akan ditampilkan di sini</div>
                </div>

                <button onClick={handleDownloadDocument} className="w-full px-4 py-3 text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl hover:opacity-90 focus:outline-none transition-all shadow-md font-medium mt-auto">
                  Download Dokumen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
