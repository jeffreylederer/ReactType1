import { useState, useEffect,useRef } from 'react';


function useFetch<T>(url: string): { data: T | null; error: string | null; isLoading: boolean } {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        // Initialize the AbortController
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        setIsLoading(true);

        fetch(url, { signal: abortController.signal })
            .then((response) => {
                if (!response.ok) {
                    setError(`Error: ${response.statusText}`);
                    return;
                }
                return response.json();
            })
            .then((result) => {
                setData(result);
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    setError('Fetch aborted');
                } else {
                    setError(err.message);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });

        // Cleanup function to abort fetch on unmount
        return () => {
            abortController.abort();
        };
    }, [url]);

    return { data, error, isLoading };
}


export default useFetch;