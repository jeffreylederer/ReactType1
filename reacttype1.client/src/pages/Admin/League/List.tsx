import { Link } from 'react-router-dom';
import { UpdateFormData } from "./UpdateFormData.tsx";
import Layout from "@layouts/Layout.tsx";
import useFetch from '@hooks/useFetch.tsx';

function League() {

    const { data, isLoading, error } = useFetch<UpdateFormData[]>(`/api/leagues`);

    if (isLoading)
        return <p aria-label="Loading">Loading...</p>;

    if (error)
        return <p aria-label="Error">Return Error: {error}</p>;

    if (data === null || (Array.isArray(data) && data.length === 0))
        return (
            <Layout>
            <h3 id="tableLabel">Leagues</h3>
                <Link to="/Admin/League/Create">Add</Link>
               <p>No leagues</p>
            </Layout >
        );
   
        return (
            <Layout>

                <h3 id="tableLabel">Leagues</h3>
                <Link to="/Admin/League/Create">Add</Link>
                <table className="table table-striped" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>League Name</th>
                            <th>Active</th>
                            <th>Team Size</th>
                            <th>Divisions</th>
                            <th>Playoffs</th>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(item =>
                            <tr key={item.id.toString()}>
                                <td>{item.leagueName}</td>
                                <td>{item.active ? "Yes" : "No"}</td>
                                <td>{item.teamSize}</td>
                                <td>{item.divisions}</td>
                                <td>{item.playOffs ? "Yes" : "No"}</td>
                                <td><Link to="/Admin/League/Details" state={item.id.toString()}>Details</Link>|
                                    <Link to="/Admin/League/Update" state={item.id.toString()}>Update</Link>|
                                    <Link to="/Admin/League/Delete" state={item.id.toString()}>Delete</Link>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
            </Layout>
        );
   

   
}

export default League;