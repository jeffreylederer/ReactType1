import { RecoverPasswordRequestData, RecoverPasswordRequestDataSchema } from "./LoginDataTypes.tsx";
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from 'react';
import { TextInput, Button } from "flowbite-react";
import axios from "axios";



function RecoverPasswordRequest() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RecoverPasswordRequestData>({
        resolver: zodResolver(RecoverPasswordRequestDataSchema),
    });


    function SendData(data: RecoverPasswordRequestData) {
        axios.post(import.meta.env.VITE_SERVER_URL + 'api/Admin/RecoverPasswordRequest', data)
            .then((response) => {
                setErrorMsg("You will be sent an email with instructions to reset your password.");
                console.log(response);
            })
            .catch(error => {
                setErrorMsg("Send data not successful, ".concat(error));
            });
    }

    const onSubmit: SubmitHandler<RecoverPasswordRequestData> = (data) => SendData(data)
    const [errorMsg, setErrorMsg] = useState('');

    return (
        <>
            <h3>Password Recover</h3>
            <form onSubmit={handleSubmit(onSubmit)} >
                <input type="hidden" {...register("url")} defaultValue={import.meta.env.VITE_SERVER_URL} />
                <table>
                    <tbody>
                        <tr>
                            <td className="Label">User Name:</td>
                            <td className="Field"><TextInput {...register('userName')} /></td>
                        </tr>
                   

                    <tr>
                        <td colSpan={2} style={{ textAlign: "center" }}>
                            <Button type="submit" color="gray">Submit</Button>
                        </td>
                    </tr>
                    <tr>
                            <td colSpan={2}>
                                {errors.userName && <p className="errorMessage">{errors.userName.message}</p>}
                            
                            <p className='errorMessage'>{errorMsg}</p>
                        </td>
                        </tr>
                       
                    </tbody>
                </table>
            </form>
           
        </>
    );


}

export default RecoverPasswordRequest;