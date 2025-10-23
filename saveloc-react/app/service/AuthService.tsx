import type {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  TokenPairResponse,
} from "~/common/types.js";
import axiosInstance from "./AxiosInstance";

export default class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return axiosInstance
      .post("/auth/login", credentials)
      .then((response: { status: number; data: TokenPairResponse }) => {
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem(
            "expires_at",
            response.data.expiresAt.toString()
          );
          return { success: true };
        }
        return { success: false, message: "Login failed" };
      });
  }

  async register(credentials: RegisterCredentials): Promise<LoginResponse> {
    return axiosInstance
      .post("/auth/register", credentials)
      .then(
        (response: {
          status: number;
          data: { accessToken: string; refreshToken: string };
        }) => {
          if (response.status === 200) {
            return { success: true };
          }
          return { success: false, message: "Register failed" };
        }
      );
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    return axiosInstance
      .post("/auth/refresh", { refreshToken: refreshToken })
      .then((response: { status: number; data: TokenPairResponse }) => {
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem(
            "expires_at",
            response.data.expiresAt.toString()
          );
          return { success: true };
        }
        return { success: false, message: "Refresh Token failed" };
      });
  }

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  isLoggedIn() {
    if (localStorage == undefined) return false;
    return !!localStorage.getItem("accessToken");
  }
}
