import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { UpdateFormData } from "./UpdateFormData.tsx";
import LeagueClass from '@components/LeagueClass.tsx';;
import { DeleteButton } from '@components/Buttons.tsx';
import Layout from '@layouts/Layout.tsx';
import convertDate from '@components/convertDate.tsx';
import deleteData from '@components/deleteData.tsx';



const ScheduleDelete = () => {
    const league = new LeagueClass();
    const location = useLocation();
    const id: number = location.state;
    const data: UpdateFormData[] = JSON.parse(localStorage.getItem("schedule") as string);
    const schedule = data.find(x => x.id == id);
    const [errorMsg, SeterrorMsg] = useState("");
    
    const navigate = useNavigate();

    

          
    if (schedule) {
        return (
            <Layout>
                <h3>Delete game date in league {league.leagueName}</h3>

                <table>
                    <tr>
                        <td className="Label">Game Date:</td>

                        <td className="Field">{convertDate(schedule.gameDate)}</td>
                    </tr>
                    <tr>
                        <td className="Label">playOffs:</td>
                        <td className="Field">{schedule.playOffs ? "Yes" : "No"}</td>

                    </tr>
                    <tr>
                        <td className="Label">Cancelled:</td>
                        <td className="Field">{schedule.cancelled ? "Yes" : "No"}</td>
                    </tr>

                    <tr>
                        <td colSpan={2} style={{ textAlign: "center" }}>
                            <DeleteButton DeleteItem={deleteItem} />
                        </td>
                    </tr>
                </table>
                <p className="errorMessage">{errorMsg}</p>
            </Layout>
        );
    }


    

    
    async function deleteItem() {

        try {
            await deleteData(`${import.meta.env.VITE_SERVER_URL}api/Schedules/${id}`);
            navigate("/League/Schedule");
        }
        catch (error) {
            SeterrorMsg(`${error}`);
        }
    }
}


export default ScheduleDelete;