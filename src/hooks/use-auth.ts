import { useMutation, useQuery } from "@tanstack/react-query";
import { login, register, getProfile, LoginData, RegisterData } from "@/services/authService";

export const useRegister = () => {
    return useMutation({
        mutationFn: (data: RegisterData) => register(data),
    });
};

export const useLogin = () => {
    return useMutation({
        mutationFn: (data: LoginData) => login(data),
    });
};

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
        enabled: typeof window !== "undefined" && !!localStorage.getItem("access_token"), // Token varsa
    });
};
