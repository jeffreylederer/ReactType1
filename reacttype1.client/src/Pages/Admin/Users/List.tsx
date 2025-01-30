import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { DetailsType } from "./DetailsType.tsx";
import Menu from "../../../components/Menu.tsx";


function Users() {
    const [Users, setUsers] = useState<DetailsType[]>();


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
                            <Link to="/Admin/Users/Delete" state={item.id.toString()}>Delete</Link>
                        </td>

                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
        <Menu/>
            <h3 id="tableLabel">Users</h3>
            <Link to="/Admin/Users/Create">Add</Link>
            {contents}
        </div>
    );

    async function GetData() {
        axios.get(import.meta.env.VITE_SERVER_URL+"api/Users")
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}

export default Users;