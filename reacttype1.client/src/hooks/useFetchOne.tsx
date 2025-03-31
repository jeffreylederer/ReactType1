import { useState, useEffect } from 'react';

interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

function useFetchOne<T>(url: string, index: number): ApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url+"/"+index.toString());
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = (await response.json()) as T;
                setData(json);
                setLoading(false);
            } catch (error) {
                let message: string;
                if (error instanceof Error)
                    message = error.message
                else
                    message = String(error)
                setError(message);
                setLoading(false);
            }
        };
        fetchData();
    });

    return { data, loading, error };
}


export default useFetchOne;