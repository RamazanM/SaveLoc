import type { LoginCredentials, LoginResponse, RegisterCredentials } from "~/common/types.js";
import axiosInstance from "./AxiosInstance";



export default class AuthService {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        return axiosInstance.post("/auth/login", credentials).then((response: { status: number; data: { accessToken: string; refreshToken: string } }) => {
            if (response.status === 200) {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                return { success: true };
            }
            return { success: false, message: "Login failed" };
        });
    }

    async register(credentials: RegisterCredentials): Promise<LoginResponse> {
        return axiosInstance.post("/auth/register", credentials ).then((response: { status: number; data: { accessToken: string; refreshToken: string } }) => {
            if (response.status === 200) {
                return { success: true };
            }
            return { success: false, message: "Register failed" };
        });
    }

    logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }

    isLoggedIn() {
        if(localStorage==undefined) return false
        return !!localStorage.getItem("accessToken");
    }
}