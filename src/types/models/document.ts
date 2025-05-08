export interface DocumentGeneratorRequest {
  judul: string;
  perjanjian: string;
  pihak1: string;
  pihak2: string;
  deskripsi: string;
  tanggal: string;
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
