import React, { useEffect, useState, useRef } from "react";
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
  const [previewHeight, setPreviewHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate the preview height based on A4 aspect ratio
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        // A4 aspect ratio is 1:1.414 (width:height)
        const containerWidth = containerRef.current.offsetWidth;
        setPreviewHeight(containerWidth * 1.414);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Prepare a properly formatted HTML document for the iframe
  const prepareHtmlContent = () => {
    if (!generatedDoc?.content) return "";

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document Preview</title>
        <style>
          @page {
            size: A4;
            margin: 0.5cm;
          }
          
          html, body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #000000;
            background: #ffffff;
          }
          
          body {
            padding: 0.5cm;
            box-sizing: border-box;
          }
          
          h1 {
            font-size: 16pt;
            margin-bottom: 0.8cm;
            text-align: center;
          }
          
          h2 {
            font-size: 14pt;
            margin-top: 0.6cm;
            margin-bottom: 0.3cm;
          }
          
          h3 {
            font-size: 12pt;
            margin-top: 0.4cm;
            margin-bottom: 0.2cm;
          }
          
          p {
            margin-bottom: 0.3cm;
            font-size: 10pt;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 0.6cm;
            font-size: 9pt;
          }
          
          table, th, td {
            border: 1px solid #000;
          }
          
          th, td {
            padding: 0.15cm;
            text-align: left;
            vertical-align: top;
          }
          
          .signature-area {
            margin-top: 1cm;
            display: flex;
            justify-content: space-between;
          }
          
          .signature-box {
            width: 45%;
          }
          
          .signature-line {
            margin-top: 1cm;
            border-top: 1px solid #000;
            padding-top: 0.15cm;
          }
        </style>
      </head>
      <body>
        ${generatedDoc.content}
      </body>
      </html>
    `;
  };

  return (
    <div className="bg-white shadow-sm rounded-xl p-5 lg:sticky lg:top-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-md font-semibold text-gray-800 flex items-center gap-2">
          <FileText className="w-5 h-5 text-purple-700" />
          Preview Dokumen
        </h2>

        {generatedDoc && !loading && (
          <button onClick={onDownload} className="text-sm text-purple-700 hover:text-purple-900 font-medium">
            Lihat
          </button>
        )}
      </div>

      <div className="border rounded-lg bg-gray-200 overflow-hidden p-6 flex justify-center">
        <div ref={containerRef} className="relative w-[210mm] max-w-full shadow-lg" style={{ height: previewHeight ? `${previewHeight}px` : "auto" }}>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 bg-white rounded-md">
              <LoadingSpinner size="lg" />
              <p className="text-purple-600 font-medium">Membuat dokumen...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-500 bg-white rounded-md">{error}</div>
          ) : generatedDoc?.content ? (
            <iframe srcDoc={prepareHtmlContent()} className="absolute top-0 left-0 w-full h-full border-0 bg-white" title="Document Preview" sandbox="allow-same-origin" />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-white rounded-md">
              <FileText className="w-12 h-12 text-gray-300 mb-3" />
              <p className="mb-2">Preview dokumen akan ditampilkan di sini</p>
              <p className="text-sm text-center">Isi semua bidang yang diperlukan, lalu klik "Buat Dokumen"</p>
            </div>
          )}
        </div>
      </div>

      {generatedDoc && (
        <div className="border-t p-3 bg-white mt-4">
          <button
            onClick={onDownload}
            disabled={loading}
            className="w-full px-4 py-2.5 text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:opacity-90 focus:outline-none transition-all shadow-md font-medium disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? <LoadingSpinner size="sm" color="white" /> : "Lihat Dokumen"}
          </button>
        </div>
      )}

      <DocumentTips />
    </div>
  );
}
