import { useEffect, useState } from 'react';
import axios from "axios";
import Layout from '@layouts/Layout.tsx';
import LeagueClass from "@components/LeagueClass";;

import { SetCount } from '@components/CountMatches.tsx';

const CreateMatches = () => {
    const [errorMsg, setErrorMsg] = useState('Matches created');
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
        const url: string = "/api/Matches/CreateSchedule/".concat(league.id.toString());
        axios.get(url)
            .then(response => {
                SetCount(1);
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

export default CreateMatches;