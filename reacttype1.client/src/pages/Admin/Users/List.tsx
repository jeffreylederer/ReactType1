import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { DetailsType } from "./DetailsType.tsx";
import Layout from "@layouts/Layout.tsx";
import UserClass from "@components/UserClass.tsx";

function Users() {
    const user = new UserClass();
    const permission: string = user.role;
    const [Users, SetUsers] = useState<DetailsType[]>();
    const allowed: boolean = permission !== "SiteAdmin";

    useEffect(() => {
        GetData();
    });

    const contents = Users === undefined
        ? <p><em>Loading ...</em></p>

        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Users Name</th>
                    <th>Active</th>
                    <th>Display Name</th>
                    <th>Role</th>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {Users.map(item =>
                    <tr key={item.id.toString()}>
                        <td>{item.userName}</td>
                        <td>{item.isActive ? "Yes" : "No"}</td>
                        <td>{item.displayName}</td>
                        <td>{item.role}</td>
                        
                        <td><Link to="/Admin/Users/Update" state={item.id.toString()}>Update</Link>|
                            <Link to="/Admin/Users/Delete" state={item.id.toString()}>Delete</Link><span hidden={allowed}>|</span>
                            <Link hidden={allowed} to="/Admin/Users/ChangePassword" state={item.id.toString()}>Change Password</Link>
                        </td>

                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <Layout>
            <h3 id="tableLabel">Users</h3>
            <Link to="/Admin/Users/Create">Add</Link>
            {contents}
        </Layout>
    );

    async function GetData() {
        axios.get(import.meta.env.VITE_SERVER_URL+"api/Users")
            .then(response => {
                SetUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}

export default Users;