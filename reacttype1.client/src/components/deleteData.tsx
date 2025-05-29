const deleteData = async (url: string): Promise<void> => {
    const response = await fetch(url, { method: 'DELETE' });
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
        const error = (data && data.message) || response.statusText || response.status;
        throw new Error(`Error: ${error}`);
    }

};

export default deleteData;