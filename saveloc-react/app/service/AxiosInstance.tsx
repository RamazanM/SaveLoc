import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
    }
});

instance.interceptors.response.use(undefined, function onRejected(error) {
    if (error.response && error.response.status === 401) {
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
    }
    return Promise.reject(error);
});

export default instance;