import AxiosInstance from "./AxiosInstance.js";

interface LoginResponse {
    success: boolean;
    message?: string;
}

export default class LoginService {
    async login(email: string, password: string): Promise<LoginResponse> {
        return AxiosInstance.post("/auth/login", {
            email: email,
            password: password
        }).then((response: { status: number; data: { accessToken: string; refreshToken: string } }) => {
            if (response.status === 200) {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                return { success: true };
            }
            return { success: false, message: "Login failed" };
        });
    }

    logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }

    isLoggedIn() {
        return !!localStorage.getItem("accessToken");
    }
}