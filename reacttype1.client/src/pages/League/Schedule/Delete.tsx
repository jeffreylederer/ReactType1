import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import { UpdateFormData } from "./UpdateFormData.tsx";
import LeagueClass from '@components/LeagueClass.tsx';;
import { DeleteButton } from '@components/Buttons.tsx';
import Layout from '@layouts/Layout.tsx';
import convertDate from '@components/convertDate.tsx';



const ScheduleDelete = () => {
    const league = new LeagueClass();
    const location = useLocation();
    const id: number = location.state;
    const [schedule, setSchedule] = useState<UpdateFormData>();
    const [errorMsg, SeterrorMsg] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        GetData();
    },[]);

    const contents = schedule === undefined
        ? <p><em>Loading ...</em></p> :
        
        <table>
            <tr>
                <td className="Label">Game Date:</td>

                <td className="Field">{convertDate(schedule.gameDate)}</td>
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
            <h3>Delete game date in league {league.leagueName}</h3>
            {contents}
            <p className="errorMessage">{errorMsg}</p>
        </Layout>
    );

    function GetData() {

        const data: UpdateFormData[] = JSON.parse(localStorage.getItem("schedule") as string);
        setSchedule(data.find(x => x.id == id));
    }

    async function DeleteItem() {
        const url: string = `${import.meta.env.VITE_SERVER_URL}api/Schedules/${id}`;
        axios.delete(url)
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