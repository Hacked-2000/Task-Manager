import axios from "axios";
import { API_ENDPOINTS } from "../utils/apiEndpoints";

const api = axios.create({
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (payload) => api.post(API_ENDPOINTS.register, payload),
  login: (payload) => api.post(API_ENDPOINTS.login, payload),
};

export const taskApi = {
  getAll: (status) =>
    api.get(API_ENDPOINTS.tasks, {
      params: status ? { status } : undefined,
    }),
  create: (payload) => api.post(API_ENDPOINTS.tasks, payload),
  update: (id, payload) => api.patch(API_ENDPOINTS.taskById(id), payload),
  remove: (id) => api.delete(API_ENDPOINTS.taskById(id)),
};

export const getErrorMessage = (error) => {
  const data = error?.response?.data;
  if (data?.errors?.length) return data.errors.join(", ");
  return data?.message || "Something went wrong";
};

export default api;
