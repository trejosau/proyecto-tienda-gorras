import axiosClient from "./axiosClient";

interface LoginResponse {
    message: string;
    token: string;
    role: string;
    userId: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>("/login", { email, password });

    // Guardamos el token y el id del usuario
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("userRole", response.data.role);
    localStorage.setItem("userId", response.data.userId);

    return response.data;
};
