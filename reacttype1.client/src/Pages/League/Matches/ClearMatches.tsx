import { useEffect, useState } from 'react';
import axios from "axios";
import { league } from "../../../components/leagueObject.tsx";;
import Menu from "../../../components/Menu.tsx";



export const ClearMatches = () => {
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        GetData();
    });
    return (
        <>
        <Menu/>
            <h3>Clear Matches</h3>
            <p style={{ textAlign: "center"} }>{errorMsg}</p>
        </>
    );

    async function GetData() {
        const url: string = import.meta.env.VITE_SERVER_URL+"api/Matches/ClearSchedule/".concat(league().id.toString());
        axios.get(url)
            .then(response => {
                setErrorMsg("Schedule cleared");
                console.log(response.data);

            })
            .catch(error => {
                if (error.response.status === 404)
                    setErrorMsg("Could not find service")
                else
                    setErrorMsg(error.response.data);
            })
    }
}