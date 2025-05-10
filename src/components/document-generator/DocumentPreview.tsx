import React from "react";
import { FileText } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/LoadingIndicators";
import { GeneratedDocument } from "@/types/models";
import DocumentTips from "./DocumentTips";

interface DocumentPreviewProps {
  loading: boolean;
  error: string | null;
  generatedDoc: GeneratedDocument | null;
  onDownload: () => void;
}

export default function DocumentPreview({ loading, error, generatedDoc, onDownload }: DocumentPreviewProps) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 lg:sticky lg:top-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-md font-semibold text-gray-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-700" />
          Preview Dokumen
        </h2>

        {generatedDoc && (
          <button onClick={onDownload} disabled={loading} className="text-sm text-purple-700 hover:text-purple-900 font-medium">
            Download
          </button>
        )}
      </div>

      <div className="border rounded-lg bg-gray-50 overflow-hidden">
        <div className="h-96 overflow-auto p-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <LoadingSpinner size="lg" />
              <p className="text-purple-600 font-medium">Membuat dokumen...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-500">{error}</div>
          ) : generatedDoc?.content ? (
            <div className="font-mono text-sm whitespace-pre-wrap">{generatedDoc.content}</div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FileText className="w-12 h-12 text-gray-300 mb-3" />
              <p className="mb-2">Preview dokumen akan ditampilkan di sini</p>
              <p className="text-sm text-center">Isi semua bidang yang diperlukan, lalu klik "Buat Dokumen"</p>
            </div>
          )}
        </div>

        {generatedDoc && (
          <div className="border-t p-3 bg-white">
            <button
              onClick={onDownload}
              disabled={loading}
              className="w-full px-4 py-2.5 text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:opacity-90 focus:outline-none transition-all shadow-md font-medium disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <LoadingSpinner size="sm" color="white" /> : "Download Dokumen"}
            </button>
          </div>
        )}
      </div>

      <DocumentTips />
    </div>
  );
}
