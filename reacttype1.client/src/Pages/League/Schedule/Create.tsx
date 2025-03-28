import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { FormData, FormDataSchema } from "./FormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput } from "flowbite-react";
import { League } from "@components/leagueObject.tsx";;
import SubmitButton from '@components/Buttons.tsx';
import Layout from '@layouts/Layout.tsx';
import useFetch from '@hooks/useFetch.tsx';
import { UpdateFormData } from './UpdateFormData.tsx';
import convertDate from '@components/convertDate.tsx'

const ScheduleCreate = () => {
   const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema),
    });
    const navigate = useNavigate();
   
   

    const { data, loading, error } = useFetch<UpdateFormData>(`${import.meta.env.VITE_SERVER_URL}api/Schedules/${League().id}`);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error)
        return <p>Error: {error}</p>;   
    

        

    const onSubmit: SubmitHandler<FormData> = (data) => CreateData(data)
    function calculation(): string {

        if (data && data.length > 0) {
            const date = new Date(data[data.length - 1].gameDate);
            date.setDate(date.getDate() + 7);
            return convertDate(date.toString());
        }
        return new Date().toLocaleTimeString();
    }  
    

    function CreateData(data: FormData) {
        axios.post(import.meta.env.VITE_SERVER_URL+'api/Schedules', data)
            .then((response) => {
                console.log(response.data);
                navigate("/League/Schedule");
                console.log('Record created successfully: ', response.data);
             })
            .catch(error => {
                console.log('Error creating record: ', error);
            });
    }

    return (
        <Layout>
            <h3>Create new game date for league {League().leagueName}</h3>
            <form onSubmit={handleSubmit(onSubmit)} >
                <table>
                    <input type="hidden" defaultValue={League().id} {...register('leagueid')} />
                    <tr>
                        <td className="Label">Game Date:</td>

                        <td className="Field">
                            <TextInput type="date" {...register('gameDate')} defaultValue={calculation()} />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Playoffs:</td>

                        <td className="Field">
                            <Checkbox {...register('playOffs')} />
                        </td>
                    </tr>
                
                    <tr>
                        <td className="Label">Cancelled:</td>

                        <td className="Field">
                            <Checkbox {...register('cancelled')}  />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            <SubmitButton />
                        </td>
                    </tr>
                    
                    {errors.leagueid && <p className="errorMessage">{errors.leagueid.message}</p>}
                    {errors.gameDate && <p className="errorMessage">{errors.gameDate.message}</p>}
                    {errors.cancelled && <p className="errorMessage">{errors.cancelled.message}</p>}
                    {errors.playOffs && <p className="errorMessage">{errors.playOffs.message}</p>}
                    

                </table>
            </form>
            
        </Layout>
    );


    

}



export default ScheduleCreate;