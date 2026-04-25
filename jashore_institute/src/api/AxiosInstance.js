import axios from "axios";

// 🔁 Detect environment
const BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_BASE_URL_PROD
    : import.meta.env.VITE_API_BASE_URL_LOCAL;

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Request Interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // ✅ FIX: use Bearer instead of Token
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Response Interceptor
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔥 Optional but VERY useful improvement
    if (error.response?.status === 401) {
      console.warn("Unauthorized - logging out");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    console.error("API ERROR:", error.response || error);
    return Promise.reject(error);
  }
);

export default AxiosInstance;