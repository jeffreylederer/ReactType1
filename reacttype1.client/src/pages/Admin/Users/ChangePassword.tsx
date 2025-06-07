import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChangePasswordType, ChangePasswordTypeSchema, PasswordType } from "./ChangePasswordType.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from "flowbite-react";
import Layout from "@layouts/Layout.tsx";
import SubmitButton from '@components/Buttons.tsx';
import useFetch from '@hooks/useFetch.tsx';
import updateData from '@components/UpdateData.tsx';
import { useState } from 'react';




const ChangePassword = () => {

  
    const location = useLocation();
    const id: number = location.state;

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<ChangePasswordType>({
        resolver: zodResolver(ChangePasswordTypeSchema),

    });

    const onSubmit: SubmitHandler<ChangePasswordType> = (data) => update(data)

    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState<string>('');

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
                <h3>Change user's password</h3>
                <form onSubmit={handleSubmit(onSubmit)} >

                    <table>

                        <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={data.id.toString()} />
                        <tr>
                            <td className="Label">User Name:</td>

                            <td className="Field">{data.userName}
                            </td>
                        </tr>



                        <tr>
                            <td className="Label">Password:</td>

                            <td className="Field"><TextInput type="password" {...register('password')} style={{ width: '85%' }} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Confirm Password:</td>

                            <td className="Field"><TextInput type="password" {...register('confirmPassword')} style={{ width: '85%' }} />
                            </td>
                        </tr>
                        <tr>

                            <td colSpan={2} style={{ textAlign: "center" }}>
                                <SubmitButton />
                            </td>
                        </tr>
                        <tr><td colSpan={2}>


                            {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                            {errors.confirmPassword && <p className="errorMessage">{errors.confirmPassword.message}</p>}
                            {errors.id && <p className="errorMessage">{errors.id.message}</p>}
                            <p className="errorMessage">{errorMsg}</p>
                        </td></tr>

                    </table>
                </form>


            </Layout>
        );
    }


   

    async function update(data: ChangePasswordType) {
        try {
            await updateData<ChangePasswordType>(data, `${import.meta.env.VITE_SERVER_URL}api/Users/ChangePassword${id}`);
            navigate("/Admin/Users");
        }
        catch (error) {
            setErrorMsg(`${error}`);
        }
    }


}



export default ChangePassword;