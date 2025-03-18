import { Link } from 'react-router-dom';
import { UpdateFormData } from "./UpdateFormData.tsx";
import { User, League } from "@components/leagueObject.tsx";;
import Layout from '@layouts/Layout.tsx';
import Table from './Table.tsx';
import useFetch from '@hooks/useFetch.tsx';

function Players() {
   
    const permission: string = User().role;
    const allowed: boolean = (permission == "SiteAdmin" || permission == "Admin") ? false : true;
    const { data, loading, error } = useFetch<UpdateFormData>(`${import.meta.env.VITE_SERVER_URL}api/players/${League().id}`);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error)
        return <p>Error: {error}</p>;

    if (!data)
        return (

            <Layout>

                <h3>Players in league {League().leagueName}</h3>
                <Link to="/League/Players/Create" hidden={allowed}>Add</Link>
                <p>No Players</p>
            </Layout>
        );

     

    return (
        <Layout>

            <h3>Players in league {League().leagueName}</h3>
            <Link to="/League/Players/Create" hidden={allowed}>Add</Link>
            <Table data={data} rowsPerPage={15} allowed={allowed} />
            <p>Number of players: {data.length}</p>
        </Layout>
    );

  
}

export default Players;