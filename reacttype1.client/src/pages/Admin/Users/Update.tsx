import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput, Select } from "flowbite-react";
import Layout from "@layouts/Layout.tsx";
import SubmitButton from '@components/Buttons.tsx';
import { PasswordType } from './ChangePasswordType.tsx';
 
import useFetch from '@hooks/useFetch.tsx';
import updateData from '@components/UpdateData.tsx';
import { useState } from 'react';



const UsersUpdate = () => {
    const [errorMsg, setErrorMsg] = useState<string>('');

    const location = useLocation();
    const id: number = location.state;

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),

    });

    const onSubmit: SubmitHandler<UpdateFormData> = (newData) => update(newData);

    const navigate = useNavigate();

    const { data, isLoading, error } = useFetch<PasswordType>(`${import.meta.env.VITE_SERVER_URL}api/Users/${id}`);


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
                <h3>Update user record</h3>
                <form onSubmit={handleSubmit(onSubmit)} >

                    <table>

                        <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={data.id.toString()} />
                        <tr>
                            <td className="Label">User Name:</td>

                            <td className="Field">{data?.userName}
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Active:</td>

                            <td className="Field">
                                <Checkbox {...register('isActive')} defaultChecked={data.isActive} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Display Name:</td>

                            <td className="Field"><TextInput {...register('displayName')} style={{ width: '85%' }} defaultValue={data.displayName} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Role:</td>

                            <td className="Field">
                                <Select style={{ width: '85%' }}  {...register('roleId')} defaultValue={data.roleId}>

                                    <option value="1">Observer</option>
                                    <option value="2">Scorer</option>
                                    <option value="3">Admin</option>
                                    <option value="4">SiteAdmin</option>

                                </Select>

                            </td>
                        </tr>


                        <tr>
                            <td colSpan={2} style={{ textAlign: "center" }}>
                                <SubmitButton />
                            </td>
                        </tr>
                        <tr><td colSpan={1}>


                            {errors.displayName && <p className="errorMessage">{errors.displayName.message}</p>}
                            <p className="errorMessage">{errorMsg}</p>

                        </td></tr>

                    </table>
                </form>


            </Layout>
        );
    }


    async function update(data: UpdateFormData) {
        try {
            await updateData(data, `${import.meta.env.VITE_SERVER_URL}api/Users/${id}`);
            navigate("/Admin/Users");
        }
        catch (error) {
            setErrorMsg(`${error}`);
        }
    }

   

    
}



export default UsersUpdate;