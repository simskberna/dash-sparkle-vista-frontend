import React, { createContext, useContext, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {loginRequest, registerRequest, getProfile, logoutRequest} from "@/services/authService";

interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => void;
    register: (email: string, password: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // İlk açılışta token varsa profili çek
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setIsLoading(false);
            return;
        }
        getProfile()
            .then((data) => setUser(data))
            .catch(() => logout())
            .finally(() => setIsLoading(false));
    }, []);

    const loginMutation = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            loginRequest(email, password),
        onSuccess: (data) => {
            localStorage.setItem("access_token", data.access_token);
            getProfile().then((profile) => setUser(profile));
        },
    });
    const logoutMutation = useMutation({
        mutationFn: () =>
            logoutRequest(),
        onSuccess: (data) => {
            localStorage.removeItem("access_token");
        },
    });

    const registerMutation = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) =>
            registerRequest(email, password),
        onSuccess: () => {
            // Register sonrası direkt login yaptırmak için istersen buraya loginRequest ekleyebilirsin
        },
    });

    const login = async (email: string, password: string) => {
        await loginMutation.mutateAsync({email, password});
    };

    const register = (email: string, password: string) => {
        registerMutation.mutate({ email, password });
    };

    const logout = async () => {
        await logoutMutation.mutateAsync();
        localStorage.removeItem("access_token");
        setUser(null);
        queryClient.clear();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                isLoading: isLoading || loginMutation.isPending || registerMutation.isPending,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
