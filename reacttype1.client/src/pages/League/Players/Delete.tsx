import { useLocation, useNavigate, } from "react-router-dom";
import LeagueClass from "@components/LeagueClass";
import Layout from '@layouts/Layout.tsx';
import UpdateFormData from './UpdateFormData.tsx';
import useFetch from '@hooks/useFetch.tsx';
import deleteData from '@components/deleteData.tsx';
import { useState } from 'react';
import { DeleteButton } from '@components/Buttons.tsx';

const PlayersDelete = () => {
    const location = useLocation();
    const id: number = location.state;
    const league = new LeagueClass();
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const { data, isLoading, error } = useFetch<UpdateFormData>(`${import.meta.env.VITE_SERVER_URL}api/players/{id}`);

    if (error)
        return (
            <Layout>
                <h3>Delete Member</h3>
                {error}
            </Layout>
        );

    if (isLoading)
        return (
            <Layout>
                <h3>Delete Member</h3>
                <p>Loading...</p>
            </Layout>
        );

    if (data) {
        return (
            <Layout>
                <h2>Delete player from league {league.leagueName} </h2>
                <table>
                    <tr>
                        <td className="Label">Name:</td>
                        <td className="Field">{data.fullName}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} >
                            <DeleteButton DeleteItem={deleteItem} />
                        </td>
                    </tr>
                </table>;
                <p>{errorMsg}</p>
            </Layout>
        );
    }


    async function deleteItem() {
        try {
            await deleteData(`${import.meta.env.VITE_SERVER_URL}api/players/${id}`);
            navigate("/league/players");
        }
        catch (error) {
            setErrorMsg(`${error}`);
        }
     }
}


    



export default PlayersDelete;