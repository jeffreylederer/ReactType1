import { useState, useEffect } from 'react';

function useFetch<T>(url: string): { data: T | null; error: string | null; isLoading: boolean } {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();

        setIsLoading(true);
        setData(null);
        setError(null);

        fetch(url, { signal: abortController.signal })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.json();
            })
            .then((result) => {
                if (isMounted) setData(result);
            })
            .catch((err) => {
                if (abortController.signal.aborted) {
                    if (isMounted) setError('Fetch aborted');
                } else {
                    if (isMounted) setError(err.message);
                }
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
            abortController.abort();
        };
    }, [url]);

    return { data, error, isLoading };
}

export default useFetch;
