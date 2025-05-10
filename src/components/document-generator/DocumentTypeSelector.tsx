import React from "react";
import { Check } from "lucide-react";
import { DocumentType, DocumentTypeTemplate } from "@/types/models";

interface DocumentTypeSelectorProps {
  documentTemplates: DocumentTypeTemplate[];
  selectedDocType: DocumentType;
  onDocTypeChange: (docType: DocumentType) => void;
}

export default function DocumentTypeSelector({ documentTemplates, selectedDocType, onDocTypeChange }: DocumentTypeSelectorProps) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 mb-6">
      <h3 className="text-md font-medium text-gray-700 mb-3">Pilih Jenis Dokumen</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {documentTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => onDocTypeChange(template.id)}
            className={`cursor-pointer border rounded-lg p-3 transition-all ${selectedDocType === template.id ? "border-purple-500 bg-purple-50 shadow-sm" : "border-gray-200 hover:border-purple-300 hover:bg-purple-50/30"}`}
          >
            <div className="flex items-start mb-2">
              <div className={`w-4 h-4 rounded-full mr-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${selectedDocType === template.id ? "bg-purple-600" : "border border-gray-400"}`}>
                {selectedDocType === template.id && <Check className="w-3 h-3 text-white" />}
              </div>
              <div>
                <h4 className="font-medium text-gray-800 text-sm">{template.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{template.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
