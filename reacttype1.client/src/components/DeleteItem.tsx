import axios from "axios";

function DeleteItem(url: string, id: number) : boolean{
    
    const fullUrl = url + "/" + id.toString();
    axios.delete(fullUrl)
        .then(response => {
            console.log(response.statusText);
            
        })
        .catch(error => {
            console.log(error);
            return false;
        })
    return true;
}

export default DeleteItem;