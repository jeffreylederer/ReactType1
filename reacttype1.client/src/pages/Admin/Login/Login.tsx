import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from 'react';
import { TextInput, Button } from "flowbite-react";
import createData from '@components/CreateData.tsx';
import UserClass, { UserType } from "@components/UserClass";
import { SetCount } from '@components/CountMatches.tsx';

import { LoginType, LoginTypeSchema } from './LoginDataTypes.tsx';

function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginType>({
        resolver: zodResolver(LoginTypeSchema),
    });
    const navigate = useNavigate();

   

    const onSubmit: SubmitHandler<LoginType> = (data) => create(data)
    const [errorMsg, setErrorMsg] = useState('');

   

      


    return (
        <>

            <h3>Please login to {import.meta.env.VITE_SERVER_ClubName} league application</h3>
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
                        
                        <Link to="/RecoverPasswordRequest" >Forgot your password?</Link> 
                    </tbody>
                </table>
            </form>
        </>
    );

    async function create(data: LoginType) {
        try {
            const returnData: UserType = await createData<LoginType>(data, `/api/Admin`) as UserType;
            const user = new UserClass();
            user.Initialize(returnData);
            SetCount(0);
            navigate("/")
        }
        catch (error) {
            setErrorMsg(`${error}`);
        }
    }


}

export default Login;