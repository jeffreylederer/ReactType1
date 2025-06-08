import { useLocation, useNavigate} from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput, } from "flowbite-react";
import SubmitButton from '@components/Buttons.tsx';
import Layout from '@layouts/Layout.tsx';
import useFetch from '@hooks/useFetch.tsx';
import updateData from '@components/UpdateData.tsx';
import { useState } from 'react';


const MembershipUpdate = () => {
    const [errorMsg,setErrorMsg] = useState<string>('');
   


    const navigate = useNavigate();

    const location = useLocation();
    const id: number = location.state;
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),
    });
const onSubmit: SubmitHandler<UpdateFormData> = (data) => update(data)
 
   
    const { data, isLoading, error } =useFetch<UpdateFormData>(`/api/Memberships/${id}`);

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
                <h3>Update membership record</h3>
                <form onSubmit={handleSubmit(onSubmit)} >



                    <input type="hidden" {...register("id", { valueAsNumber: true })} value={data?.id} />
                    <TextInput {...register("nickName")} type="hidden" />
                    <TextInput {...register("fullName")} type="hidden" />
                    <table>
                        <tr>
                            <td className="Label">First Name:</td>

                            <td className="Field"><TextInput type="text" {...register('firstName')} style={{ width: '85%' }} defaultValue={data?.firstName} />
                            </td>
                        </tr>
                        <tr>
                            <td className="Label">Last Name:</td>

                            <td className="Field"><TextInput  {...register('lastName')} style={{ width: '85%' }} defaultValue={data?.lastName} />
                            </td>
                        </tr>
                        <tr>
                            <td className="Label">Short Name:</td>
                            <td className="Field"><TextInput {...register('shortname')} style={{ width: '85%' }} defaultValue={data?.shortname} />
                            </td>
                        </tr>
                        <tr>
                            <td className="Label">Wheel Chair:</td>

                            <td className="Field">
                                <Checkbox {...register('wheelchair')} defaultChecked={data?.wheelchair} />
                            </td>
                        </tr>
                        <tr className="center-td">

                            <td colSpan={2} >
                                <SubmitButton />
                            </td>
                        </tr>
                        <tr><td colSpan={1}>
                            {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                            {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
                            {errors.shortname && <p className="errorMessage">{errors.shortname.message}</p>}
                            {errors.id && <p className="errorMessage">{errors.id.message}</p>}
                            <p className="errorMessage">{errorMsg}</p>
                        </td></tr>
                    </table>
                </form>


            </Layout>
        );
    }
 

    async function update(data: UpdateFormData) {
        try {
            await updateData(data, `/api/Memberships/${id}`);
            navigate("/Membership");;
        }
        catch (error) {
            setErrorMsg(`${error}`);
        }
    }

    
}




export default MembershipUpdate;