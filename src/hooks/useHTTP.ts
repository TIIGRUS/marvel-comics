import { useCallback, useState, Dispatch, SetStateAction } from 'react';
import { AsyncStatus } from '../types';

interface UseHTTPOptions {
    url: string;
    method?: string;
    body?: BodyInit | null;
    headers?: HeadersInit;
}

interface UseHTTPResult {
    isLoading: boolean;
    error: string | null;
    status: AsyncStatus;
    request: <T = unknown>(options: UseHTTPOptions) => Promise<T>;
    clearError: () => void;
    setError: Dispatch<SetStateAction<string | null>>;
    setStatus: Dispatch<SetStateAction<AsyncStatus>>;
}

export const useHTTP = (): UseHTTPResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<AsyncStatus>('waiting');

    const request = async <T = unknown>({ url, method = "GET", body = null, headers = { 'Content-Type': 'application/json' } }: UseHTTPOptions): Promise<T> => {
        setIsLoading(true);
        setError(null);
        setStatus('loading');

        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                setStatus('error');
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                setStatus('error');
                throw new Error(`Error: ${data.error} at ${url}`);
            }

            setStatus('confirmed');

            return data as T;
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            setError(message);
            setStatus('error');
            throw error instanceof Error ? error : new Error(message);
        } finally {
            setIsLoading(false);
        }
    }

    const clearError = useCallback(() => {
        setError(null);
        setStatus('loading');
    }, []);

    return {
        isLoading,
        error,
        status,
        request,
        clearError,
        setError,
        setStatus
    };
}