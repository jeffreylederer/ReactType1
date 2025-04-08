import { Link } from 'react-router-dom';
import  UpdateFormData from "./UpdateFormData.tsx";
import { User, League } from "@components/leagueObject.tsx";;
import Layout from '@layouts/Layout.tsx';
import Table from './Table.tsx';
import { useState, useEffect } from 'react';

function Players() {
   
    const permission: string = User().role;
    const allowed: boolean = (permission == "SiteAdmin" || permission == "Admin") ? false : true;
    const [data, setData] = useState<UpdateFormData[]>();
    const [error, setError] = useState<string>('');

    const fetchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/players/${League().id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = (await response.json()) as UpdateFormData[];
            setData(json);

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
        },[data]);

        const content = data === undefined ? <p>Loading...</p> : <Table data={data} rowsPerPage={15} allowed={allowed} />;

    return (
        <Layout>

            <h3>Players in league {League().leagueName}</h3>
            <Link to="/League/Players/Create" hidden={allowed}>Add</Link>
            {content }
            <p>Number of players: {data && data.length}</p>
            <p>{error}</p>
        </Layout>
    );

  
}

export default Players;