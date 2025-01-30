import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import { FormData } from "./FormData.tsx";
import {DeleteButton} from '../../../components/Buttons.tsx';
import Menu from "../../../components/Menu.tsx";



const LeagueDelete = () => {
    const location = useLocation();
    const id: number = location.state;
    const [errorMsg, SeterrorMsg] = useState("");

    const [league, setleague] = useState<FormData>();


    const navigate = useNavigate();

    useEffect(() => {
        GetData();
    });

    const contents = league === undefined
        ? <p><em>Loading ...</em></p> :

        <table>
            
            <tr>
                <td className="Label">Active:</td>
                <td className="Field">{league.active ? "Yes" : "No"}</td>

            </tr>
            <tr>
                <td className="Label">Team Size:</td>
                <td className="Field">{league.teamSize}</td>
            </tr>
            <tr>
                <td className="Label">Ties Allowed:</td>
                <td className="Field">{league.tiesAllowed ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td className="Label">Points Count:</td>
                <td className="Field">{league.pointsCount ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td className="Label">Points for a Win:</td>
                <td className="Field">{league.winPoints}</td>
            </tr>
            <tr>
                <td className="Label">Points for a Tie:</td>
                <td className="Field">{league.tiePoints}</td>
            </tr>
            <tr>
                <td className="Label">Points for a Bye:</td>
                <td className="Field">{league.byePoints}</td>
            </tr>
            <tr>
                <td className="Label">Start Week:</td>
                <td className="Field">{league.startWeek}</td>
            </tr>
            <tr>
                <td className="Label">Points Limit:</td>
                <td className="Field">{league.pointsLimit ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td className="Label">Divisions:</td>
                <td className="Field">{league.divisions}</td>
            </tr>
            <tr>
                <td className="Label">Playoffs:</td>
                <td className="Field">{league.playOffs ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td colSpan={2} >
               
                    <DeleteButton DeleteItem={DeleteItem}/>
                </td>
            </tr>
        </table>

    return (
        <div>
        <Menu/>
            <h3>Delete league {league?.leagueName}</h3>
            {contents}
            <p className="errorMessage">{errorMsg}</p>
        </div>
    );

    async function GetData() {
        const url: string = import.meta.env.VITE_SERVER_URL+'api/leagues/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {
                setleague(response.data);
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    async function DeleteItem() {
        const url: string = import.meta.env.VITE_SERVER_URL+'api/leagues/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.delete(fullUrl)
            .then(response => {
                console.log(response.statusText);
                navigate("/Admin/leagues");
            })
            .catch(error => {
                SeterrorMsg(error.response.data);
            })
    }
}


export default LeagueDelete;