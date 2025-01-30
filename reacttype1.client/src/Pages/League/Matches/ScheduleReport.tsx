import { useEffect, useState } from 'react';
import axios from "axios";
import { league } from "../../../components/leagueObject.tsx";;


function ScheduleRepor() {
    const [report, setReport] = useState('');

    useEffect(() => {
        GetReport();
    });

    return (
        <embed src={report} type="application/pdf" width='1000' height='800' />

    );

    async function GetReport() {
        const url: string = import.meta.env.VITE_SERVER_URL + "api/Matches/ScheduleReport/".concat(league().id.toString());
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



export default ScheduleRepor;