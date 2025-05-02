'use client';

import { useState } from 'react';

export default function DocumentGenerator() {
  const [formData, setFormData] = useState({
    judul: '',
    perjanjian: '',
    pihak1: '',
    pihak2: '',
    deskripsi: '',
    tanggal: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateDocument = () => {
    console.log('Generating document with:', formData);
  };

  const handleDownloadDocument = () => {
    console.log('Downloading document');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8 relative">
        <div className="max-w-2xl mx-auto space-y-4 mb-24">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label htmlFor="judul" className="block bg-gradient-to-r from-[#A31ABE] to-[#E250CE] text-transparent bg-clip-text font-medium mb-2">
              Judul
            </label>
            <input
              type="text"
              id="judul"
              name="judul"
              value={formData.judul}
              onChange={handleInputChange}
              placeholder="Masukkan judul dokumen"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#A31ABE]"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label htmlFor="perjanjian" className="block bg-gradient-to-r from-[#A31ABE] to-[#E250CE] text-transparent bg-clip-text font-medium mb-2">
              Perjanjian
            </label>
            <input
              type="text"
              id="perjanjian"
              name="perjanjian"
              value={formData.perjanjian}
              onChange={handleInputChange}
              placeholder="Masukkan jenis perjanjian"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#A31ABE]"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="bg-gradient-to-r from-[#A31ABE] to-[#E250CE] text-transparent bg-clip-text font-medium mb-2">
              Pihak
            </div>
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
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#A31ABE]"
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
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#A31ABE]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label htmlFor="deskripsi" className="block bg-gradient-to-r from-[#A31ABE] to-[#E250CE] text-transparent bg-clip-text font-medium mb-2">
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              placeholder="Masukkan deskripsi dokumen"
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#A31ABE]"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <label htmlFor="tanggal" className="block bg-gradient-to-r from-[#A31ABE] to-[#E250CE] text-transparent bg-clip-text font-medium mb-2">
              Tanggal
            </label>
            <input
              type="date"
              id="tanggal"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#A31ABE]"
            />
          </div>
        </div>

        <div className="fixed bottom-8 w-[calc(50%-2rem)] px-8">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleGenerateDocument}
              className="w-full px-4 py-3 text-white bg-gradient-to-r from-[#A31ABE] to-[#E250CE] rounded-xl hover:opacity-90 focus:outline-none transition-all shadow-lg"
            >
              Generate Dokumen
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
          <h2 className="text-2xl font-semibold mb-6">Preview Dokumen</h2>
          
          <div className="flex-1 border rounded-lg p-4 mb-6 bg-gray-50">
            <div className="h-full flex items-center justify-center text-gray-500">
              Preview dokumen akan ditampilkan di sini
            </div>
          </div>

          <button
            onClick={handleDownloadDocument}
            className="w-full px-4 py-3 text-white bg-gradient-to-r from-[#A31ABE] to-[#E250CE] rounded-xl hover:opacity-90 focus:outline-none transition-all shadow-lg"
          >
            Download Dokumen
          </button>
        </div>
      </div>
    </div>
  );
}