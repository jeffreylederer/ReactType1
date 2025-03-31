import axios from "axios";
function CreateData<T>(data: T, url: string): boolean {
    axios.post(url, data)
        .then((response) => {
            console.log(response.data);
        })
        .catch(error => {
            console.log('Error creating record: ', error);
            return false;
        });
    return true;
}

export default CreateData;