import { Link } from 'react-router-dom';
import { ListData } from "./ListData.tsx";
import UserClass from "@components/UserClass.tsx";
import Layout from '@layouts/Layout.tsx';
import Table from './Table.tsx';
import useFetch from '@hooks/useFetch.tsx';

function Membership() {   
    const user = new UserClass();
    const hide: boolean = !(user.role == "SiteAdmin" || user.role == "Admin");
  
    const { data, loading, error } = useFetch<ListData>(`${import.meta.env.VITE_SERVER_URL}api/memberships`);

    if (loading)
        return <p>Loading...</p>;

    if (error)
        <p>Return Error: {error}</p>;

    if (data === null)
        return (

            <Layout>
                <h3 id="tableLabel">Membership</h3>
                <Link to="/Membership/Create" hidden={hide}>Add</Link>
                No Members
                <p>{error}</p>
            </Layout>
        );

    return (

            <Layout>
            <h3 id="tableLabel">Membership</h3>
            <Link to="/Membership/Create" hidden={ hide}>Add</Link>
             <Table data={data} rowsPerPage={15} hide={hide} />
            <p>{error}</p>
            </Layout>
    );

   
}

export default Membership;