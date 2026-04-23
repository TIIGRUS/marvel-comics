import { useCallback, useState, Dispatch, SetStateAction } from 'react';
import { AsyncStatus } from '../types';

interface RequestOptions {
    url: string;
    method?: string;
    body?: BodyInit | null;
    headers?: HeadersInit;
}

interface UseHTTPResult {
    isLoading: boolean;
    error: string | null;
    status: AsyncStatus;
    request: (options: RequestOptions) => Promise<any>;
    clearError: () => void;
    setError: Dispatch<SetStateAction<string | null>>;
    setStatus: Dispatch<SetStateAction<AsyncStatus>>;
}

export const useHTTP = (): UseHTTPResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<AsyncStatus>('waiting');

    const request = async ({ url, method = "GET", body = null, headers = { 'Content-Type': 'application/json' } }: RequestOptions) => {
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

            return data;
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                throw error; // Re-throw the error to be handled by the caller
            } else {
                const message = String(error);
                setError(message);
            }

            setStatus('error');
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