import axios from "axios";

     
function UpdateData<T>(data: T, url:string):boolean {
    axios.put(url, data)
        .then(response => {
            console.log('Record updated successfully: ', response.data);
         
        })
        .catch(error => {
            console.error('Error updating record: ', error);
            return false;
        });
    return true;
};
    


export default UpdateData;