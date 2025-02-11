import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { UpdateFormData } from "./UpdateFormData.tsx";
import { user, league } from "../../../components/leagueObject.tsx";;
import Menu from "../../../components/Menu.tsx";

function Players() {
    const [player, setplayer] = useState<UpdateFormData[]>();
    const permission: string = user().role;
    const allowed: boolean = (permission == "SiteAdmin" || permission == "Admin") ? false : true;


    useEffect(() => {
        GetData();
    });

    const contents = player === undefined
        ? <p><em>Loading ...</em></p>

        : <table className="table table-sm table-striped"  >
            <thead>
                <tr style={{textAlign: 'left'} }>
                    <th>Name</th>
                    <td hidden={allowed}></td>
                </tr>
            </thead>
            <tbody>
                {player.map(item =>
                    <tr key={item.id} style={{ textAlign: 'left' }}>
                        <td>{item.fullName}</td>
                       
                        <td hidden={allowed}><Link to="/league/players/Delete" state={item.id.toString()}>Delete</Link>
                        </td>

                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
        <Menu/>
            <h3>Players in league {league().leagueName}</h3>
            <Link to="/League/Players/Create" hidden={allowed}>Add</Link>
            {contents}
            <p>Number of players: {player?.length}</p>
        </div>
    );

    async function GetData() {
       

        const url: string = import.meta.env.VITE_SERVER_URL+"api/players/".concat(league().id.toString());
        axios.get(url)
            .then(response => {
                setplayer(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}

export default Players;