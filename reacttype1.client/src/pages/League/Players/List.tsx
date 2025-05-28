import { Link } from 'react-router-dom';
import  UpdateFormData from "./UpdateFormData.tsx";
import LeagueClass from "@components/LeagueClass";
import UserClass from "@components/UserClass";
import Layout from '@layouts/Layout.tsx';
import Table from './Table.tsx';
import { useState, useEffect } from 'react';

function Players() {
    const user = new UserClass();
    const league = new LeagueClass();
    const permission: string = user.role;
    const allowed: boolean = (permission == "SiteAdmin" || permission == "Admin") ? false : true;
    const [data, setData] = useState<UpdateFormData[]>();
    const [error, setError] = useState<string>('');

    const fetchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/players/${league.id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = (await response.json()) as UpdateFormData[];
            setData(json);
            localStorage.setItem("players", JSON.stringify(json));

        } catch (error) {
            let message: string;
            if (error instanceof Error)
                message = error.message
            else
                message = String(error)
            setError(message);
        }
    }

        useEffect(() => {
            fetchData();
        },[]);

        const content = data === undefined ? <p>Loading...</p> : <Table data={data} rowsPerPage={15} allowed={allowed} />;

    return (
        <Layout>

            <h3>Players in league {league.leagueName}</h3>
            <Link to="/League/Players/Create" hidden={allowed}>Add</Link>
            {content }
            <p>Number of players: {data && data.length}</p>
            <p>{error}</p>
        </Layout>
    );

  
}

export default Players;