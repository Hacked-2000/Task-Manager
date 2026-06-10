const BASE_URL =
  import.meta.env.VITE_API_BASE_URL

export const API_ENDPOINTS = {
  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,
  tasks: `${BASE_URL}/tasks`,
  taskById: (id) => `${BASE_URL}/tasks/${id}`,
};
