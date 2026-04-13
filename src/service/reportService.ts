import api from "./api";

const TYPE_TO_TAG: Record<string, string> = {
  fire: "QUEIMADA",
  flood: "ALAGAMENTO",
  landslide: "DESLIZAMENTO",
  noise: "POLUICAO_SONORA",
};

const TAG_TO_TYPE: Record<string, string> = {
  QUEIMADA: "fire",
  ALAGAMENTO: "flood",
  DESLIZAMENTO: "landslide",
  POLUICAO_SONORA: "noise",
};

export { TAG_TO_TYPE };

export interface ReportPayload {
  title: string;
  name: string;
  description: string;
  types: string[];
  address: string;
  lat: number | null;
  lng: number | null;
}

function buildFormData(data: ReportPayload, imageFiles?: File[]): FormData {
  const formData = new FormData();

  const reportData = {
    title: data.title,
    description: data.description,
    tags: data.types.map((t) => TYPE_TO_TAG[t] ?? t.toUpperCase()),
    lat: data.lat,
    lng: data.lng,
    address: data.address,
  };

  formData.append("data", JSON.stringify(reportData));

  if (imageFiles) {
    imageFiles.forEach((file) => formData.append("images", file));
  }

  return formData;
}

export const createReport = (data: ReportPayload, imageFiles?: File[]) =>
  api.post("/reports", buildFormData(data, imageFiles), {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateReport = (
  id: number,
  data: ReportPayload,
  imageFiles?: File[]
) =>
  api.put(`/reports/${id}`, buildFormData(data, imageFiles), {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getReport = (id: number) => api.get(`/reports/${id}`);

export interface ReportFilters {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  tags?: string[];
  startDate?: string;
  endDate?: string;
}

export const getReports = (filters: ReportFilters = {}) => {
  const { page = 0, size = 9, sort = "createdAt,desc", search, tags, startDate, endDate } = filters;

  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("size", String(size));
  params.append("sort", sort);

  if (search) params.append("search", search);
  if (tags && tags.length > 0) {
    tags.forEach((tag) => params.append("tags", tag));
  }
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  return api.get(`/reports?${params.toString()}`);
};

export const getUserReports = () =>
  api.get("/reports/my-reports");
