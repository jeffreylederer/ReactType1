import { Link } from 'react-router-dom';
import { ListData } from "./ListData.tsx";
import { User } from "@components/leagueObject.tsx";
import Layout from '@layouts/Layout.tsx';
import Table from './Table.tsx';
import { useState, useEffect } from 'react';

function Membership() {   
    const allowed: boolean = (User().role == "SiteAdmin" || User().role == "Admin") ? false : true;
    const [data, setData] = useState<ListData[]>();
    const [error, setError] = useState<string>('');


    const fetchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/memberships`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = (await response.json()) as ListData[];
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
    }, [data]);

    const content = data === undefined ? <p>Loading...</p> : <Table data={data} rowsPerPage={15} allowed={allowed} />;
    
    
    

    return (

            <Layout>
            <h3 id="tableLabel">Membership</h3>
            <Link to="/Membership/Create" hidden={ allowed}>Add</Link>
            {content}
            <p>{error}</p>
            </Layout>
    );

   
}

export default Membership;