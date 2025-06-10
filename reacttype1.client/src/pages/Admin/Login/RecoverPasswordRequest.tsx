import { RecoverPasswordRequestData, RecoverPasswordRequestDataSchema } from "./LoginDataTypes.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from 'react';
import { TextInput, Button } from "flowbite-react";




function RecoverPasswordRequest() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RecoverPasswordRequestData>({
        resolver: zodResolver(RecoverPasswordRequestDataSchema),
    });

    const addr: string = window.location.href.replace("RecoverPasswordRequest", "");
   

    const onSubmit: SubmitHandler<RecoverPasswordRequestData> = (data) => SendData(data)
    const [errorMsg, setErrorMsg] = useState('');

    return (
        <>
            <h3>Password Recover for {import.meta.env.VITE_SERVER_ClubName} league application</h3>
            <p>Please fill in your email address (which is also your login user name). Once you select the submit button, an email
                will be set to you. This email will have a hyperlink with a unique ticket number. Once the email is sent, you have 20
            minutes to response or the ticket will expire.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} >
                <input type="hidden" {...register("url")} defaultValue={addr} />
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

    
    async function SendData(data: RecoverPasswordRequestData) {
        try {
            const response = await fetch('/api/Admin/RecoverPasswordRequest', {
                method: 'POST', // HTTP method
                headers: {
                    'Content-Type': 'application/json', // Specify JSON format
                },
                body: JSON.stringify(data), // Convert data to JSON string
            });

            if (!response.ok) {
                // Handle HTTP errors (e.g., 4xx or 5xx status codes)
                setErrorMsg(`HTTP error! Status: ${response.status}`);
                return;
            }

            const result = await response.text();
            
            return setErrorMsg(result);
        } catch (error) {
            // Catch and handle network or other errors
            setErrorMsg( `Error occurred: ${error}`);
        }
        
    }

   
}

export default RecoverPasswordRequest;