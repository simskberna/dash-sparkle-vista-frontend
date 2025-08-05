import api from "@/lib/axios";

export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export const loginRequest = async (email: string, password: string): Promise<LoginResponse> => {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
};

export const logoutRequest = async (): Promise<never> => {
    return await api.post("/auth/logout");
};

export const registerRequest = async (email: string, password: string) => {
    const res = await api.post("/auth/register", { email, password });
    return res.data;
};

export const getProfile = async () => {
    const res = await api.get("/user/me");
    return res.data;
};
