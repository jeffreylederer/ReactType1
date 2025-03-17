import { Link } from 'react-router-dom';
import useFetch from '@hooks/useFetch.tsx';
import { UpdateFormData } from "./UpdateFormData.tsx";
import { User } from "@components/leagueObject.tsx";
import Layout from '@layouts/Layout.tsx';
import Table from '@components/Pagenation/Membership/Table.tsx';


function Membership() {   
    const allowed: boolean = (User().role == "SiteAdmin" || User().role == "Admin") ? false : true;
    const { data , loading, error } = useFetch<UpdateFormData>(import.meta.env.VITE_SERVER_URL + "api/memberships");
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) 
        return <p>Error: {error}</p>;   

    return (

            <Layout>
            <h3 id="tableLabel">Membership</h3>
            <Link to="/Membership/Create" hidden={ allowed}>Add</Link>
            <Table data={data} rowsPerPage={15} allowed={allowed} />
            </Layout>
    );

   
}

export default Membership;