import { useState, useEffect } from 'react';

import LeagueClass, { LeagueType } from "@components/LeagueClass.tsx";
import UserClass from '@components/UserClass';
import { useNavigate } from "react-router-dom";
import Layout from "@layouts/Layout.tsx";

function Home() {

    const navigate = useNavigate();
    const [data, setData] = useState<LeagueType[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const selected = (data: LeagueType) => {
        const league = new LeagueClass();
        league.Initialize(data);
        navigate("/Welcome")
    }

    const fetchData = async () => {
        if (!data) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/leagues`);
                if (!response.ok) {
                    setError(`HTTP error! status: ${response.status}`);
                }
                const json = (await response.json()) as LeagueType[];
                setData(json);
                setLoading(false);
            } catch (error) {
                let message: string;
                if (error instanceof Error)
                    message = error.message
                else
                    message = String(error)
                setError(message);
                setLoading(false);
            }
        }
    }


    useEffect(() => {
        const user = new UserClass();
        if (user === undefined || user.id == 0)
            navigate("/Login");
        const league = new LeagueClass();
        league.Remove();
        fetchData();
    });

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error)
        return <p>Error: {error}</p>;

    if (!data)
        return (

            <Layout>
                <h3 id="tableLabel">Select League</h3>
                <p>No leagues specified</p>
            </Layout>
        )
    else {
        const leagues: LeagueType[] = data.filter((word) => word.active)
        const league = new LeagueClass();
        league.Remove();
        return (
            <Layout>
                <h3 id="tableLabel">Select League</h3>
                <table className="table table-striped" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>League Name</th>
                            <th>Team Size</th>
                            <th>Divisions</th>
                            <th>Playoffs</th>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {leagues.map(data =>
                            <tr key={data.id.toString()}>
                                <td>{data.leagueName}</td>
                                <td>{data.teamSize}</td>
                                <td>{data.divisions}</td>
                                <td>{data.playOffs ? "Yes" : "No"}</td>
                                <td><button onClick={() => selected(data)} >
                                    select
                                </button>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>

            </Layout>
        );
    }


}


export default Home;