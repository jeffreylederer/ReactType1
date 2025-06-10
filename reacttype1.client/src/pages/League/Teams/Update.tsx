import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import LeagueClass from '@components/LeagueClass.tsx';;
import { Membership } from "./Membership.tsx";
import Layout from '@layouts/Layout.tsx';
import SubmitButton from '@components/Buttons.tsx';
import { TeamType } from './TeamType.ts';
import { GetCount } from '@components/CountMatches.tsx';
import useFetch from '@hooks/useFetch.tsx';
import updateData from '@components/UpdateData.tsx';


const TeamUpdate = () => {
    const league = new LeagueClass();

    const [errorMsg, setErrorMsg] = useState("");

    const [membership, setMembership] = useState<Membership[]>();
    const location = useLocation();
    const id: string = location.state;


    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),
    });

    const onSubmit: SubmitHandler<UpdateFormData> = (data) => update(data)

    const navigate = useNavigate();

    useEffect(() => {
        GetMembers();
    },[])

    const { data, isLoading, error } = useFetch<TeamType>(`/api/Teams/getOne/${id}`);


    if (error)
        return <p>{error}</p>;

    if (isLoading)
        return <p>Loading...</p>;

    if (data) {

        return (
            <Layout>

                <h3>Update Team {data.teamNo} for league {league.leagueName}</h3>

                <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))} >
                    <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={data.id} />
                    <input type="hidden" {...register("leagueid", { valueAsNumber: true })} defaultValue={data.leagueid} />
                    <input type="hidden" {...register("teamNo", { valueAsNumber: true })} defaultValue={data.teamNo} />


                    <table>
                        <tr>
                            <td className="Label">Skip:</td>
                            <td>
                                <select defaultValue={data.skipid} {...register("skip")}>
                                    <option value="0" key="0">Select member</option>
                                    <option value={data.skipid} key={data.skipid}>{data.skip}</option>
                                    <option value={data.viceSkipid} key={data.viceSkipid == null ? "viceSkip" : data.viceSkipid} hidden={league.divisions > 1}>{data.viceSkip}</option>
                                    <option value={data.leadid} key={data.leadid == null ? "lead" : data.leadid} hidden={league.divisions > 2}>{data.lead}</option>
                                    {membership?.map((item) => (
                                        <option value={item.id} key={item.id}>{item.fullName}</option>
                                    ))}
                                    )
                                </select></td>
                        </tr>

                        <tr hidden={league.teamSize < 3}>
                            <td className="Label">Vice Skip:</td>
                            <td>
                                <select defaultValue={data.viceSkipid} {...register("viceSkip")}>
                                    <option value="0" key="0">Select member</option>
                                    <option value={data.skipid} key={data.skipid}>{data.skip}</option>
                                    <option value={data.viceSkipid} key={data.viceSkipid == null ? "viceSkip" : data.viceSkipid} hidden={league.divisions > 1}>{data.viceSkip}</option>
                                    <option value={data.leadid} key={data.leadid == null ? "lead" : data.leadid} hidden={league.divisions > 2}>{data.lead}</option>
                                    {membership?.map((item) => (
                                        <option value={item.id} key={item.id}>{item.fullName}</option>
                                    ))}
                                    )
                                </select></td>
                        </tr>

                        <tr hidden={league.teamSize < 2}>
                            <td className="Label">Lead:</td>
                            <td>
                                <select  {...register("lead")} defaultValue={data.leadid}>
                                    <option value="0" key="0">Select member</option>
                                    <option value={data.skipid} key={data.skipid}>{data.skip}</option>
                                    <option value={data.viceSkipid} key={data.viceSkipid == null ? "viceSkip" : data.viceSkipid} hidden={league.divisions > 1}>{data.viceSkip}</option>
                                    <option value={data.leadid} key={data.leadid == null ? "lead" : data.leadid} hidden={league.divisions > 2}>{data.lead}</option>
                                    {membership?.map((item) => (
                                        <option value={item.id} key={item.id}>{item.fullName}</option>
                                    ))}
                                    )
                                </select></td>
                        </tr>
                        <tr hidden={GetCount() > 0} >
                            <td className="Label">Division:</td>
                            <td>
                                <select defaultValue={data.division} {...register("divisionId")}>
                                    <option value="0" key="0">Select Devision</option>
                                    <option value="1" key="1">1</option>
                                    <option value="2" key="2" hidden={league.divisions < 2}>2</option>
                                    <option value="3" key="3" hidden={league.divisions < 3}>3</option>
                                </select></td>
                        </tr>
                        <tr hidden={GetCount() == 0} >
                            <input type="hidden" value={data.division} {...register("divisionId")} />
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
                        league.teamSize < 3 && <input type="hidden" defaultValue="0" {...register("viceSkip")} />
                    }
                    {
                        league.teamSize < 2 && <input type="hidden" defaultValue="0" {...register("lead")} />
                    }
                </form>
                <p className="errorMessage">{errorMsg}</p>

            </Layout>
        );
    }


    async function update(data: UpdateFormData) {
        try {
            switch (league.teamSize) {
                case 1:
                    break;
                case 2:
                    if (data.skip != 0 && data.lead != 0 && data.skip == data.lead) {
                        setErrorMsg("Skip and Lead have to be different members");
                        return;
                    }
                    break;
                case 3:
                    if (data.skip != 0 && data.lead != 0 && data.skip == data.lead) {
                        setErrorMsg("Skip and Lead have to be different members");
                        return;
                    }
                    if (data.skip != 0 && data.viceSkip != 0 && data.skip == data.viceSkip) {
                        setErrorMsg("Skip and Vice Skip have to be different members");
                        return;
                    }
                    if (data.viceSkip != 0 && data.lead != 0 && data.viceSkip == data.lead) {
                        setErrorMsg("Vice Skip and Lead have to be different members");
                        return;
                    }
                    break;
            }
            await updateData<UpdateFormData>(data, `/api/Teams/${id}`);
            navigate("/League/Teams");;
        }
        catch (error) {
            setErrorMsg(`${error}`);
        }
    }

    
    
    async function GetMembers() {
        try {
            const response = await fetch(`/api/Teams/NotOnTeam/${league.id}`);
            if (!response.ok) {
                setErrorMsg(`HTTP error! Status: ${response.status}`);
                return;
            }
            const data = await response.json() as Membership[];
            setMembership(data);
        } catch (error) {
            setErrorMsg(`Error:, ${error}`);
        }
    }







}

   

   



export default TeamUpdate;