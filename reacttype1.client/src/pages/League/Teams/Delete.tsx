import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { TeamMember } from "./TeamMember.ts";
import LeagueClass from '@components/LeagueClass.tsx';;
import { DeleteButton } from '@components/Buttons.tsx';
import Layout from '@layouts/Layout.tsx';
import deleteData from '@components/deleteData.tsx';


const TeamsDelete = () => {
    const league = new LeagueClass();
    const location = useLocation();
    const id: number = +location.search.substring(4);
   
    const [errorMsg, setErrorMsg] = useState("");
    const [team, setTeam] = useState<TeamMember>();

    
    const navigate = useNavigate();

    useEffect(() => {
        GetData();
    },[]);

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

            <tr hidden={league.teamSize < 3}>
                <td style={{ width: "200px" }}>Vice Skip:</td>
                <td className="Field">{team?.viceSkip}</td>
            </tr>

            <tr hidden={league.teamSize < 2}>
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
            <h3>Delete Team from league {league.leagueName} </h3>
            {contents}
            <p className="errorMessage">{errorMsg}</p>

        </Layout>
    );

    function GetData() {
        const data: TeamMember[] = JSON.parse(localStorage.getItem("teams") as string);
        setTeam(data.find(x => x.id == id));
    }

    

    async function DeleteItem() {

        try {
            await deleteData(`/api/Teams/${id}`);
            navigate("/League/Teams");
        }
        catch (error) {
            setErrorMsg(`${error}`);
        }
    }
}



export default TeamsDelete;