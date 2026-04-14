import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const isLoginPage = window.location.pathname === "/login";
      if (!isLoginPage) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Extrai uma mensagem legível a partir de um erro Axios.
 */
export function extractErrorMessage(
  err: unknown,
  fallback = "Ocorreu um erro inesperado. Tente novamente."
): string {
  const axiosErr = err as {
    response?: { data?: { message?: string } };
    message?: string;
  };

  return (
    axiosErr?.response?.data?.message ??
    axiosErr?.message ??
    fallback
  );
}

export default api;
