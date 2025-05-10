export interface DocumentGeneratorRequest {
  documentType: DocumentType;
  judul: string;
  perjanjian: string;
  pihak1: string;
  pihak2: string;
  deskripsi: string;
  tanggal: string;
  nilai?: string;
  durasi?: string;
  alamat?: string;
  npwp?: string;
  jabatan1?: string;
  jabatan2?: string;
  penyelesaianSengketa?: string;
  hukumYangBerlaku?: string;
  tempatPenandatanganan?: string;
}

export enum DocumentType {
  PERJANJIAN_KERJASAMA = "perjanjian_kerjasama",
  PERJANJIAN_JUAL_BELI = "perjanjian_jual_beli",
  PERJANJIAN_SEWA = "perjanjian_sewa",
  SURAT_KUASA = "surat_kuasa",
  PERJANJIAN_KERAHASIAAN = "perjanjian_kerahasiaan",
}

export interface DocumentTypeTemplate {
  id: DocumentType;
  name: string;
  description: string;
  fields: Array<{
    key: keyof DocumentGeneratorRequest;
    label: string;
    type: "text" | "textarea" | "date" | "number" | "select";
    placeholder: string;
    required: boolean;
    options?: string[];
  }>;
}

export interface GeneratedDocument {
  id: string;
  content: string;
  download_url: string;
}

export interface DocumentAnalysisResult {
  judul: string;
  tanggal: string;
  pihak: string;
  pihak2: string;
  perjanjian: string;
  deskripsi: string;
}

