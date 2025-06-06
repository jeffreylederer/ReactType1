import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import LeagueClass from '@components/LeagueClass.tsx';;
import { Membership } from "./Membership.tsx";
import Layout from '@layouts/Layout.tsx';
import SubmitButton from '@components/Buttons.tsx';
import { TeamType } from './TeamType.ts';



const TeamUpdate = () => {
    const league = new LeagueClass();
    
    const [team, setTeam] = useState<TeamType>();
    const [errorMsg, SeterrorMsg] = useState("");
 
    const [membership, setMembership] = useState<Membership[]>();
    const location = useLocation();
    const id: string = location.state;
    const count: string = location.search.substring(9);

    const matches: number = Number(count);
   
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),
    });

    const onSubmit: SubmitHandler<UpdateFormData> = (data) =>updateData(data)

    const navigate = useNavigate();
   

    useEffect(() => {
        GetData();
        GetMembers();
        
    });

    const contents = team === undefined
        ? <p><em>Loading ...</em></p> :
        <>
            <h3>Update Team {team.teamNo} for league {league.leagueName}</h3>

            <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))} >
                <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={team.id} />
                <input type="hidden" {...register("leagueid", { valueAsNumber: true })} defaultValue={team.leagueid} />
                <input type="hidden" {...register("teamNo", { valueAsNumber: true })} defaultValue={team.teamNo} />


                <table>
                    <tr>
                        <td className="Label">Skip:</td>
                        <td>
                            <select  defaultValue={team.skipid} {...register("skip")}>
                                <option value="0" key="0">Select member</option>
                                <option value={team.skipid} key={team.skipid}>{team.skip}</option>
                                <option value={team.viceSkipid} key={team.viceSkipid == null ? "viceSkip" : team.viceSkipid} hidden={league.divisions > 1}>{team.viceSkip}</option>
                                <option value={team.leadid} key={team.leadid == null ? "lead" : team.leadid} hidden={league.divisions > 2}>{team.lead}</option>
                                {membership?.map((item) => (
                                    <option value={item.id} key={item.id}>{item.fullName}</option>
                                ))}
                                )
                            </select></td>
                    </tr>

                    <tr hidden={league.teamSize < 3}>
                        <td className="Label">Vice Skip:</td>
                        <td>
                            <select  defaultValue={team.viceSkipid} {...register("viceSkip")}>
                                <option value="0" key="0">Select member</option>
                                <option value={team.skipid} key={team.skipid}>{team.skip}</option>
                                <option value={team.viceSkipid} key={team.viceSkipid == null ? "viceSkip" : team.viceSkipid} hidden={league.divisions > 1}>{team.viceSkip}</option>
                                <option value={team.leadid} key={team.leadid == null ? "lead" : team.leadid} hidden={league.divisions > 2}>{team.lead}</option>
                                {membership?.map((item) => (
                                    <option value={item.id} key={item.id}>{item.fullName}</option>
                                ))}
                                )
                            </select></td>
                    </tr>

                    <tr hidden={league.teamSize < 2}>
                        <td className="Label">Lead:</td>
                        <td>
                            <select  {...register("lead")} defaultValue={team.leadid}>
                                <option value="0" key="0">Select member</option>
                                <option value={team.skipid} key={team.skipid}>{team.skip}</option>
                                <option value={team.viceSkipid} key={team.viceSkipid == null ? "viceSkip" : team.viceSkipid} hidden={league.divisions > 1}>{team.viceSkip}</option>
                                <option value={team.leadid} key={team.leadid == null ? "lead" : team.leadid} hidden={league.divisions > 2}>{team.lead}</option>
                                {membership?.map((item) => (
                                    <option value={item.id} key={item.id}>{item.fullName}</option>
                                ))}
                                )
                            </select></td>
                    </tr>
                    <tr hidden={matches>0 } >
                        <td className="Label">Division:</td>
                        <td>
                            <select  defaultValue={team.division} {...register("divisionId")}>
                                <option value="0" key="0">Select Devision</option>
                                <option value="1" key="1">1</option>
                                <option value="2" key="2" hidden={league.divisions < 2}>2</option>
                                <option value="3" key="3" hidden={league.divisions < 3}>3</option>
                            </select></td>
                    </tr>
                    <tr hidden={matches == 0} >
                        <input type="hidden" value={team.division} {...register("divisionId")} />
                    </tr>
                   
                    <tr>
                        <td colSpan={2}>
                            <SubmitButton />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={1}>
                            {errors.skip && <p className="errorMessage">skip: {errors.skip.message}</p>}
                            {errors.viceSkip && <p className="errorMessage">viceskip: {errors.viceSkip.message}</p>}
                            {errors.lead && <p className="errorMessage">lead: {errors.lead.message}</p>}
                            {errors.divisionId && <p className="errorMessage">{errors.divisionId.message}</p>}
                            {errors.id && <p className="errorMessage">id: {errors.id.message}</p>}
                            {errors.teamNo && <p className="errorMessage">teamNo: {errors.teamNo.message}</p>}
                            {errors.leagueid && <p className="errorMessage">leagueid:  {errors.leagueid.message}</p>}
                        </td>
                    </tr>
                </table>
                {
                    matches > 0 && <input type="hidden" defaultValue={team.division} {...register("divisionId")} />
                }
                
                {
                    league.teamSize < 3 && <input type="hidden" defaultValue="0" {...register("viceSkip")} />
                }
                {
                    league.teamSize < 2 && <input type="hidden" defaultValue="0" {...register("lead")} />
                }
            </form>
        </>;            ;
    
    return (
        <Layout>
           
            {contents}
            <p className="errorMessage">{errorMsg}</p>
            
        </Layout>
    );


    async function GetData() {
        if (team === undefined) {
            const url: string = import.meta.env.VITE_SERVER_URL + 'api/Teams/getOne/';
            const num: string = id;
            const fullUrl = url.concat(num);
            axios.get(fullUrl)
                .then(response => {

                    setTeam(response.data);


                    console.log('Record aquired successfully: ', response.data);
                })
                .catch(error => {
                    console.error('Error aquiring record: ', error);
                });
        }
    }

    async function GetMembers() {
        const url: string = `${import.meta.env.VITE_SERVER_URL}api/Teams/NotOnTeam/${league.id}`;
        axios.get(url)
            .then(response => {
                setMembership(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

    function updateData(data: UpdateFormData) {
        switch (league.teamSize) {
            case 1:
                break;
            case 2:
                if (data.skip != 0 && data.lead != 0 && data.skip == data.lead) {
                    SeterrorMsg("Skip and Lead have to be different members");
                    return;
                }
                break;
            case 3:
                if (data.skip != 0 && data.lead != 0 && data.skip == data.lead) {
                    SeterrorMsg("Skip and Lead have to be different members");
                    return;
                }
                if (data.skip != 0 && data.viceSkip != 0 && data.skip == data.viceSkip) {
                    SeterrorMsg("Skip and Vice Skip have to be different members");
                    return;
                }
                if (data.viceSkip != 0 && data.lead != 0 && data.viceSkip == data.lead) {
                    SeterrorMsg("Vice Skip and Lead have to be different members");
                    return;
                }
                break;
        }
        SeterrorMsg("");
        const url: string = import.meta.env.VITE_SERVER_URL+'api/Teams/'.concat(id);
        axios.put(url, data)
            .then(response => {
                console.log('Record updated successfully: ', response.data);
                navigate("/League/Teams");
            })
            .catch(error => {
                console.error('Error updating record: ', error);
            });
    }
}



export default TeamUpdate;