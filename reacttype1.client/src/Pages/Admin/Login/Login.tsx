import { FormData, FormDataSchema } from "./FormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from 'react';
import { TextInput, Button } from "flowbite-react";
import axios from "axios";
import { setUser } from "../../../components/leagueObject.tsx";
import { UserType } from "../../../components/leagueObjectTypes.tsx";;

function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema),
    });
    const navigate = useNavigate();

   

    const onSubmit: SubmitHandler<FormData> = (data) => LoginData(data)
    const [errorMsg, setErrorMsg] = useState('');

   

    function LoginData(data: FormData) {
        axios.post(import.meta.env.VITE_SERVER_URL+ 'api/Admin', data)
            .then((response) => {
                if (response.data == null) {
                    setErrorMsg("Login not successful");
                 }
                else {
                    const data: UserType = response.data;
                    setUser(data);
                    
                    navigate("/");
                }
            })
            .catch(error => {
                setErrorMsg("Login not successful, ".concat(error));
            });
    }


    return (
        <>

            <h3>Please login to application</h3>
            <form onSubmit={handleSubmit(onSubmit)} >
                <table>
                    <tbody>
                        <tr>
                            <td className="Label">User Name:</td>
                            <td className="Field"><TextInput {...register('username')} /></td>
                        </tr>

                        <tr>
                            <td className="Label">Password:</td>
                            <td className="Field"><TextInput type="password" {...register('password')} /></td>
                        </tr>

                        <tr>
                            <td colSpan={1} style={{ textAlign: "center" }}>
                                <Button type="submit" color="gray">Submit</Button>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={1}>
                                {errors.username && <p className="errorMessage">{errors.username.message}</p>}
                                {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                                <p className='errorMessage'>{errorMsg}</p>
                            </td>
                            </tr>
                    </tbody>
                </table>
            </form>
        </>
    );


}

export default Login;