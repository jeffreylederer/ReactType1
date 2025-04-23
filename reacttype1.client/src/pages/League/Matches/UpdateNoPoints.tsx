import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdateFormDataNoPoints, UpdateFormDataSchemaNoPoints, UpdateFormData } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox } from "flowbite-react";
import MatchFormData from "./MatchFormData.tsx";
import { ReturnButton } from '@components/Buttons.tsx';
import Layout from '@layouts/Layout.tsx';
import convertDate from '@components/convertDate.tsx';
import { useEffect } from 'react';
import { League } from '@components/leagueObject.tsx';




const MatchUpdateNoPoints = () => {

    const location = useLocation();
    const id: number = location.state;
    const [match, setMatch] = useState<MatchFormData>();
    const [error, setError] = useState<string>('');


    useEffect(() => {
        const data: MatchFormData[] = JSON.parse(localStorage.getItem("matches") as string);
        setMatch(data.find(x => x.id == id));
    }, []);

    const {
        register,
        handleSubmit,
        //formState: { errors },

    } = useForm<UpdateFormDataNoPoints>({
        resolver: zodResolver(UpdateFormDataSchemaNoPoints),

    });



    const onSubmit: SubmitHandler<UpdateFormDataNoPoints> = (data) => updateData(data)

    const navigate = useNavigate();


    if (match) {
        return (
            <Layout>
                <h3>Enter wins/loses for match </h3>
                <span hidden={!League().tiesAllowed}>To mark a game as a tie, just select a win for both teams. When calculating the standings,
                    this match is treated as a tie game. </span>
                <span hidden={League().tiesAllowed}>There can only be one winner per game. </span>
                <span>If one team forfeits, the other team wins. If both teams forfeit, neither team wins.</span><br /><br />
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
                            <td className="Label">Team 1 Win</td>

                            <td className="Field">
                                <Checkbox {...register('team1Win')} defaultChecked={match.team1Win} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Team 2 Win</td>

                            <td className="Field">
                                <Checkbox {...register('team2Win')} defaultChecked={match.team2Win} />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2} >
                                <p className="errorMessage">{error}</p>
                            </td>
                        </tr>

                        <tr>

                            <td colSpan={2} >
                                <ReturnButton Back={Goback} />
                            </td>
                        </tr>





                    </table>
                </form>
            </Layout>
        );
    }
    else
        return (
            <p>Loading...</p>
        );


    function updateData(data: UpdateFormDataNoPoints) {
        const url: string = import.meta.env.VITE_SERVER_URL + 'api/Matches/'.concat(id.toString());
        if (!League().tiesAllowed && data.team1Win && data.team2Win) {
            setError("Both teams cannot win");
            return;
        }
        const newData: UpdateFormData = { id: data.id, team1Score: 0, team2Score: 0, forfeit: 0, team1Win: data.team1Win ? 1 : 0, team2Win: data.team2Win ? 1 : 0 };
              
        axios.put(url, newData)
            .then(response => {
                console.log('Record updated successfully: ', response.data);
                const url: string = match ? `/League/Matches?id=${match.weekId}` : "/League/Matches";
                navigate(url);
            })
            .catch(error => {
                setError('Error updating record: ' + error);
            });
    }

    function Goback() {
        const url: string = match ? `/League/Matches?id=${match.weekId}` : "League/Matches";
        navigate(url);
    }



}



export default MatchUpdateNoPoints;