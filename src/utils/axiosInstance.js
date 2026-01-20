import axios from "axios";
import { BASE_URL } from "./apiPaths.js";

const api = axios.create({
  baseURL: BASE_URL, // backend base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//Request Inceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (error.response.status === 500) {
      console.error("Server error.Please try again later");
    }
    return Promise.reject(error);
  }
);

export default api;
