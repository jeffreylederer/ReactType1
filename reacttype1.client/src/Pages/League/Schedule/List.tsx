import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { UpdateFormData } from "./UpdateFormData.tsx";
import { league, user} from "../../../components/leagueObject.tsx";;
import Menu from "../../../components/Menu.tsx";


function Schedule() {
    const [schedule, setschedule] = useState<UpdateFormData[]>();
    
    const permission: string = user().role;
    const allowed: boolean = (permission == "SiteAdmin" || permission == "Admin") ? false : true;

    useEffect(() => {
        GetData();
    });

    const contents = schedule === undefined
        ? <p><em>Loading ...</em></p>
     
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Game Date</th>
                    <th>Cancelled</th>
                    <th>Playoffs</th>
                    <td hidden={allowed}></td>
                </tr>
            </thead>
            <tbody>
                {schedule.map(item =>
                    <tr key={item.id}>
                        <td>{item.gameDate}</td>
                        <td>{item.cancelled ? "yes" : "no"}</td>
                        <td>{item.playOffs ? "yes" : "no"}</td>
                        <td hidden={allowed}><Link to="/League/Schedule/Update" state={ item.id.toString() }>Update</Link>|  
                            <Link to="/League/Schedule/Delete" state={ item.id.toString() }>Delete</Link>
                        </td>
                        
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
        <Menu/>
            <h3 id="tableLabel">Schedule for League {league().leagueName}</h3>
            <Link to="/League/Schedule/Create" hidden={allowed}>Add</Link>
            {contents}
        </div>
    );

    async function GetData() {
        const url: string = import.meta.env.VITE_SERVER_URL+"api/Schedules/".concat(league().id.toString());
        axios.get(url)
            .then(response => {
                setschedule(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}

export default Schedule;