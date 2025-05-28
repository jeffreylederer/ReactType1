const deleteData = async (url: string): Promise<any> => {
    const response = await fetch(url, { method: 'DELETE' });
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
        const error = (data && data.message) || response.statusText || response.status;
        throw new Error(`Error: ${error}`);
    }

    return data; // Or return true if you don't care about the response body.
};

export default deleteData;