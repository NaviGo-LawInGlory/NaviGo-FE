export interface Lawyer {
  id: string;
  name: string;
  specialization: string[];
  location: string;
  rating: number;
  experience_years: number;
  image_url: string;
  contact_info: {
    email: string;
    phone: string;
  };
  available: boolean;
}

export interface LawyerSearchParams {
  query?: string;
  specialization?: string[];
  location?: string;
  rating?: number;
  sort_by?: "rating" | "experience" | "name";
  sort_order?: "asc" | "desc";
  page?: number;
  limit?: number;
}
