import { Link } from 'react-router-dom';
import { ListData } from "./ListData.tsx";
import UserClass from "@components/UserClass.tsx";
import Layout from '@layouts/Layout.tsx';
import Table from './Table.tsx';
import useFetch from '@hooks/useFetch.tsx';

function Membership() {   
    const user = new UserClass();
    const hideAddButton: boolean = !(user.role == "SiteAdmin" || user.role == "Admin");
  
    const { data, loading, error } = useFetch<ListData[]>(`${import.meta.env.VITE_SERVER_URL}api/memberships`);

    if (loading)
        return <p aria-label="Loading">Loading...</p>;

    if (error)
        return <p aria-label="Error">Return Error: {error}</p>;

    if( data===null || (Array.isArray(data) && data.length === 0))
        return (

            <Layout>
                <h3 aria-label="Membership table">Membership</h3>
                <Link to="/Membership/Create" hidden={hideAddButton} aria-label="Add Membership">Add</Link>
                No Members
            </Layout>
        );

    return (

          <Layout>
            <h3 aria-label="Membership table">Membership</h3>
            <Link to="/Membership/Create" hidden={hideAddButton} aria-label="Add Membership">Add</Link>
            <Table data={data} rowsPerPage={15} hide={hideAddButton} />
          </Layout>
    );

   
}

export default Membership;