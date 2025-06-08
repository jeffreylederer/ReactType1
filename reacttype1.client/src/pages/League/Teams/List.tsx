import { Link } from 'react-router-dom';
import { TeamMember } from "./TeamMember.tsx";
import LeagueClass from "@components/LeagueClass";
import UserClass from "@components/UserClass";
import Layout from '@layouts/Layout.tsx';
import './Teams.css';
import { GetCount } from '@components/CountMatches.tsx';
import useFetch from '@hooks/useFetch.tsx';


function Teams() {
    const user = new UserClass();
    const league = new LeagueClass();
    
    const permission: string = user.role;
    const updateAllowed: boolean = (permission == "SiteAdmin" || permission == "Admin"); 
    const allowed: boolean = updateAllowed &&  GetCount() == 0;

    

   
    const { data, isLoading, error } = useFetch<TeamMember[]>(`/api/Teams/${league.id}`);

    if (isLoading)
        return <p aria-label="Loading">Loading...</p>;

    if (error)
        return <p aria-label="Error">Return Error: {error}</p>;

    if (data === null || (Array.isArray(data) && data.length === 0))
        return (

            <Layout>
                <h3 aria-label="Membership table">Schedule for League {league.leagueName}</h3>
                <Link to="/League/Schedule/Create" hidden={!allowed}>Add</Link>
                <p>No Leagues</p>
            </Layout>
        );

   
    if (data === null || (Array.isArray(data) && data.length === 0))
        return (
            <Layout>
                <h3 id="tableLabel">Teams for League {league.leagueName}</h3>
                <Link to="/league/Teams/Create" hidden={!allowed}>Add</Link><br />
                
            </Layout>
        );
    if (data) {
        localStorage.setItem("teams", JSON.stringify(data));
        return (
            <Layout>
                <h3 id="tableLabel">Teams for League {league.leagueName}</h3>
                <Link to="/league/Teams/Create" hidden={!allowed}>Add</Link><br />
                <Link to="/league/Teams/Report" target="blank">Teams Report</Link>
                <table className="table table-striped" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>Team No</th>
                            <th>Skip</th>
                            <th hidden={league.teamSize < 3}>Vice Skip</th>
                            <th hidden={league.teamSize < 2}>Lead</th>
                            <th>Division</th>
                            <td hidden={allowed}></td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item =>
                            <tr key={item.id}>
                                <td>{item.teamNo}</td>
                                <td>{item.skip}</td>
                                <td hidden={league.teamSize < 3}>{item.viceSkip}</td>
                                <td hidden={league.teamSize < 2}>{item.lead}</td>
                                <td>{item.division}</td>
                                <td hidden={!updateAllowed}><Link to={`/league/Teams/Update`} state={item.id.toString()} >Update</Link><span hidden={!allowed}>|</span>
                                    <Link hidden={!allowed} to={`/league/Teams/Delete/?id=${item.id}`} >Delete</Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <p>Number of Teams: {data?.length}</p>
                <p>{error}</p>
            </Layout>
        );
    }

   
}

    

export default Teams;