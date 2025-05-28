

    
async function UpdateData<T>(data: T, url:string) {
    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => console.log(result));
        
};
    


export default UpdateData;