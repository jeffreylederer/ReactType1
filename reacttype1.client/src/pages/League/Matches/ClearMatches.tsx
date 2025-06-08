import { useEffect, useState } from 'react';
import axios from "axios";
import LeagueClass from "@components/LeagueClass.tsx";
import Layout from '@layouts/Layout.tsx';
import { SetCount } from '@components/CountMatches.tsx';


const ClearMatches = () => {
    const league = new LeagueClass();

    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        GetData();
    });
    return (
        <Layout>
            <h3>Clear Matches</h3>
            <p style={{ textAlign: "center" }}>{errorMsg}</p>
        </Layout>
    );

    async function GetData() {
        const url: string = "/api/Matches/ClearSchedule/".concat(league.id.toString());
        axios.get(url)
            .then(response => {
                setErrorMsg("Schedule cleared");
                SetCount(0);
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

export default ClearMatches;