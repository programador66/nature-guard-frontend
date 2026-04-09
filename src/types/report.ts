export interface Report {
  id?: number;
  title: string;
  userName: string;
  tags: string[];
  description: string;
  address?: string;
  lat?: number;
  lng?: number;
  images?: string[];
  createdAt?: string;
}
