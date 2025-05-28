import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { FormData } from "./FormData.tsx";
import {DeleteButton} from '@components/Buttons.tsx';
import Layout from "@layouts/Layout.tsx";
import useFetch from '@hooks/useFetch.tsx';
import Delete from '@components/deleteData.tsx';



const LeagueDelete = () => {
    const location = useLocation();
    const id: number = location.state;
    const [errorMsg, setErrorMsg] = useState('');
    

    
    const { data, isLoading, error } = useFetch<FormData>(`${import.meta.env.VITE_SERVER_URL}/api/leagues/${id}`);


    const navigate = useNavigate();

    if (error)
        return (
            <Layout>
                <h3>Update membership record</h3>
                {error}
            </Layout>
        );

    if (isLoading)
        return (
            <Layout>
                <h3>Update membership record</h3>
                <p>Loading...</p>
            </Layout>
        );
    if (data) {



        return (
            <Layout>
                <h3>Delete league {data.leagueName}</h3>
                <table className="toLeft">

                    <tr>
                        <td className="Label">Active:</td>
                        <td className="Field">{data.active ? "Yes" : "No"}</td>

                    </tr>
                    <tr>
                        <td className="Label">Team Size:</td>
                        <td className="Field">{data.teamSize}</td>
                    </tr>
                    <tr>
                        <td className="Label">Ties Allowed:</td>
                        <td className="Field">{data.tiesAllowed ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td className="Label">Points Count:</td>
                        <td className="Field">{data.pointsCount ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td className="Label">Points for a Win:</td>
                        <td className="Field">{data.winPoints}</td>
                    </tr>
                    <tr>
                        <td className="Label">Points for a Tie:</td>
                        <td className="Field">{data.tiePoints}</td>
                    </tr>
                    <tr>
                        <td className="Label">Points for a Bye:</td>
                        <td className="Field">{data.byePoints}</td>
                    </tr>
                    {/*<tr>*/}
                    {/*    <td className="Label">Start Week:</td>*/}
                    {/*    <td className="Field">data.startWeek}</td>*/}
                    {/*</tr>*/}
                    <tr>
                        <td className="Label">Points Limit:</td>
                        <td className="Field">{data.pointsLimit ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td className="Label">Divisions:</td>
                        <td className="Field">{data.divisions}</td>
                    </tr>
                    <tr>
                        <td className="Label">Playoffs:</td>
                        <td className="Field">{data.playOffs ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} >

                            <DeleteButton DeleteItem={DeleteItem} />
                        </td>
                    </tr>
                </table>
                <p className="errorMessage">{errorMsg}</p>
            </Layout>
        );
    }

   

    async function DeleteItem() {
        try {
            await Delete(`${import.meta.env.VITE_SERVER_URL}/api/leagues/${id}`);
            navigate("/Admin/leagues");
        }
        catch (error) {
            setErrorMsg(`${error}`);
        }

      
    }
}


export default LeagueDelete;