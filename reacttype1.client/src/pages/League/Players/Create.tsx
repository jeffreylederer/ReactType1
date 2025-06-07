import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { PlayerFormData, PlayerFormDataSchema } from "./FormData.tsx";
import { UpdateFormData } from "../../Membership/UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import LeagueClass from '@components/LeagueClass.tsx';
import SubmitButton from '@components/Buttons.tsx';
import Layout from '@layouts/Layout.tsx';
import createData from '@components/CreateData.tsx';
import useFetch from '@hooks/useFetch.tsx';


const PlayersCreate = () => {
   
    const [errorMsg, setErrorMsg] = useState<string>('');
    const onSubmit: SubmitHandler<PlayerFormData> = (data) => create(data)
    const navigate = useNavigate();

    const league = new LeagueClass();
    const {
        register,
        handleSubmit,
        
    } = useForm<PlayerFormData>({
        resolver: zodResolver(PlayerFormDataSchema),
    });

    const { data, isLoading, error } = useFetch<UpdateFormData[]>(`${import.meta.env.VITE_SERVER_URL}api/players/getMembers/${league.id}`);

    if (error)
        return (
            <Layout>
               
                {error}
            </Layout>
        );

    if (isLoading)
        return (
            <Layout>
               
                <p>Loading...</p>
            </Layout>
        );
    

    return (
        <Layout>
            <h3>Create new player in league {league.leagueName} </h3>
            <form onSubmit={handleSubmit(onSubmit)} >
                <table>
                    <input type="hidden" {...register("leagueid")} defaultValue={league.id }/>
                    <tr>
                        <td className="Label">Members:</td>

                        <td className="Field">
                            <select defaultValue="0" {...register("membershipId")}>
                                <option value="0" key="0">Select member</option>
                                {data?.map((item) => (
                                    <option value={item.id.toString()} key={item.id}>{item.fullName}</option>
                                ))}
                                )
                            </select>
                        </td>
                    </tr>
                
                
                    <tr>
                        <td colSpan={2}  style={{ textAlign: "center" }}>
                          <SubmitButton/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            
                            <p className="errorMessage">{errorMsg}</p>
                        </td>
                        
                    </tr>
                    
                    

                </table>
            </form>
            
        </Layout>
    );

    async function create(data: PlayerFormData) {
        try {
            await createData<PlayerFormData>(data, `${import.meta.env.VITE_SERVER_URL}api/players`);
            navigate("/League/Players");
        }
        catch (error) {
            setErrorMsg(`${error}`);
        }
    }
    

}



export default PlayersCreate;