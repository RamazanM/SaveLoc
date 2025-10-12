import axios from "axios";

interface ImportMetaEnv {
    VITE_BASE_API_URL: string;
    // add other env variables here if needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare global {
    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}

export default axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
    }
}).interceptors.response.use(undefined, function onRejected(error) {
    if (error.response && error.response.status === 401) {
        // Handle unauthorized access, e.g., redirect to login
        window.location.href = '/login';
    }
    return Promise.reject(error);
});