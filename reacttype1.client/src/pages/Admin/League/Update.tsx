import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput } from "flowbite-react";
import { Button } from "flowbite-react";
import Layout from "@layouts/Layout.tsx";
import useFetch from '@hooks/useFetch.tsx';



const LeagueUpdate = () => {

    
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

    const { data, isLoading, error } = useFetch<UpdateFormData>(`${import.meta.env.VITE_SERVER_URL}/api/leagues/${id}`);

    if (error)
        return (
            <Layout>
                <h3>Update membership record</h3>
                {error}
            </Layout>
        );

    if (isLoading)
        return (
            <Layout>
                <h3>Update membership record</h3>
                <p>Loading...</p>
            </Layout>
        );

       
    if (data) {
        return (
            <Layout>

                <h3>Update record for league {data.leagueName}</h3>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <input type="hidden" {...register('startWeek')} defaultValue="1" />
                    <table>

                        <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={data.id} />
                        <tr>
                            <td className="Label">League Name:</td>

                            <td className="Field"><TextInput {...register('leagueName')} defaultValue={data.leagueName} style={{ width: "400px" }} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Active:</td>

                            <td className="Field">
                                <Checkbox {...register('active')} defaultChecked={data.active} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Team Size:</td>

                            <td className="Field"><TextInput type="number" {...register('teamSize')} defaultValue={data.teamSize} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Ties Allowed:</td>

                            <td className="Field">
                                <Checkbox {...register('tiesAllowed')} defaultChecked={data.tiesAllowed} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Points Count:</td>

                            <td className="Field">
                                <Checkbox {...register('pointsCount')} defaultChecked={data.pointsCount} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Points for a Win:</td>

                            <td className="Field"><TextInput {...register('winPoints')} defaultValue={data.winPoints} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Points for a Tie:</td>

                            <td className="Field"><TextInput {...register('tiePoints')} defaultValue={data.tiePoints} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Points for a Bye:</td>

                            <td className="Field"><TextInput {...register('byePoints')} defaultValue={data.byePoints} />
                            </td>
                        </tr>

                        {/*<tr>*/}
                        {/*    <td className="Label">Start Week:</td>*/}

                        {/*        <td className="Field"><TextInput {...register('startWeek')}  defaultValue=data.startWeek} />*/}
                        {/*    </td>*/}
                        {/*</tr>*/}

                        <tr>
                            <td className="Label">Points are limited:</td>

                            <td className="Field">
                                <Checkbox {...register('pointsLimit')} defaultChecked={data.pointsLimit} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label"># of Divisions:</td>

                            <td className="Field"><TextInput {...register('divisions')} defaultValue={data.divisions} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Playoffs:</td>

                            <td className="Field">
                                <Checkbox {...register('playOffs')} defaultChecked={data.playOffs} />
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


            </Layout>

        );
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