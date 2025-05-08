export interface Activity {
  id: string;
  type: "generator" | "analyzer" | "chat";
  title: string;
  date: string;
  document_id?: string;
}
