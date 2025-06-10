import { useEffect, useState } from 'react';
import Layout from '@layouts/Layout.tsx';
import LeagueClass from "@components/LeagueClass";;

import { SetCount } from '@components/CountMatches.tsx';

const CreateMatches = () => {
    const [errorMsg, setErrorMsg] = useState('Created matches');
    const league = new LeagueClass();
    useEffect(() => {
        GetData();
    });
    return (
        <Layout>
            <h3>Create Schedule</h3>
            <p style={{ textAlign: "center" }}>{errorMsg}</p>
        </Layout>
    );

    

    async function GetData() {
        try {
            const response = await fetch(`/api/Matches/CreateSchedule/${league.id}`);
            if (!response.ok) {
                setErrorMsg(`HTTP error! Status: ${response.status}`);
                return;
            }
            const json = await response.text();
            if (json === "Created matches")
                SetCount(1);
            else
                setErrorMsg(json);
        } catch (error) {
            setErrorMsg(`Error:, ${error}`);
        }
    }
}

export default CreateMatches;