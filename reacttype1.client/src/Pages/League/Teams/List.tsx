import { Link } from 'react-router-dom';
import useFetch from '@hooks/useFetch.tsx';
import { TeamMember } from "./TeamMember.tsx";
import { User, League } from "@components/leagueObject.tsx";;
import Layout from '@layouts/Layout.tsx';


function Teams() {
    const { data, loading, error } = useFetch<TeamMember>(`${import.meta.env.VITE_SERVER_URL}api/teams/${League().id}`);
    const permission: string = User().role;
    const allowed: boolean = (permission == "SiteAdmin" || permission == "Admin") ? false : true;



    if (loading) {
        return <p>Loading...</p>;
    }

    if (error)
        return <p>Error: {error}</p>;

    if (!data)
        return (

            <Layout>

                <h3>Teams in league {League().leagueName}</h3>
                <Link to="/League/Teams/Create" hidden={allowed}>Add</Link>
                <p>No Teams</p>
            </Layout>
        );


    return (
        <Layout>
            <h3>Teams in league {League().leagueName}</h3>
            <div >
                <Link to="/League/Teams/Create" hidden={allowed}>Add</Link><br />
                <a href="/League/Teams/Report" target="_blank" >Team Report</a>
            </div>
            <table className="table table-striped" aria-labelledby="tableLabel">
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
                    {data.map(item =>
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
            </table>
            <p>Number of Teams: {data?.length}</p>

        </Layout>
    );
}

    

export default Teams;