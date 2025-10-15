import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    console.log("Axios token:"+token);
    
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

axiosInstance.interceptors.response.use(undefined, function onRejected(error) {
    if (error.response && error.response.status === 401) {
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
});

export default axiosInstance;