import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { UpdateFormData } from "./UpdateFormData.tsx";
import Menu from "../../components/Menu.tsx";
import { user } from "../../components/leagueObject.tsx";

function Membership() {
    const [membership, setmembership] = useState<UpdateFormData[]>();
      const allowed: boolean = (user().role == "SiteAdmin" || user().role == "Admin") ? false : true;

    useEffect(() => {
        GetData();
    });

    const contents = membership === undefined
        ? <p><em>Loading ...</em></p>
     
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Short Name</th>
                    <th>Nick Name</th>
                    <th>Wheelchair</th>
                    <td hidden={allowed}></td>
                </tr>
            </thead>
            <tbody>
                {membership.map(item =>
                    <tr key={item.id}>
                        <td>{item.fullName}</td>
                        <td>{item.shortname}</td>
                        <td>{item.nickName}</td>
                        <td>{item.wheelchair ? "yes" : "no"}</td>
                        <td hidden={allowed}><Link to="/Membership/Update" state={ item.id.toString() }>Update</Link>|  
                            <Link to="/Membership/Delete" state={ item.id.toString() }>Delete</Link>
                        </td>
                        
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
        <Menu/>
            <h3 id="tableLabel">Membership</h3>
            <Link to="/Membership/Create" hidden={ allowed}>Add</Link>
            {contents}
        </div>
    );

    async function GetData() {
        axios.get(import.meta.env.VITE_SERVER_URL+"api/memberships")
            .then(response => {
                setmembership(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}

export default Membership;