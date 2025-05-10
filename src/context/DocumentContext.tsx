"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface DocumentData {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

interface DocumentContextType {
  documentCache: Record<string, DocumentData>;
  addDocumentToCache: (id: string, title: string, content: string) => void;
  getDocumentFromCache: (id: string) => DocumentData | null;
  clearDocumentCache: () => void;
}

const DOC_CACHE_KEY = "navigo_document_cache";

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider = ({ children }: { children: ReactNode }) => {
  const [documentCache, setDocumentCache] = useState<Record<string, DocumentData>>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedCache = localStorage.getItem(DOC_CACHE_KEY);
        return savedCache ? JSON.parse(savedCache) : {};
      } catch (err) {
        console.error("Error parsing document cache from localStorage:", err);
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(DOC_CACHE_KEY, JSON.stringify(documentCache));
      } catch (err) {
        console.error("Error saving document cache to localStorage:", err);
      }
    }
  }, [documentCache]);

  const addDocumentToCache = (id: string, title: string, content: string) => {
    console.log(`Adding document to cache: ${id}, ${title}`);
    setDocumentCache((prev) => ({
      ...prev,
      [id]: {
        id,
        title,
        content,
        timestamp: Date.now(),
      },
    }));
  };

  const getDocumentFromCache = (id: string) => {
    console.log(`Attempting to get document from cache: ${id}`);
    return documentCache[id] || null;
  };

  const clearDocumentCache = () => {
    console.log("Clearing document cache");
    setDocumentCache({});
    if (typeof window !== "undefined") {
      localStorage.removeItem(DOC_CACHE_KEY);
    }
  };

  return (
    <DocumentContext.Provider
      value={{
        documentCache,
        addDocumentToCache,
        getDocumentFromCache,
        clearDocumentCache,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error("useDocument must be used within a DocumentProvider");
  }
  return context;
};

