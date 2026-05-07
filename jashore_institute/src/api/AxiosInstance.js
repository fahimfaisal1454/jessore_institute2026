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

// =============================
// REQUEST INTERCEPTOR
// =============================
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =============================
// RESPONSE INTERCEPTOR
// =============================
AxiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // 🔥 Handle expired access token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      // No refresh token
      if (!refresh) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // Request new access token
        const res = await axios.post(
          `${BASE_URL}refresh/`,
          {
            refresh,
          }
        );

        const newAccess = res.data.access;

        // Save new token
        localStorage.setItem("token", newAccess);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return AxiosInstance(originalRequest);

      } catch (refreshError) {
        console.warn("Refresh token expired - logging out");

        localStorage.clear();
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    console.error("API ERROR:", error.response || error);

    return Promise.reject(error);
  }
);

export default AxiosInstance;