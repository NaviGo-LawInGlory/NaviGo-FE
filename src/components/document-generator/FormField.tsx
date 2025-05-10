import React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { DocumentTypeTemplate, DocumentGeneratorRequest } from "@/types/models";

interface FormFieldProps {
  field: DocumentTypeTemplate["fields"][0];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function FormField({ field, value, onChange }: FormFieldProps) {
  const isRequired = field.required;
  const isEmpty = !value;

  const fieldLabel = (
    <div className="flex items-center mb-1.5">
      <label htmlFor={field.key} className="text-sm font-medium text-gray-700">
        {field.label}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>

      {field.key === "deskripsi" && (
        <div className="relative group ml-1.5">
          <HelpCircle className="w-4 h-4 text-gray-400" />
          <div className="absolute left-full ml-2 bg-black text-white text-xs rounded p-2 w-48 invisible group-hover:visible z-10">Masukkan detil informasi tentang dokumen ini</div>
        </div>
      )}
    </div>
  );

  switch (field.type) {
    case "textarea":
      return (
        <div>
          {fieldLabel}
          <textarea
            id={field.key}
            name={field.key}
            value={value}
            onChange={onChange}
            placeholder={field.placeholder}
            rows={4}
            className={`w-full px-3 py-2 border ${isRequired && isEmpty ? "border-amber-200 bg-amber-50" : "border-gray-200"} rounded-lg focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 transition-colors`}
            required={field.required}
          />
          {isRequired && isEmpty && <p className="text-amber-600 text-xs mt-1">Bidang ini wajib diisi</p>}
        </div>
      );
    case "select":
      return (
        <div>
          {fieldLabel}
          <div className="relative">
            <select
              id={field.key}
              name={field.key}
              value={value}
              onChange={onChange}
              className={`w-full px-3 py-2 border ${
                isRequired && isEmpty ? "border-amber-200 bg-amber-50" : "border-gray-200"
              } rounded-lg focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 appearance-none transition-colors`}
              required={field.required}
            >
              <option value="">Pilih {field.label}</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
          {isRequired && isEmpty && <p className="text-amber-600 text-xs mt-1">Bidang ini wajib diisi</p>}
        </div>
      );
    default:
      return (
        <div>
          {fieldLabel}
          <input
            type={field.type}
            id={field.key}
            name={field.key}
            value={value}
            onChange={onChange}
            placeholder={field.placeholder}
            className={`w-full px-3 py-2 border ${isRequired && isEmpty ? "border-amber-200 bg-amber-50" : "border-gray-200"} rounded-lg focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700 transition-colors`}
            required={field.required}
          />
          {isRequired && isEmpty && <p className="text-amber-600 text-xs mt-1">Bidang ini wajib diisi</p>}
        </div>
      );
  }
}
