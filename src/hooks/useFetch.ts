import { useState, useEffect, useCallback } from "react";

interface UseFetchOptions {
    immediate?: boolean; // Whether to fetch immediately on mount (default: true)
}

interface UseFetchReturn<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useFetch<T = any>(
    fetchFn: () => Promise<{ success: boolean; data?: T; message?: string }>,
    deps: any[] = [],
    options: UseFetchOptions = {}
): UseFetchReturn<T> {
    const { immediate = true } = options;
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(immediate);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetchFn();
            if (response.success && response.data !== undefined) {
                setData(response.data);
            }
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    }, [fetchFn, ...deps]);

    useEffect(() => {
        if (immediate) {
            refetch();
        }
    }, [refetch, immediate]);

    return { data, isLoading, error, refetch };
}
