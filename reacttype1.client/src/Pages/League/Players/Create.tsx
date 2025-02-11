import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { PlayerFormData, PlayerFormDataSchema } from "./FormData.tsx";
import { UpdateFormData } from "../../Membership/UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { league } from "../../../components/leagueObject.tsx";
import SubmitButton from '../../../components/Buttons.tsx';
import Menu from "../../../components/Menu.tsx";


const PlayersCreate = () => {
   
    
    const onSubmit: SubmitHandler<PlayerFormData> = (data) => CreateData(data)
    const navigate = useNavigate();
    const [membership, setmembership] = useState<UpdateFormData[]>();

    function CreateData(data: PlayerFormData) {
        axios.post(import.meta.env.VITE_SERVER_URL+'api/Players/', data)
            .then((response) => {
                console.log(response.data);
                navigate("/League/Players");
                console.log('Record created successfully: ', response.data);
             })
            .catch(error => {
                console.log('Error creating record: ', error);
            });
    }

    async function GetData() {
        const url: string = import.meta.env.VITE_SERVER_URL+"api/players/getMembers/".concat(league().id.toString());
        axios.get(url)
            .then(response => {
                setmembership(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

    useEffect(() => {
        GetData();
    });
  
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PlayerFormData>({
        resolver: zodResolver(PlayerFormDataSchema),
    });

    return (
        <>
        <Menu/>
            <h3>Create new player in league {league().leagueName} </h3>
            <form onSubmit={handleSubmit(onSubmit)} >
                <table>
                    <input type="hidden" {...register("leagueid")} defaultValue={league().id }/>
                    <tr>
                        <td className="Label">Members:</td>

                        <td className="Field">
                            <select defaultValue="0" {...register("membershipId")}>
                                <option value="0">Select member</option>
                                {membership?.map((item) => (
                                    <option value={item.id.toString()}>{item.fullName}</option>
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
                            {errors.membershipId && <p className="errorMessage">{errors.membershipId.message}</p>}
                        </td>
                    </tr>
                    
                    

                </table>
            </form>
            
        </>
    );


    

}



export default PlayersCreate;