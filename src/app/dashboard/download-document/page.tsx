"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useDocument } from "@/context/DocumentContext";
import { getDocumentContent } from "@/services/api";
import { LoadingSpinner } from "@/components/ui/LoadingIndicators";
import { ArrowLeft, Download } from "lucide-react";

export default function DownloadDocumentPage() {
  const { token } = useAuth();
  const { getDocumentFromCache, addDocumentToCache } = useDocument();
  const router = useRouter();
  const searchParams = useSearchParams();
  const documentId = searchParams.get("id");
  const documentTitle = searchParams.get("title") || "Document";

  const [documentContent, setDocumentContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDocumentContent() {
      if (!token || !documentId) {
        setError("Missing document information");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log(`Attempting to fetch document: ${documentId}`);

        const cachedDoc = getDocumentFromCache(documentId);

        if (cachedDoc?.content) {
          console.log("Found document in cache, using cached version");
          setDocumentContent(cachedDoc.content);
          setLoading(false);
          return;
        }

        console.log("Document not in cache, fetching from API");
        try {
          const content = await getDocumentContent(documentId);

          if (!content) {
            throw new Error("Received empty content from server");
          }

          console.log(`Document content fetched from API, length: ${content.length}`);
          setDocumentContent(content);

          addDocumentToCache(documentId, documentTitle, content);
        } catch (apiError: any) {
          console.error("API error fetching document:", apiError);
          throw new Error(apiError.message || "Could not retrieve document from server");
        }
      } catch (err: any) {
        console.error("Error in document fetching flow:", err);
        setError(err.message || "Failed to load document");
      } finally {
        setLoading(false);
      }
    }

    fetchDocumentContent();
  }, [token, documentId, documentTitle, getDocumentFromCache, addDocumentToCache]);

  const handleDownload = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600">Loading document...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-md text-center">
          <p className="font-medium mb-2">Error Loading Document</p>
          <p>{error}</p>
        </div>
        <button onClick={() => router.back()} className="mt-4 flex items-center text-purple-600 hover:text-purple-800">
          <ArrowLeft size={16} className="mr-1" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100">

      <div className="bg-white py-3 px-4 shadow-md flex justify-between items-center print:hidden sticky top-0 z-10">
        <button onClick={() => router.back()} className="flex items-center text-gray-700 hover:text-purple-700">
          <ArrowLeft size={18} className="mr-1.5" /> Back
        </button>
        <h1 className="text-lg font-medium text-center text-gray-800 flex-1">{documentTitle}</h1>
        <button onClick={handleDownload} className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg transition-colors">
          <Download size={16} /> Download
        </button>
      </div>


      <div className="flex-1 overflow-auto py-8 px-4 print:p-0 print:bg-white">
        {documentContent ? (
          <div className="mx-auto bg-white shadow-lg max-w-[210mm] w-full rounded-md overflow-visible print:shadow-none">
            <style>{`
              @media print {
                @page {
                  size: A4;
                  margin: 0.5cm;
                }
                body {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }
              }
            `}</style>
            <div className="p-[1cm]" dangerouslySetInnerHTML={{ __html: documentContent }} />
          </div>
        ) : (
          <div className="flex justify-center items-center p-8">
            <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg">No content available for this document.</div>
          </div>
        )}
      </div>
    </div>
  );
}

