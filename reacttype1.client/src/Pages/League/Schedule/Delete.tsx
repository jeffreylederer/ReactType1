import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import { FormData } from "./FormData.tsx";
import { League } from "@components/leagueObject.tsx";;
import { DeleteButton } from '@components/Buttons.tsx';
import Layout from '@layouts/Layout.tsx';


const ScheduleDelete = () => {
    const location = useLocation();
    const id: number = location.state;
    const [schedule, setSchedule] = useState<FormData>();
    const [errorMsg, SeterrorMsg] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        GetData();
    });

    const contents = schedule === undefined
        ? <p><em>Loading ...</em></p> :
        
        <table>
            <tr>
                <td className="Label">Game Date:</td>

                <td className="Field">{schedule.gameDate}</td>
            </tr>
            <tr>
                <td className="Label">playOffs:</td>
                <td className="Field">{schedule.playOffs? "Yes": "No"}</td>
              
            </tr>
            <tr>
                <td className="Label">Cancelled:</td>
                <td className="Field">{schedule.cancelled ? "Yes" : "No"}</td>
              </tr>
            
            <tr>
                <td colSpan={2} style={{ textAlign: "center"}}>
                    <DeleteButton DeleteItem={DeleteItem } />
                </td>
            </tr>
        </table>
        
    return (
        <Layout>
            <h3>Delete game date in league {League().leagueName}</h3>
            {contents}
            <p className="errorMessage">{errorMsg}</p>
        </Layout>
    );

    async function GetData() {
        const url: string = import.meta.env.VITE_SERVER_URL+'api/Schedules/getOne/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {
                setSchedule(response.data);
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                SeterrorMsg('Error aquiring record: '.concat(error.response.data));
            });

    }

    async function DeleteItem() {
        const url: string = import.meta.env.VITE_SERVER_URL+'api/Schedules/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.delete(fullUrl)
            .then(response => {
                console.log(response.statusText);
                navigate("/League/Schedule");
            })
            .catch(error => {
                SeterrorMsg(error.response.data);
            })
    }
}


export default ScheduleDelete;