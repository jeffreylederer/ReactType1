import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput } from "flowbite-react";
import { Button } from "flowbite-react";
import Menu from "../../../components/Menu.tsx";




const LeagueUpdate = () => {

    const [league, setLeague] = useState(
        {
            id: 0,
            leagueName: '',
            active: false,
            teamSize: 0,
            tiesAllowed: false,
            pointsCount: false,
            winPoints: 0,
            tiePoints: 0,
            byePoints: 0,
            startWeek: 0,
            pointsLimit: false,
            divisions: 0,
            playOffs: false
           
        }
    );
    const location = useLocation();
    const id: number = location.state;

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),

    });

    const onSubmit: SubmitHandler<UpdateFormData> = (data) => updateData(data)

    const navigate = useNavigate();

    useEffect(() => {
        GetData();
    });

    const contents = league.id === 0
        ? <p><em>Loading ...</em></p> :

        <form onSubmit={handleSubmit(onSubmit)} >

        <table>

                <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={league.id} />
            <tr>
                <td className="Label">League Name:</td>

                    <td className="Field"><TextInput {...register('leagueName')}  defaultValue={league.leagueName} />
                </td>
            </tr>

            <tr>
              <td className="Label">Active:</td>

                <td  className="Field">
                        <Checkbox {...register('active')} defaultChecked={league.active} />
                </td>
            </tr>

            <tr>
                <td className="Label">Team Size:</td>

                    <td className="Field"><TextInput type="number" {...register('teamSize')}  defaultValue={league.teamSize} />
                </td>
            </tr>

            <tr>
                    <td className="Label">Ties Allowed:</td>

                <td  className="Field">
                        <Checkbox {...register('tiesAllowed')} defaultChecked={league.tiesAllowed} />
                </td>
            </tr>

            <tr>
                <td className="Label">Points Count:</td>

                    <td className="Field">
                        <Checkbox {...register('pointsCount')} defaultChecked={league.pointsCount} />
                </td>
            </tr>

            <tr>
                <td className="Label">Points for a Win:</td>

                    <td className="Field"><TextInput {...register('winPoints')}  defaultValue={league.winPoints} />
                </td>
            </tr>

            <tr>
                <td className="Label">Points for a Tie:</td>

                    <td className="Field"><TextInput {...register('tiePoints')}  defaultValue={league.tiePoints} />
                </td>
            </tr>

            <tr>
                <td className="Label">Points for a Bye:</td>

                    <td className="Field"><TextInput {...register('byePoints')}  defaultValue={league.byePoints} />
                </td>
            </tr>

            <tr>
                <td className="Label">Start Week:</td>

                    <td className="Field"><TextInput {...register('startWeek')}  defaultValue={league.startWeek} />
                </td>
            </tr>

            <tr>
                    <td className="Label">Points are limited:</td>

                <td  className="Field">
                        <Checkbox {...register('pointsLimit')} defaultChecked={league.pointsLimit} />
                </td>
            </tr>

            <tr>
                <td className="Label"># of Divisions:</td>

                    <td className="Field"><TextInput {...register('divisions')}  defaultValue={league.divisions} />
                </td>
            </tr>

            <tr>
                    <td className="Label">Playoffs:</td>

                <td  className="Field">
                        <Checkbox {...register('playOffs')} defaultChecked={league.playOffs} />
                </td>
            </tr>

            <tr>
                    <td colSpan={2} >
                        <div className="flex flex-wrap gap-2" >
                            <Button outline color="Default" type="submit" >Submit</Button>
                            <Button outline color="Default" onClick={() => navigate("/Admin/Leagues")}>Go back to list</Button>
                        </div>
                </td>
            </tr>


                <tr><td colSpan={1}>
            {errors.leagueName && <p className="errorMessage">{errors.leagueName.message}</p>}
            {errors.teamSize && <p className="errorMessage">{errors.teamSize.message}</p>}
            {errors.winPoints && <p className="errorMessage">{errors.winPoints.message}</p>}
            {errors.tiePoints && <p className="errorMessage">{errors.tiePoints.message}</p>}
            {errors.byePoints && <p className="errorMessage">{errors.byePoints.message}</p>}
            {errors.startWeek && <p className="errorMessage">{errors.startWeek.message}</p>}
            {errors.divisions && <p className="errorMessage">{errors.divisions.message}</p>}
                </td></tr>


            </table>
        </form>

    return (
        <>
        <Menu/>
            <h3>Update record for league {league.leagueName}</h3>
            {contents}


        </>
    );


    async function GetData() {
        const url: string = import.meta.env.VITE_SERVER_URL+'api/Leagues/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {

                setLeague(response.data);


                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    function updateData(data: UpdateFormData) {
        const url: string = import.meta.env.VITE_SERVER_URL+'api/Leagues/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        data.id = id;
        axios.put(fullUrl, data)
            .then(response => {
                console.log('Record updated successfully: ', response.data);
                navigate("/Admin/Leagues");
            })
            .catch(error => {
                console.error('Error updating record: ', error);
            });


    }
}



export default LeagueUpdate;