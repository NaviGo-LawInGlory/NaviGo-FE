"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useMemo } from "react";
import { Check } from "lucide-react";
import { generateDocument, downloadDocument } from "@/services/api";
import { DocumentGeneratorRequest, GeneratedDocument, DocumentType } from "@/types/models";
import { LoadingSpinner } from "@/components/ui/LoadingIndicators";

// Import our components
import ProgressIndicator from "@/components/document-generator/ProgressIndicator";
import DocumentTypeSelector from "@/components/document-generator/DocumentTypeSelector";
import FormField from "@/components/document-generator/FormField";
import DocumentPreview from "@/components/document-generator/DocumentPreview";
import FormFieldGroup from "@/components/document-generator/FormFieldGroup";
import { documentTemplates } from "@/components/document-generator/DocumentTemplates";

export default function DocumentGenerator() {
  const { user, token } = useAuth();
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>(DocumentType.PERJANJIAN_KERJASAMA);
  const [formData, setFormData] = useState<DocumentGeneratorRequest>({
    documentType: DocumentType.PERJANJIAN_KERJASAMA,
    judul: "",
    perjanjian: "",
    pihak1: "",
    pihak2: "",
    deskripsi: "",
    tanggal: "",
  });
  const [generatedDoc, setGeneratedDoc] = useState<GeneratedDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Get the selected template
  const selectedTemplate = documentTemplates.find((template) => template.id === selectedDocType) || documentTemplates[0];

  // Calculate form completion percentage
  const completionPercentage = useMemo(() => {
    const requiredFields = selectedTemplate.fields.filter((field) => field.required);
    const completedFields = requiredFields.filter((field) => formData[field.key] && formData[field.key] !== "");
    return Math.round((completedFields.length / requiredFields.length) * 100);
  }, [formData, selectedTemplate]);

  // Group fields by category
  const fieldGroups = useMemo(() => {
    const groups: { [key: string]: typeof selectedTemplate.fields } = {
      "Informasi Dokumen": [],
      "Informasi Pihak": [],
      "Detil Perjanjian": [],
    };

    selectedTemplate.fields.forEach((field) => {
      if (field.key === "judul" || field.key === "perjanjian" || field.key === "tanggal") {
        groups["Informasi Dokumen"].push(field);
      } else if (field.key === "pihak1" || field.key === "pihak2" || field.key === "jabatan1" || field.key === "jabatan2" || field.key === "npwp") {
        groups["Informasi Pihak"].push(field);
      } else {
        groups["Detil Perjanjian"].push(field);
      }
    });

    return groups;
  }, [selectedTemplate]);

  // Reset form when document type changes
  useEffect(() => {
    const newFormData: DocumentGeneratorRequest = {
      documentType: selectedDocType,
      judul: "",
      perjanjian: "",
      pihak1: "",
      pihak2: "",
      deskripsi: "",
      tanggal: "",
    };
    setFormData(newFormData);
    setGeneratedDoc(null);
    setError(null);
    setSuccessMessage(null);
  }, [selectedDocType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDocTypeChange = (docType: DocumentType) => {
    setSelectedDocType(docType);
  };

  const handleGenerateDocument = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);
      const result = await generateDocument(formData);
      setGeneratedDoc(result);
      setSuccessMessage("Dokumen berhasil dibuat!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError("Failed to generate document");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDocument = async () => {
    if (!token || !generatedDoc?.id) return;

    try {
      const blob = await downloadDocument(generatedDoc.id);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${formData.judul || "document"}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setSuccessMessage("Dokumen berhasil diunduh!");
    } catch (err) {
      setError("Failed to download document");
      console.error(err);
    }
  };

  // Check if required fields are filled
  const canGenerateDocument = () => {
    const requiredFields = selectedTemplate.fields.filter((field) => field.required);
    return requiredFields.every((field) => formData[field.key] !== "");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 p-3 md:p-4 lg:p-6 overflow-y-auto">
        <div className="max-w-full lg:max-w-[95%] xl:max-w-[90%] mx-auto pb-20">
          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 text-green-600 flex items-center justify-between">
              <div className="flex items-center">
                <Check className="w-5 h-5 mr-2" />
                {successMessage}
              </div>
              <button onClick={() => setSuccessMessage(null)} className="text-green-700 hover:text-green-900">
                &times;
              </button>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 flex items-center justify-between">
              <div>{error}</div>
              <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900">
                &times;
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
            <div className="lg:col-span-3 space-y-6">
              {/* Progress indicator */}
              <ProgressIndicator completionPercentage={completionPercentage} />

              {/* Document Type Selector */}
              <DocumentTypeSelector documentTemplates={documentTemplates} selectedDocType={selectedDocType} onDocTypeChange={handleDocTypeChange} />

              {/* Form Fields by Group */}
              {Object.entries(fieldGroups).map(
                ([groupName, fields]) =>
                  fields.length > 0 && (
                    <FormFieldGroup key={groupName} title={groupName}>
                      {fields.map((field) => (
                        <FormField key={field.key} field={field} value={(formData[field.key] as string) || ""} onChange={handleInputChange} />
                      ))}
                    </FormFieldGroup>
                  )
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleGenerateDocument}
                  className="flex-1 px-4 py-3 text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl hover:opacity-90 focus:outline-none transition-all shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={loading || !canGenerateDocument()}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" color="white" />
                      <span className="ml-2">Membuat Dokumen...</span>
                    </>
                  ) : (
                    "Buat Dokumen"
                  )}
                </button>

                <button
                  onClick={() => {
                    const newFormData: DocumentGeneratorRequest = {
                      documentType: selectedDocType,
                      judul: "",
                      perjanjian: "",
                      pihak1: "",
                      pihak2: "",
                      deskripsi: "",
                      tanggal: "",
                    };
                    setFormData(newFormData);
                  }}
                  className="flex-initial px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl focus:outline-none transition-all font-medium flex items-center justify-center"
                  disabled={loading}
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <DocumentPreview loading={loading} error={error} generatedDoc={generatedDoc} onDownload={handleDownloadDocument} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
