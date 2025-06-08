import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import createData from '@components/CreateData.tsx';
import { FormData, FormDataSchema } from "./FormData.tsx";
import { Membership } from "./Membership.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import LeagueClass from '@components/LeagueClass.tsx';;
import SubmitButton from '@components/Buttons.tsx';
import Layout from '@layouts/Layout.tsx';
import useFetch from '@hooks/useFetch.tsx'

const TeamsCreate = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema),
    });
    const league = new LeagueClass();
    const onSubmit: SubmitHandler<FormData> = (data) => create(data);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const { data, isLoading, error } = useFetch<Membership[]>(`/api/Teams/NotOnTeam/${league.id}`);

    if (error)
        return <p>{error}</p>;
 
    if (isLoading)
        return  <p>Loading...</p>;

     
    return (
        <Layout>
            <h3>Create new Team in league {league.leagueName} </h3>
            <form onSubmit={handleSubmit(onSubmit)} >
                <table>
                    <input type="hidden" {...register("leagueid")} defaultValue={league.id.toString()} />
                    <input type="hidden" {...register("teamNo")} defaultValue={"1"} />
                    <input type="hidden" {...register("id")} defaultValue={"0"} />
                    <tr>
                        <td className="Label">Skip:</td>
                        <td>
                            <select style={{ width: '85%' }} defaultValue="0" {...register("skip")}>
                                <option value="0" key="0">Select member</option>
                                {data?.map((item) => (
                                    <option value={item.id.toString()} key={item.id }>{item.fullName}</option>
                                ))}
                                )
                            </select></td>
                    </tr>

                    <tr hidden={league.teamSize < 3}>
                        <td className="Label">Vice Skip:</td>
                        <td>
                            <select style={{ width: '85%' }} defaultValue="0" {...register("viceSkip")}>
                                <option value="0" key="0">Select member</option>
                                {data?.map((item) => (
                                    <option value={item.id.toString()} key={item.id}>{item.fullName}</option>
                                ))}
                                )
                            </select></td>
                    </tr> 

                    <tr hidden={league.teamSize < 2}>
                        <td className="Label">Lead:</td>
                        <td>
                            <select style={{ width: '85%' }} defaultValue="0" {...register("lead")}>
                                <option value="0" key="0">Select Member</option>
                                {data?.map((item) => (
                                    <option value={item.id.toString()} key={item.id}>{item.fullName}</option>
                                ))}
                                )
                            </select></td>
                    </tr>
                    <tr >
                        <td className="Label">Division:</td>
                        <td>
                            <select style={{ width: '85%' }} defaultValue="0" {...register("divisionId")}>
                                <option value="0" key="0">Select Division</option>
                                <option value="1" key="1">1</option>
                                <option value="2" hidden={league.divisions < 2} key="2">2</option>
                                <option value="3" hidden={league.divisions < 3} key="3">3</option>
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
                        </td>
                    </tr>
                    

                </table>
                {
                    league.teamSize < 3 && <input type="hidden" defaultValue="0" {...register("viceSkip")} />
                }
                {
                    league.teamSize < 2 && <input type="hidden" defaultValue="0" {...register("lead")} />
                }

                
            </form>
            <p className="errorMessage">{errorMsg}</p>
        </Layout>
    );

    async function create(data: FormData) {
        switch (league.teamSize) {
            case 1:
                break;
            case 2:
                if (data.skip != 0 && data.lead != 0 && data.skip == data.lead) {
                    setErrorMsg("Skip and Lead have to be  different members");
                    return;
                }
                break;
            case 3:
                if (data.skip != 0 && data.lead != 0 && data.skip == data.lead) {
                    setErrorMsg("Skip and Lead have to be  different members");
                    return;
                }
                if (data.skip != 0 && data.viceSkip != 0 && data.skip == data.viceSkip) {
                    setErrorMsg("Skip and Vice Skip have to be  different members");
                    return;
                }
                if (data.viceSkip != 0 && data.lead != 0 && data.viceSkip == data.lead) {
                    setErrorMsg("Vice Skip and Lead have to be  different members");
                    return;
                }
                break;
        }
        try {
            await createData < FormData>(data, `/api/Teams`);
            navigate("/League/Teams");

        }
        catch (error) {
            setErrorMsg(`${error}`);
        }
    }

    

}



export default TeamsCreate;