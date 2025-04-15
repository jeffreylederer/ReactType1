import { useLocation, useNavigate, } from "react-router-dom";
import { League } from '@components/leagueObject.tsx';
import { Button } from "flowbite-react";
import Layout from '@layouts/Layout.tsx';
import UpdateFormData from './UpdateFormData.tsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PlayersDelete = () => {
    const location = useLocation();
    const id: number = location.state;

    const navigate = useNavigate();

    const [player, setPlayer] = useState<UpdateFormData>();
    const [error, setError] = useState<string>('');

    function GetData() {

        const data: UpdateFormData[] = JSON.parse(localStorage.getItem("players") as string);
        setPlayer(data.find(x => x.id == id));
    }

    useEffect(() => {
        GetData();
    }, []);


    const contests = player === undefined
        ? <p><em>Loading ...</em></p> :


        <table>
            <tr>
                <td className="Label">Name:</td>
                <td className="Field">{player.fullName}</td>
            </tr>
            <tr>
                <td colSpan={2} >
                    <Button pill color="gray" onClick={() => DeleteItem(id)}>Delete Record</Button>&nbsp;&nbsp;
                    <Button pill color="gray" onClick={() => navigate(-1)}>Go back to list</Button>
                </td>
            </tr>
        </table>;
    <p>{error}</p>



    return (
        <Layout>
            <h2>Delete player from league {League().leagueName} </h2>
            {contests}
            <p>{error}</p>
        </Layout>
    );


    


    async function DeleteItem(id: number) {


        const fullUrl = `${import.meta.env.VITE_SERVER_URL}api/players/${id}`;
        await axios
            .delete(fullUrl)
            .then(response => {
                console.log(response.statusText);
                navigate("/league/players");

            })
            .catch(error => {
                if (error.response)
                    setError(error.response.data);
            })
    }
}


export default PlayersDelete;