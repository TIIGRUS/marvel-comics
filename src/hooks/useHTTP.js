import { useCallback, useState } from 'react';

export const useHTTP = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = async ({ url, method = "GET", body = null, headers = { 'Content-Type': 'application/json' } }) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(`Error: ${data.error} at ${url}`);
            }

            return data;
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                throw error; // Re-throw the error to be handled by the caller
            } else {
                const message = String(error);
                setError(message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const clearError = useCallback(() => setError(null), []);

    return { isLoading, error, request, clearError, setError };
}