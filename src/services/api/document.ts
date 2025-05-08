import { DocumentGeneratorRequest, GeneratedDocument, DocumentAnalysisResult } from "@/types/models";
import { API_BASE_URL, handleApiError, getAuthOptions } from "./core";

// Document Generator API
export const generateDocument = async (token: string, documentData: DocumentGeneratorRequest): Promise<GeneratedDocument> => {
  try {
    const response = await fetch(`${API_BASE_URL}/documents/generate`, {
      ...getAuthOptions(token, {
        method: "POST",
        body: JSON.stringify(documentData),
      }),
    });

    if (!response.ok) throw new Error("Failed to generate document");
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};

export const downloadDocument = async (token: string, documentId: string): Promise<Blob> => {
  try {
    const response = await fetch(`${API_BASE_URL}/documents/${documentId}/download`, getAuthOptions(token));
    if (!response.ok) throw new Error("Failed to download document");
    return await response.blob();
  } catch (error) {
    return handleApiError(error);
  }
};

// Document Analyzer API
export const analyzeDocument = async (token: string, file: File): Promise<DocumentAnalysisResult> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/documents/analyze`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to analyze document");
    return await response.json();
  } catch (error) {
    return handleApiError(error);
  }
};
