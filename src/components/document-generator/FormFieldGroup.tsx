import React from "react";

interface FormFieldGroupProps {
  title: string;
  children: React.ReactNode;
}

export default function FormFieldGroup({ title, children }: FormFieldGroupProps) {
  return (
    <div className="bg-white shadow-sm rounded-xl mb-6">
      <div className="border-b border-gray-100 px-5 py-3">
        <h3 className="text-md font-medium text-gray-700">{title}</h3>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  );
}
