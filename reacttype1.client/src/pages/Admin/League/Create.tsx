import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormData, FormDataSchema } from "./FormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput } from "flowbite-react";
import SubmitButton from '@components/Buttons.tsx';
import Layout from "@layouts/Layout.tsx";
import createData from '@components/CreateData.tsx';
import { useState } from 'react';

const LeagueCreate = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema),
    });

    const [errorMsg, setErrorMsg] = useState<string>('');
    const onSubmit: SubmitHandler<FormData> = (data) => create(data)
    const navigate = useNavigate();


    return (
        <Layout>

            <h3>Add new league</h3>
            <form onSubmit={handleSubmit(onSubmit)} >
                <input type="hidden" {...register('startWeek')} defaultValue="1" />
                <table>
                    <tr>
                        <td className="Label">League Name:</td>

                        <td className="Field"><TextInput {...register('leagueName')} style={{ width: '85%' }} />
                        </td>
                    </tr>
                    
                    <tr>
                        <td className="Label">Active:</td>

                        <td className="Field">
                            <Checkbox {...register('active')} />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Team Size:</td>

                        <td className="Field"><TextInput type="number" {...register('teamSize')}  />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Ties Allowed:</td>

                        <td className="Field">
                            <Checkbox {...register('tiesAllowed')} />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Points Count:</td>

                        <td className="Field">
                            <Checkbox {...register('pointsCount')} />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Points for a Win:</td>

                        <td className="Field"><TextInput {...register('winPoints')}  />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Points for a Tie:</td>

                        <td className="Field"><TextInput {...register('tiePoints')}  />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Points for a Bye:</td>

                        <td className="Field"><TextInput {...register('byePoints')}  />
                        </td>
                    </tr>

                    {/*<tr>*/}
                    {/*    <td className="Label">Start Week:</td>*/}

                    {/*    <td className="Field"><TextInput {...register('startWeek')}  />*/}
                    {/*    </td>*/}
                    {/*</tr>*/}

                    <tr>
                        <td className="Label">Points are limited:</td>

                        <td className="Field">
                            <Checkbox {...register('pointsLimit')} />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label"># of Divisions:</td>

                        <td className="Field"><TextInput {...register('divisions')} />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Playoffs:</td>

                        <td className="Field">
                            <Checkbox {...register('playOffs')} />
                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td>
                            <SubmitButton/>
                        </td>
                        
                    </tr>
                   

                    <tr>
                        <td colSpan={2}>
                        {errors.leagueName && <p className="errorMessage">{errors.leagueName.message}</p>}
                        {errors.teamSize && <p className="errorMessage">{errors.teamSize.message}</p>}
                        {errors.winPoints && <p className="errorMessage">{errors.winPoints.message}</p>}
                        {errors.tiePoints && <p className="errorMessage">{errors.tiePoints.message}</p>}
                        {errors.byePoints && <p className="errorMessage">{errors.byePoints.message}</p>}
                        {errors.startWeek && <p className="errorMessage">{errors.startWeek.message}</p>}
                        {errors.divisions && <p className="errorMessage">{errors.divisions.message}</p>}
                        <p className="errorMessage">{errorMsg}</p>
                        </td>
                    </tr>


                </table>
            </form>
            

        </Layout>
    );

    async function create(data: FormData) {
        try {
            await createData(data, `/api/leagues`);
            navigate("/Admin/Leagues")
        }
        catch (error) {
            setErrorMsg(`${error}`);
        }
    }



}



export default LeagueCreate;