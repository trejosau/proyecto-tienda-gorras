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

// Definir el tipo de la respuesta de la API
interface User {
    id: string;
    status_delivery: boolean;
    username: string;
    password: string;
    email: string;
    phone: string;
    role: string;
    name: string;
    last_name: string;
    updatedAt: string;
    createdAt: string;
}

interface RegisterResponse {
    message: string;
    user: User;
    token: string;
    role: string;
}

// Registrar cliente
export const registerClient = async (
    username: string,
    password: string,
    email: string,
    phone: string,
    name: string,
    lastName: string,
    role: string
): Promise<RegisterResponse> => {
    try {
        const response = await axiosClient.post<RegisterResponse>("/user/register-client", {
            username,
            password,
            email,
            phone,
            name,
            last_name: lastName,
            role, // El rol será "client"
        });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || "Error al registrar cliente");
        }
        throw new Error("Error desconocido");
    }
};

// Registrar repartidor
export const registerDeliveryMan = async (
    username: string,
    password: string,
    email: string,
    phone: string,
    name: string,
    lastName: string,
    role: string
): Promise<RegisterResponse> => {
    try {
        const response = await axiosClient.post<RegisterResponse>("/user/register-deliveryman", {
            username,
            password,
            email,
            phone,
            name,
            last_name: lastName,
            role, // El rol será "deliveryPerson"
        });
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || "Error al registrar repartidor");
        }
        throw new Error("Error desconocido");
    }
};