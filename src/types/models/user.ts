import { Activity } from "./activity";

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  account_type: string;
}

export interface UserStats {
  documents_generated: number;
  documents_analyzed: number;
  recent_activities: Activity[];
}

export interface UpdateUserProfileRequest {
  name: string;
  location?: string;
  phone?: string;
  bio?: string;
}
