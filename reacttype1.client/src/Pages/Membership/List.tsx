import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { UpdateFormData } from "./UpdateFormData.tsx";
import { User } from "@components/leagueObject.tsx";
import Layout from '@layouts/Layout.tsx';
import Table from '@components/Pagenation/Membership/Table.tsx';


function Membership() {
    const [membership, setmembership] = useState<UpdateFormData[]>();
    const allowed: boolean = (User().role == "SiteAdmin" || User().role == "Admin") ? false : true;

    useEffect(() => {
        GetData();
    });

    const contents = membership === undefined
        ? <p><em>Loading ...</em></p>
     
        : <Table data={membership} rowsPerPage={15} allowed={allowed} />

    return (

            <Layout>
            <h3 id="tableLabel">Membership</h3>
            <Link to="/Membership/Create" hidden={ allowed}>Add</Link>
            {contents}
            </Layout>
    );

    async function GetData() {
        axios.get(import.meta.env.VITE_SERVER_URL+"api/memberships")
            .then(response => {
                setmembership(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}

export default Membership;