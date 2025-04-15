import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput } from "flowbite-react";
import { League } from "@components/leagueObject.tsx";;
import SubmitButton from '@components/Buttons.tsx';
import Layout from '@layouts/Layout.tsx';
import convertDate from '@components/convertDate.tsx';


const ScheduleUpdate = () => {
    const [schedule, setSchedule] = useState <UpdateFormData>();
    const location = useLocation();
    const id: number = location.state;
    const count: string = location.search.substring(9);

    const matches: number = Number(count);
   
    const {
        register,
        handleSubmit,
        //formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),
    });

    const onSubmit: SubmitHandler<UpdateFormData> = (data) =>updateData(data)

    const navigate = useNavigate();

    useEffect(() => {
        GetData();
    },[]);
    

    const contents = schedule === undefined
        ? <p><em>Loading ...</em></p> :

        <form onSubmit={handleSubmit(onSubmit)} >



            <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={schedule.id} />
            <input type="hidden" {...register("leagueid", { valueAsNumber: true })} defaultValue={schedule.leagueid} />
           
            <table>
                <tr hidden={matches > 0} >
                    <td className="Label">Game Date:</td>

                    <td className="Field">
                        <TextInput type="date" {...register('gameDate')} defaultValue={today()}/>
                    </td>
                </tr>

                <tr hidden={matches == 0}>
                    <td className="Label">Game Date:</td>

                    <td className="Field">
                        {convertDate(schedule.gameDate)}
                    </td>
                </tr>

                <tr hidden={matches > 0} >
                    <td className="Label">Playoffs:</td>

                    <td className="Field">
                        <Checkbox {...register('playOffs')} defaultChecked={schedule.playOffs} />
                    </td>
                </tr>

                <tr hidden={matches == 0} >
                    <td className="Label">Playoffs:</td>

                    <td className="Field">
                        {schedule.playOffs?"Yes":"No"}
                    </td>
                </tr>

                <tr>
                    <td className="Label">Cancelled:</td>

                    <td className="Field">
                        <Checkbox {...register('cancelled')} defaultChecked={schedule.cancelled} />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} >
                        <SubmitButton/>
                    </td>
                </tr>

            </table>
            {
                matches > 0 && <input type="hidden" defaultValue={schedule.gameDate} {...register('gameDate')} />
            }
            {
                matches > 0 && <input type="hidden" defaultValue={schedule.playOffs} {...register('playOffs')} />
            }
            
        </form>
    
    return (
        <Layout>
            <h3>Update schedule for league {League().leagueName}</h3>
            {contents}

            
        </Layout>
    );


    function GetData() {
   
        const data: UpdateFormData[] = JSON.parse(localStorage.getItem("schedule") as string);
        setSchedule( data.find(x => x.id == id));
    }

    function updateData(data: UpdateFormData) {
        if (schedule != undefined) {
            
           if(matches > 0)
                data.gameDate=schedule.gameDate;

            const url = `${import.meta.env.VITE_SERVER_URL}api/Schedules/${id}`;
            axios.put(url, data)
                .then(response => {
                    console.log('Record updated successfully: ', response.data);
                    navigate("/League/Schedule");
                })
                .catch(error => {
                    console.error('Error updating record: ', error);
                });
        }

    }

    function today(): string {
       
        const date : Date = new Date(schedule? schedule.gameDate : new Date().toLocaleDateString());
        return `${date.getFullYear()}-${date.getMonth() + 1}}-$(date.getDate()}`;
    }
}



export default ScheduleUpdate;