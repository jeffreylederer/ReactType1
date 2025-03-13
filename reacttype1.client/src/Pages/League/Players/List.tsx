import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { UpdateFormData } from "./UpdateFormData.tsx";
import { User, League } from "@components/leagueObject.tsx";;
import Layout from '@layouts/Layout.tsx';
import Table from '@components/Pagenation/Players/Table.tsx';

function Players() {
    const [player, setplayer] = useState<UpdateFormData[]>();
    const permission: string = User().role;
    const allowed: boolean = (permission == "SiteAdmin" || permission == "Admin") ? false : true;


    useEffect(() => {
        GetData();
    });

    const contents = player === undefined
        ? <p><em>Loading ...</em></p>

        : <Table data={player} rowsPerPage={15} allowed={allowed} />

    return (
        <Layout>

            <h3>Players in league {League().leagueName}</h3>
            <Link to="/League/Players/Create" hidden={allowed}>Add</Link>
            {contents}
            <p>Number of players: {player?.length}</p>
        </Layout>
    );

    async function GetData() {
       

        const url: string = import.meta.env.VITE_SERVER_URL+"api/players/".concat(League().id.toString());
        axios.get(url)
            .then(response => {
                setplayer(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}

export default Players;