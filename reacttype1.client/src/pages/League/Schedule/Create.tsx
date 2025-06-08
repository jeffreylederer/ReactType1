import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormData, FormDataSchema } from "./FormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput } from "flowbite-react";
import LeagueClass from '@components/LeagueClass.tsx';;
import SubmitButton from '@components/Buttons.tsx';
import Layout from '@layouts/Layout.tsx';
import { UpdateFormData } from "./UpdateFormData.tsx";
import { useState } from 'react';
import createData from '@components/CreateData.tsx';


const ScheduleCreate = () => {
   const {
        register,
        handleSubmit,      
    } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema),
    });
    const navigate = useNavigate();
    const league = new LeagueClass();
 
    const zeroPad = (num: number): string => {
        const x: string = num.toString();
        if (x.length == 2)
            return x;
        return '0' + x;
    }

    function today(): string {
        const data: UpdateFormData[] = JSON.parse(localStorage.getItem("schedule") as string);
        if (data && data.length > 0) {
            const date = new Date(data[data.length - 1].gameDate);
            date.setDate(date.getDate() + 7);
            return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`;
        }
        return new Date().toLocaleDateString();
    }  

    const [errorMsg, setErrorMsg] = useState<string>('');
    const defaultDate: string = today();

    async function create(data: FormData) {
        try {
            await createData(data, `/api/Schedules`);
            navigate("/League/Schedule");
        }
        catch (error) {
            setErrorMsg(`${error}`);
        }
    }

    const onSubmit: SubmitHandler<FormData> = (data) => create(data)
        
    
    

    return (
        <Layout>
            <h3>Create new game date for league {league.leagueName}</h3>
            <form onSubmit={handleSubmit(onSubmit)} >
                <table>
                    <input type="hidden" defaultValue={league.id} {...register('leagueid')} />
                    <tr>
                        <td className="Label">Game Date:</td>

                        <td className="Field">
                            <TextInput type="date" {...register('gameDate')} defaultValue={defaultDate} />
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
                    <td colSpan={2}>
                      
                        <p className="errorMessage">{errorMsg}</p>
                    </td>

                </table>
            </form>
            
        </Layout>
    );

  
}



export default ScheduleCreate;