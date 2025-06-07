import { Link } from 'react-router-dom';
import  UpdateFormData from "./UpdateFormData.tsx";
import LeagueClass from "@components/LeagueClass";
import UserClass from "@components/UserClass";
import Layout from '@layouts/Layout.tsx';
import Table from './Table.tsx';
import useFetch from '@hooks/useFetch.tsx';

function Players() {
    const user = new UserClass();
    const league = new LeagueClass();
    const permission: string = user.role;
    const allowed: boolean = (permission == "SiteAdmin" || permission == "Admin") ? false : true;
    
    
    const { data, isLoading, error } = useFetch<UpdateFormData[]>(`${import.meta.env.VITE_SERVER_URL}api/players/${league.id}`);

    if (isLoading)
        return <p aria-label="Loading">Loading...</p>;

    if (error)
        return <p aria-label="Error">Return Error: {error}</p>;

    if (data === null || (Array.isArray(data) && data.length === 0))
        return <Layout>

            <h3>Players in league {league.leagueName}</h3>
            <Link to="/League/Players/Create" hidden={allowed}>Add</Link>
            No PlaYERS
            <p>Number of players: {data && data.length}</p>
        </Layout>;

    return (
        <Layout>

            <h3>Players in league {league.leagueName}</h3>
            <Link to="/League/Players/Create" hidden={allowed}>Add</Link>
            <Table data={data} rowsPerPage={15} allowed={allowed} />
            <p>Number of players: {data && data.length}</p>
        </Layout>
    );

  
}

export default Players;