import axios from "axios";

// Create axios instance with backend URL
const api = axios.create({
  baseURL: "https://human-resource-management-system-hrms-4.onrender.com/api",
});

// Automatically attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
