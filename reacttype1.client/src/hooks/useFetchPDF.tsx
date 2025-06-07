import { useState, useEffect } from 'react';


function useFetchPDF(url: string): { data: string | null; error: string | null; isLoading: boolean } {
    const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();

        setData(null);
        setError(null);
        setIsLoading(true);

        fetch(url, { signal: abortController.signal })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.text();
            })
            .then((result) => {
                if (isMounted) setData("data:application/pdf;base64,".concat(result));
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


export default useFetchPDF;