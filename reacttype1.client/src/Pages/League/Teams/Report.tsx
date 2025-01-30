import { useEffect, useState } from 'react';
import { league } from "../../../components/leagueObject.tsx";;
import axios from "axios";


function TeamReport() {
    const [report, setReport] = useState('');
   
    

    

    useEffect(() => {
        GetReport();
    });

    return (
        <embed src={report} type="application/pdf" width = '1000' height = '800' />
       
    );

    async function GetReport() {
        const url: string = import.meta.env.VITE_SERVER_URL+"api/Teams/TeamReport/".concat(league().id.toString());
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



export default TeamReport;