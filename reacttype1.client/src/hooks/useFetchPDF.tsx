import { useState, useEffect } from 'react';
import axios from 'axios';

interface ApiResponse {
    data: string;
    loading: boolean;
    error: string | null;
}

function useFetchPDF(url: string): ApiResponse {
    const [data, setData] = useState<string>("");
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
                    setError(`Exception: from use ${error}`);
                    console.log("fetch error", error);
                })
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
}


export default useFetchPDF;