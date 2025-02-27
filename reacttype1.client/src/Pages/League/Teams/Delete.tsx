import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import { TeamMember } from "./TeamMember.tsx";
import { League } from "@components/leagueObject.tsx";;
import { DeleteButton } from '@components/Buttons.tsx';
import Layout from '@layouts/Layout.tsx';


const TeamsDelete = () => {
    const location = useLocation();
    const id: number = location.state;
   
    const [errorMsg, SeterrorMsg] = useState("");
    const [team, setTeam] = useState<TeamMember>();

    
    const navigate = useNavigate();

    useEffect(() => {
        GetData();
    });

    const contents = team === undefined
        ? <p><em>Loading ...</em></p> :
        
        <table>
            <tr>
                <td className="Label">Team No:</td>
                <td className="Field">{team?.teamNo}</td>
            </tr>

            <tr>
                <td style={{ width: "200px" }}>Skip:</td>
                <td className="Field">{team?.skip}</td>
            </tr>

            <tr hidden={League().teamSize < 3}>
                <td style={{ width: "200px" }}>Vice Skip:</td>
                <td className="Field">{team?.viceSkip}</td>
            </tr>

            <tr hidden={League().teamSize < 2}>
                <td style={{ width: "200px" }}>Lead:</td>
                <td className="Field">{team?.lead}</td>
            </tr>

            <tr>
                <td style={{ width: "200px" }}>Division:</td>
                <td className="Field">{team?.division}</td>
            </tr>

            <tr>
                <td colSpan={2 }>
                    <DeleteButton DeleteItem={DeleteItem } />
                </td>
            </tr>
        </table>
        
    return (
        <Layout>
            <h3>Delete Team from league {League().leagueName} </h3>
            {contents}
            <p className="errorMessage">{errorMsg}</p>

        </Layout>
    );

    async function GetData() {
        const url: string = import.meta.env.VITE_SERVER_URL+'api/Teams/getOne/'.concat(id.toString());
        axios.get(url)
            .then(response => {
                setTeam(response.data);
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    async function DeleteItem() {
        const url: string = import.meta.env.VITE_SERVER_URL+'api/Teams/'.concat(id.toString());
        axios.delete(url)
            .then(response => {
                console.log(response.statusText);
                navigate("/League/Teams");
            })
            .catch(error => {
                SeterrorMsg(error.response.data);
            })
    }
}


export default TeamsDelete;