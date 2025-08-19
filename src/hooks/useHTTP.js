import { useCallback, useState } from 'react';

export const useHTTP = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('waiting');

    const request = async ({ url, method = "GET", body = null, headers = { 'Content-Type': 'application/json' } }) => {
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