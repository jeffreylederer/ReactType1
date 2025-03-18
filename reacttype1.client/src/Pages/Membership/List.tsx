import { Link } from 'react-router-dom';
import useFetch from '@hooks/useFetch.tsx';
import { UpdateFormData } from "./UpdateFormData.tsx";
import { User } from "@components/leagueObject.tsx";
import Layout from '@layouts/Layout.tsx';
import Table from './Table.tsx';


function Membership() {   
    const allowed: boolean = (User().role == "SiteAdmin" || User().role == "Admin") ? false : true;
    const { data , loading, error } = useFetch<UpdateFormData>(import.meta.env.VITE_SERVER_URL + "api/memberships");
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) 
        return <p>Error: {error}</p>;   

    if(!data)
        return (

            <Layout>
                <h3 id="tableLabel">Membership</h3>
                <Link to="/Membership/Create" hidden={allowed}>Add</Link>
                <p>No members</p>
            </Layout>
        )
    data.sort((a, b) => {
        return a.lastName.localeCompare(b.lastName) || a.firstName.localeCompare(b.firstName);
    });

    return (

            <Layout>
            <h3 id="tableLabel">Membership</h3>
            <Link to="/Membership/Create" hidden={ allowed}>Add</Link>
            <Table data={data} rowsPerPage={15} allowed={allowed} />
            </Layout>
    );

   
}

export default Membership;