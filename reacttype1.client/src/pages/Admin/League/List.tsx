import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { UpdateFormData } from "./UpdateFormData.tsx";
import Layout from "@layouts/Layout.tsx";

function League() {
    const [league, SetLeague] = useState<UpdateFormData[]>();


    useEffect(() => {
        GetData();
    });

    const contents = league === undefined
        ? <p><em>Loading ...</em></p>

        : <table className="table table-striped" aria-labelledby="tableLabel">
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
                {league.map(item =>
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
        </table>;

    return (
        <Layout>

            <h3 id="tableLabel">Leagues</h3>
            <Link to="/Admin/League/Create">Add</Link>
            {contents}
        </Layout>
    );

    async function GetData() {
        axios.get(import.meta.env.VITE_SERVER_URL+"api/leagues")
            .then(response => {
                SetLeague(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}

export default League;