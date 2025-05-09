import { DocumentGeneratorRequest, GeneratedDocument, DocumentAnalysisResult } from "@/types/models";
import api from "../api_interceptor";

// Document Generator API
export const generateDocument = async (documentData: DocumentGeneratorRequest): Promise<GeneratedDocument> => {
  try {
    const response = await api.post("/documents/generate", documentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const downloadDocument = async (documentId: string): Promise<Blob> => {
  try {
    const response = await api.get(`/documents/${documentId}/download`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Document Analyzer API
export const analyzeDocument = async (file: File): Promise<DocumentAnalysisResult> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/documents/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
