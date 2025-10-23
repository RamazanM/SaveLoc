import axios from "axios";
import AuthService from "./AuthService";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let expires_at = parseInt(localStorage.getItem("expires_at") || "0");
    if (expires_at < Date.now() && !config.url?.startsWith("/auth/")) {
      console.log("Token Expired, refreshing...");

      let newToken = await new AuthService().refreshToken(
        localStorage.getItem("refreshToken") || ""
      );
      if (newToken.success) {
        config.headers.Authorization =
          "Bearer " + localStorage.getItem("accessToken");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(undefined, function onRejected(error) {
  if (error.response && error.response.status === 401) {
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }
  return Promise.reject(error);
});

export default axiosInstance;
