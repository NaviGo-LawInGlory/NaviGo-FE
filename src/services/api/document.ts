import { DocumentGeneratorRequest, GeneratedDocument, DocumentAnalysisResult, DocumentType } from "@/types/models";
import api from "../api_interceptor";
import { documentTemplates } from "@/components/document-generator/DocumentTemplates";

// Document Generator API
export const generateDocument = async (documentData: DocumentGeneratorRequest): Promise<GeneratedDocument> => {
  try {
    // Find the template for this document type
    const template = documentTemplates.find((t) => t.id === documentData.documentType);

    if (!template) {
      throw new Error("Invalid document type");
    }

    // Create a filtered request that only includes relevant fields for this document type
    const relevantFieldKeys = template.fields.map((field) => field.key);
    const filteredRequestData: Record<string, any> = { documentType: documentData.documentType };

    // Only include fields that are defined in the template
    relevantFieldKeys.forEach((key) => {
      if (documentData[key as keyof DocumentGeneratorRequest] !== undefined) {
        filteredRequestData[key] = documentData[key as keyof DocumentGeneratorRequest];
      }
    });

    // Send only the filtered data to the API
    const response = await api.post("/documents/generate", filteredRequestData);
    return response.data;
  } catch (error: any) {
    console.error("Document generation error:", error);
    throw new Error(error.response?.data?.message || "Failed to generate document. Please try again.");
  }
};

export const downloadDocument = async (documentId: string): Promise<Blob> => {
  try {
    console.log(`Downloading document with ID: ${documentId}`);

    const response = await api.get(`/documents/${documentId}/download`, {
      responseType: "blob",
      headers: {
        Accept: "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    });

    // Check if we have a valid blob response
    if (!(response.data instanceof Blob)) {
      throw new Error("Invalid response format");
    }

    return response.data;
  } catch (error: any) {
    console.error("Document download error:", error);
    throw new Error(error.response?.data?.message || "Failed to download document. Please try again.");
  }
};

export const getDocumentContent = async (documentId: string): Promise<string> => {
  try {
    console.log(`Fetching document content with ID: ${documentId}`);

    const response = await api.get(`/documents/${documentId}/content`, {
      responseType: "text",
      headers: {
        Accept: "text/html, application/json, */*",
      },
    });

    if (!response.data) {
      throw new Error("Empty response received from server");
    }

    // The response could be either raw HTML or a JSON object with content field
    let htmlContent = "";

    try {
      // Try to parse as JSON first
      const jsonData = typeof response.data === "string" ? JSON.parse(response.data) : response.data;

      // If parsing succeeded and we have a content field, use that
      if (jsonData && jsonData.content) {
        console.log("Received JSON response with content field");
        htmlContent = jsonData.content;
      } else {
        // If JSON doesn't have content field, use raw response
        console.log("Received JSON but no content field, using raw data");
        htmlContent = response.data;
      }
    } catch (e) {
      // If JSON parsing fails, assume it's raw HTML
      console.log("Received raw HTML content");
      htmlContent = response.data;
    }

    if (!htmlContent) {
      throw new Error("Could not extract HTML content from response");
    }

    console.log("Document content fetched successfully, length:", htmlContent.length);
    return htmlContent;
  } catch (error: any) {
    console.error("Document content fetch error:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch document content. Please try again.");
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

    // Ensure the response structure matches our UI expectations
    const data = response.data;

    // If the response doesn't contain all the required fields, map them with default values
    const result: DocumentAnalysisResult = {
      judul: data.judul || data.title || "",
      tanggal: data.tanggal || data.date || "",
      pihak: data.pihak || data.party1 || "",
      pihak2: data.pihak2 || data.party2 || "",
      deskripsi: data.deskripsi || data.description || "",
      perjanjian: data.perjanjian || data.agreement_type || "",
    };

    return result;
  } catch (error) {
    console.error("Document analysis error:", error);
    throw new Error("Failed to analyze document. Please check your file and try again.");
  }
};
