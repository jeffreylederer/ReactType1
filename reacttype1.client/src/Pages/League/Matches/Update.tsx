import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from "flowbite-react";
import  MatchFormData  from "./MatchFormData.tsx";
import { ReturnButton } from '@components/Buttons.tsx';
import Layout from '@layouts/Layout.tsx';
import convertDate from '@components/convertDate.tsx';
import { useEffect } from 'react';



const MatchUpdate = () => {

    const location = useLocation();
    const id: number = location.state;
    const [match, setMatch] = useState<MatchFormData>();
    const [hidden, setHidden] = useState<boolean>(false);

    useEffect(() => {
        const data: MatchFormData[] = JSON.parse(localStorage.getItem("matches") as string);
        setMatch(data.find(x => x.id == id));
    },[]);

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),

    });

    const ChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        //event.preventDefault();
        const value = event.target.value;
        if (value == '0') {
            setHidden(false);
        }
        else {
            setHidden(true);
        }

    }

    const onSubmit: SubmitHandler<UpdateFormData> = (data) => updateData(data)

    const navigate = useNavigate();


    if (match) {
        return (
            <Layout>
                <h3>Enter scrore for match </h3>

                <form onSubmit={handleSubmit(onSubmit)} >

                    <table>

                        <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={match.id} />
                        <tr>
                            <td className="Label">Game Date:</td>

                            <td className="Field">{convertDate(match.gameDate)}
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Rink:</td>

                            <td className="Field">
                                {match.rink + 1}
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Team 1:</td>

                            <td className="Field">{match.team1}
                            </td>
                        </tr>
                        <tr>
                            <td className="Label">Team 2:</td>

                            <td className="Field">{match.team2}
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Team 1 Score</td>

                            <td className="Field">
                                <TextInput {...register('team1Score')} defaultValue={match.team1Score} hidden={hidden} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Team 2 Score</td>

                            <td className="Field">
                                <TextInput {...register('team2Score')} defaultValue={match.team2Score} hidden={hidden} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Forfeit</td>

                            <td className="Field">
                                <select  {...register('forfeit')} defaultValue={match.forFeitid} onChange={ChangeSelect}>
                                    <option value="0" >No Forfeit</option>
                                    <option value={match.team1No}>{match.team1No}</option>
                                    <option value={match.team2No}>{match.team2No}</option>
                                </select>
                            </td>
                        </tr>

                        <tr>

                            <td colSpan={2} >
                                <ReturnButton Back={Goback} />
                            </td>
                        </tr>


                        <tr><td colSpan={1}>
                            {errors.team1Score && <p className="errorMessage">skip: {errors.team1Score.message}</p>}
                            {errors.team2Score && <p className="errorMessage">viceskip: {errors.team2Score.message}</p>}
                        </td></tr>


                    </table>
                </form>
            </Layout>
        );
    }
    else
    <p>Loading...</p>
 

    function updateData(data: UpdateFormData) {
        const url: string = import.meta.env.VITE_SERVER_URL+'api/Matches/'.concat(id.toString());
        if (data.forfeit != 0) {
            data.team1Score = 0;
            data.team2Score = 0;
        }
        axios.put(url, data)
            .then(response => {
                console.log('Record updated successfully: ', response.data);
                const url: string = match ? `/League/Matches?id=${match.weekId}` : "/League/Matches";
                navigate(url);
            })
            .catch(error => {
                console.error('Error updating record: ', error);
            });
    }

    function Goback() {
        const url: string = match ? `/League/Matches?id=${match.weekId}` : "League/Matches";
        navigate(url);
    }



}



export default MatchUpdate;