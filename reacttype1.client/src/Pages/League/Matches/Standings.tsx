import { useEffect, useState } from 'react';
import axios from "axios";
import { useLocation } from "react-router-dom";


function Standings() {
    const [report, setReport] = useState('');
    const location = useLocation();
    const id: string = location.search.substring(4);



    useEffect(() => {
        GetReport();
    });

    return (
        <embed src={report} type="application/pdf" width='1000' height='800' />

    );

    async function GetReport() {
        const url: string = import.meta.env.VITE_SERVER_URL+"api/Matches/Standings/".concat(id);
        axios.get(url)
            .then(response => {
                const data: string = "data:application/pdf;base64,".concat(response.data);
                setReport(data);

            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }


}



export default Standings;