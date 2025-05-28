const Delete = async (url: string) => {
   

    fetch(url, { method: 'DELETE' })
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }



        })
        .catch(error => {
            throw new Error(`Error: ${error}`);
   
        });
}

export default Delete;
