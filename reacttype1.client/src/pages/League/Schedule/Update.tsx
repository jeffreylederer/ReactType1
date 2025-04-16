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



const ScheduleUpdate = () => {
    const [schedule, setSchedule] = useState <UpdateFormData>();
    const location = useLocation();
    const id: number = location.state;
    const count: string = location.search.substring(9);

    const matches: number = Number(count);

    const zeroPad = (num: number): string => {
        const x: string = num.toString();
        if (x.length == 2)
            return x;
        return '0' + x;
    }
   
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),
    });

    const onSubmit: SubmitHandler<UpdateFormData> = async (data) =>updateData(data)

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
                        <TextInput type="date" {...register('gameDate', { valueAsDate :false })} defaultValue={today()} />
                    </td>
                </tr>

                <tr hidden={matches == 0}>
                    <td className="Label">Game Date:</td>

                    <td className="Field">
                        <input readOnly type="date" defaultValue={today()} {...register('gameDate')} />
                        
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
                        <Checkbox {...register('playOffs')} defaultChecked={schedule.playOffs} disabled/>
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
                <td colSpan={2}>
                    {errors.leagueid && <p className="errorMessage">{errors.leagueid.message}</p>}
                    {errors.gameDate && <p className="errorMessage">{errors.gameDate.message}</p>}
                    {errors.cancelled && <p className="errorMessage">cancelled: {errors.cancelled.message}</p>}
                    {errors.playOffs && <p className="errorMessage">playoffs: {errors.playOffs.message}</p>}
                </td>

            </table>
            
            
            
        </form>
    
    return (
        <Layout>
            <h3>Update schedule for league {League().leagueName}</h3>
            {contents}

            
        </Layout>
    );


    function GetData() {
   
        const schedules: UpdateFormData[] = JSON.parse(localStorage.getItem("schedule") as string);
        const results = schedules.find(x => x.id == id);
        setSchedule(results)
    }

    async function updateData(data: UpdateFormData) {
        if (schedule != undefined) {
            
            const url = `${import.meta.env.VITE_SERVER_URL}api/Schedules/${id}`;
            await axios.put(url, data)
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
        if (schedule === undefined)
            return new Date().toLocaleDateString();

        const date = new Date(schedule.gameDate);
        return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`;
    }

    
}



export default ScheduleUpdate;