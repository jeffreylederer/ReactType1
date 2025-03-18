import { useState, useEffect } from 'react';
import axios from 'axios';

interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

function useFetchPDF<T>(url: string): ApiResponse<T> {
    const [data, setData] = useState<T>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
             axios.get(url)
                .then(response => {
                    const results: string = "data:application/pdf;base64,".concat(response.data);
                    if (results)
                        setData(results);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                })
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
}


export default useFetchPDF;