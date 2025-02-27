import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { TeamMember } from "./TeamMember.tsx";
import { User, League } from "@components/leagueObject.tsx";;
import Layout from '@layouts/Layout.tsx';


function Teams() {
    const [team, setTeam] = useState<TeamMember[]>();
    const permission: string = User().role;
    const allowed: boolean = (permission == "SiteAdmin" || permission == "Admin") ? false : true;

    

    useEffect(() => {
        GetData();
    });

    const contents = team === undefined
        ? <p><em>Loading ...</em></p>

        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Team No</th>
                    <th>Skip</th>
                    <th hidden={League().teamSize < 3}>Vice Skip</th>
                    <th hidden={League().teamSize < 2}>Lead</th>
                    <th>Division</th>
                    <td hidden={allowed}></td>
                </tr>
            </thead>
            <tbody>
                {team.map(item =>
                    <tr key={item.id}>
                        <td>{item.teamNo}</td>
                        <td>{item.skip}</td>
                        <td hidden={League().teamSize < 3}>{item.viceSkip}</td>
                        <td hidden={League().teamSize < 2}>{item.lead}</td>
                        <td>{item.division}</td>
                        <td hidden={allowed}><Link to="/league/Teams/Update" state={item.id.toString()}>Update</Link>|
                            <Link to="/league/Teams/Delete" state={item.id.toString()}>Delete</Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <Layout>
            <h3>Teams in league {League().leagueName}</h3>
            <div >
            <Link to="/League/Teams/Create" hidden={allowed}>Add</Link><br/>
                <a href="/League/Teams/Report" target="_blank" >Team Report</a>
            </div>
            {contents}
            <p>Number of Teams: {team?.length}</p>
            
        </Layout>
    );

    async function GetData() {
       const url: string = import.meta.env.VITE_SERVER_URL+"api/Teams/".concat(League().id.toString());
        axios.get(url)
            .then(response => {
                setTeam(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}

export default Teams;