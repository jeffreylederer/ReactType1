import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { FormData, FormDataSchema } from "./FormData.tsx";
import { Membership } from "./Membership.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { league } from "../../../components/leagueObject.tsx";;
import SubmitButton from '../../../components/Buttons.tsx';
import Menu from "../../../components/Menu.tsx";


const TeamsCreate = () => {
   
    
    const onSubmit: SubmitHandler<FormData> = (data) => CreateData(data)
    const [errorMsg, SeterrorMsg] = useState("");


    const navigate = useNavigate();
    const [membership, setMembership] = useState<Membership[]>();

    function CreateData(data: FormData) {
        switch (league().teamSize) {
            case 1:
                break;
            case 2:
                if (data.skip != 0 && data.lead != 0 && data.skip == data.lead) {
                    SeterrorMsg("Skip and Lead have to be  different members");
                    return;
                }
                break;
            case 3:
                if (data.skip != 0 && data.lead != 0 && data.skip == data.lead) {
                    SeterrorMsg("Skip and Lead have to be  different members");
                    return;
                }
                if (data.skip != 0 && data.viceSkip != 0 && data.skip == data.viceSkip) {
                    SeterrorMsg("Skip and Vice Skip have to be  different members");
                    return;
                }
                if (data.viceSkip != 0 && data.lead != 0 && data.viceSkip == data.lead) {
                    SeterrorMsg("Vice Skip and Lead have to be  different members");
                    return;
                }
                break;
        }
        SeterrorMsg("");
        axios.post(import.meta.env.VITE_SERVER_URL+'api/Teams/', data)
            .then((response) => {
                console.log(response.data);
                navigate("/League/Teams");
                console.log('Record created successfully: ', response.data);
             })
            .catch(error => {
                console.log('Error creating record: ', error);
            });
    }

    async function GetData() {
        const url: string = import.meta.env.VITE_SERVER_URL+"api/Teams/NotOnTeam/".concat(league().id.toString());
        axios.get(url)
            .then(response => {
                setMembership(response.data);
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
    } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema),
    });

    return (
        <>
        <Menu/>
            <h3>Create new Team in league {league().leagueName} </h3>
            <form onSubmit={handleSubmit(onSubmit)} >
                <table>
                    <input type="hidden" {...register("leagueid")} defaultValue={league().id} />
                    <input type="hidden" {...register("teamNo")} defaultValue={"1"} />
                    <input type="hidden" {...register("id")} defaultValue={"0"} />
                    <tr>
                        <td className="Label">Skip:</td>
                        <td>
                            <select style={{ width: '85%' }} defaultValue="0" {...register("skip")}>
                                <option value="0">Select member</option>
                                {membership?.map((item) => (
                                    <option value={item.id.toString()}>{item.fullName}</option>
                                ))}
                                )
                            </select></td>
                    </tr>

                    <tr hidden={league().teamSize < 3}>
                        <td className="Label">Vice Skip:</td>
                        <td>
                            <select style={{ width: '85%' }} defaultValue="0" {...register("viceSkip")}>
                                <option value="0">Select member</option>
                                {membership?.map((item) => (
                                    <option value={item.id.toString()}>{item.fullName}</option>
                                ))}
                                )
                            </select></td>
                    </tr> 

                    <tr hidden={league().teamSize < 2}>
                        <td className="Label">Lead:</td>
                        <td>
                            <select style={{ width: '85%' }} defaultValue="0" {...register("lead")}>
                                <option value="0">Select Member</option>
                                {membership?.map((item) => (
                                    <option value={item.id.toString()}>{item.fullName}</option>
                                ))}
                                )
                            </select></td>
                    </tr>
                    <tr>
                        <td className="Label">Division:</td>
                        <td>
                            <select style={{ width: '85%' }} defaultValue="0" {...register("divisionId")}>
                                <option value="0">Select Division</option>
                                <option value="1">1</option>
                                <option value="2" hidden={league().divisions <2  }>2</option>
                                <option value="3" hidden={league().divisions <3 }>3</option>
                            </select></td>
                    </tr>
                
                
                    <tr>
                        <td colSpan={2} >
                            <SubmitButton/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={1}>
                    {errors.skip && <p className="errorMessage">skip: {errors.skip.message}</p>}
                    {errors.viceSkip && <p className="errorMessage">viceskip: {errors.viceSkip.message}</p>}
                    {errors.lead && <p className="errorMessage">lead: {errors.lead.message}</p>}
                    {errors.divisionId && <p className="errorMessage">division: {errors.divisionId.message}</p>}
                    
                    {errors.teamNo && <p className="errorMessage">teamNo: {errors.teamNo.message}</p>}
                    {errors.leagueid && <p className="errorMessage">leagueid:  {errors.leagueid.message}</p>}   
                  
                    {
                        league().teamSize < 3 && <input type="hidden" defaultValue="0" {...register("viceSkip")} />
                    }
                    {
                        league().teamSize < 2 && <input type="hidden" defaultValue="0" {...register("lead")} />
                    }
                        </td></tr>
                    

                </table>
            </form>
            <p className="errorMessage">{errorMsg}</p>
        </>
    );


    

}



export default TeamsCreate;