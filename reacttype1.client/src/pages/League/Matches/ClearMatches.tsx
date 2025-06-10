import { useEffect, useState } from 'react';
import LeagueClass from "@components/LeagueClass.tsx";
import Layout from '@layouts/Layout.tsx';
import { SetCount } from '@components/CountMatches.tsx';


const ClearMatches = () => {
    const league = new LeagueClass();

    const [errorMsg, setErrorMsg] = useState('Cleared matches');
    useEffect(() => {
        GetData();
    },[]);
    return (
        <Layout>
            <h3>Clear Matches</h3>
            <p style={{ textAlign: "center" }}>{errorMsg}</p>
        </Layout>
    );

    

    async function GetData() {
        try {
            const response = await fetch(`/api/Matches/ClearSchedule/${league.id}`);
            if (!response.ok) {
                setErrorMsg(`HTTP error! Status: ${response.status}`);
                return;
            }
            const json = await response.text();
            if (json === "Cleared matches")
                SetCount(0);
            else
                setErrorMsg(json);
        } catch (error) {
            setErrorMsg(`Error:, ${error}`);
        }
    }
}

export default ClearMatches;