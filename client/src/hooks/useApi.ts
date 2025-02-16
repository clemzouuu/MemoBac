import { useState } from 'react';
import apiClient from '../api/apiClient';

type ApiMethod = 'get' | 'post' | 'patch' | 'delete';

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const request = async <T>(
        method: ApiMethod,
        url: string,
        data?: any
    ): Promise<T | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiClient[method](url, data);
            return response.data;
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erreur inconnue');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { request, loading, error };
};