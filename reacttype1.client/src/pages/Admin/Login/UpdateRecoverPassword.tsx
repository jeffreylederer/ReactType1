import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import updateData from '@components/UpdateData.tsx';
import { UpdatePasswordData, UpdatePasswordDataScheme } from "./LoginDataTypes.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Button } from "flowbite-react";
import { useState } from 'react';
import useFetch from '@hooks/useFetch.tsx';
    ;



const UpdateRecoverPassword = () => {

    const location = useLocation();
    const id: string = location.search.substring(4);   
    const [errorMsg, setErrorMsg] = useState<string | null>('');

    

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdatePasswordData>({
        resolver: zodResolver(UpdatePasswordDataScheme),

    });

    const onSubmit: SubmitHandler<UpdatePasswordData> = (data) => update(data)

    const navigate = useNavigate();

    const { data, isLoading, error } = useFetch<number>(`${import.meta.env.VITE_SERVER_URL}api/Admin/UpdatePassword/${id}`);

    if (isLoading)
        return <p aria-label="Loading">Loading...</p>;

    if (error)
        return <p aria-label="Error">Return Error: {error}</p>;

    
   
    if (data  != null) {

        return (
            <>
                <h3>Update your password for {import.meta.env.VITE_SERVER_ClubName} league application</h3>
                <p hidden={data > 0 }>Your time has expired. <Link to="/RecoverPasswordRequest">Try again</Link></p>


                <form onSubmit={handleSubmit(onSubmit)} >
                    <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={data} />
                    <table>


                        <tr>
                            <td className="Label">Password:</td>

                            <td className="Field">
                                <TextInput type="password" {...register('password')} />
                            </td>
                        </tr>

                        <tr>
                            <td className="Label">Confirm Password:</td>

                            <td className="Field">
                                <TextInput type="password" {...register('confirmPassword')} />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2} >

                                <div className="flex flex-wrap gap-5"  >
                                    <br />
                                    <Button color="gray" type="submit" >Submit</Button>&nbsp;&nbsp;


                                </div>
                            </td>
                        </tr>
                        <tr><td colSpan={2}>


                            {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                            {errors.confirmPassword && <p className="errorMessage">{errors.confirmPassword.message}</p>}
                            <p>{errorMsg}</p>

                        </td></tr>

                    </table>
                </form>


            </>
        );
    }


    async function update(data: UpdatePasswordData) {
        try {
            await updateData(data, `${import.meta.env.VITE_SERVER_URL}api/Admin/${data.id}`);
            navigate("/Login");
        }
        catch (error) {
            setErrorMsg(`${error}`);
        }
    }

    
   
       
    


}



export default UpdateRecoverPassword;