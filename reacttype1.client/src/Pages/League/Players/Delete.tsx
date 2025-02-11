import { useLocation, useNavigate, } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import { UpdateFormData } from "./UpdateFormData.tsx";
import { league } from "../../../components/leagueObject.tsx";;
import { DeleteButton } from '../../../components/Buttons.tsx';
import Menu from "../../../components/Menu.tsx";


const PlayersDelete = () => {
    const location = useLocation();
    const id: number = location.state;
    const [errorMsg, SeterrorMsg] = useState("");
    const [players, setPlayers] = useState<UpdateFormData>();

    
    const navigate = useNavigate();

    useEffect(() => {
        GetData();
    });

    const contents = players === undefined
        ? <p><em>Loading ...</em></p> :

        <table>
            <tr>
                <td className="Label">Name:</td>

                <td className="Field">{players.fullName}</td>
            </tr>
            <tr>
                <td colSpan={2} >
                    <DeleteButton DeleteItem={DeleteItem }/>
                </td>
            </tr>
        </table>;
        
    return (
        <div>
        <Menu/>
            <h2>Delete player from league {league().leagueName} </h2>
            {contents}
            <p className="errorMessage">{errorMsg}</p>
           
        </div>
    );

    async function GetData() {
        const url: string = import.meta.env.VITE_SERVER_URL+'api/Players/getOne/'.concat(id.toString());
        axios.get(url)
            .then(response => {
                setPlayers(response.data);
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                SeterrorMsg("Player record could not be found: ".concat(error.response.data));
            });

    }

    async function DeleteItem() {
        const url: string = import.meta.env.VITE_SERVER_URL+'api/Players/'.concat(id.toString());
        axios.delete(url)
            .then(response => {
                console.log(response.statusText);
                navigate("/League/Players");
            })
            .catch(error => {
                
                SeterrorMsg(error.response.data);
            })
    }
}


export default PlayersDelete;