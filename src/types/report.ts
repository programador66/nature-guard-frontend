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

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
