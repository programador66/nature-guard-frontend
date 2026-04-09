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

function buildFormData(data: ReportPayload, imageFile?: File): FormData {
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

  if (imageFile) {
    formData.append("images", imageFile);
  }

  return formData;
}

export const createReport = (data: ReportPayload, imageFile?: File) =>
  api.post("/reports", buildFormData(data, imageFile), {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateReport = (
  id: number,
  data: ReportPayload,
  imageFile?: File
) =>
  api.put(`/reports/${id}`, buildFormData(data, imageFile), {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getReport = (id: number) => api.get(`/reports/${id}`);

export const getReports = () => api.get("/reports");

export const getUserReports = (userId: string) =>
  api.get(`/reports/my-reports/${userId}`);
