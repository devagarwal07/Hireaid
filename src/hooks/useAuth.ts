import { useState, useEffect, useCallback } from "react";
import { authApi, setToken, removeToken, getStoredUser, setStoredUser, removeStoredUser } from "@/lib/api";

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    initials: string;
    notificationsCount: number;
}

interface UseAuthReturn {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

export function useAuth(): UseAuthReturn {
    const [user, setUser] = useState<User | null>(() => getStoredUser());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Check auth status on mount
    useEffect(() => {
        const storedUser = getStoredUser();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authApi.login({ email, password });
            if (response.success && response.data) {
                setToken(response.data.token);
                setStoredUser(response.data.user);
                setUser(response.data.user);
            }
        } catch (err: any) {
            setError(err.message || "Login failed");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (data: { email: string; password: string; firstName: string; lastName: string }) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authApi.register(data);
            if (response.success && response.data) {
                setToken(response.data.token);
                setStoredUser(response.data.user);
                setUser(response.data.user);
            }
        } catch (err: any) {
            setError(err.message || "Registration failed");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        removeToken();
        removeStoredUser();
        setUser(null);
        authApi.logout().catch(() => { }); // Fire and forget
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
    };
}
