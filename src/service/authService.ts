import api from "./api";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmationPassword: string;
  isAutonomousMode: boolean;
}

export interface AuthResponse {
  id: string;
  name: string;
  email: string;
  isAutonomousMode: boolean;
  token: string;
}

export const register = (data: RegisterPayload) =>
  api.post<AuthResponse>("/auth/register", data);

export const login = (data: { email: string; password: string }) =>
  api.post<AuthResponse>("/auth/login", data);
