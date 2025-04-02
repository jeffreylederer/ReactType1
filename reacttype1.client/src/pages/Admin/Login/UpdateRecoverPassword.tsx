import { useNavigate, useLocation } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdatePasswordData, UpdatePasswordDataScheme } from "./LoginDataTypes.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Button } from "flowbite-react";
import { useEffect, useState } from 'react';




const UpdateRecoverPassword = () => {

    const location = useLocation();
    const id: string = location.search.substring(4);   
    const [userid, setUserid] = useState<int | null>('');
    const [errorMsg, setErrorMsg] = useState<string | null>('');
    

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdatePasswordData>({
        resolver: zodResolver(UpdatePasswordDataScheme),

    });

    const onSubmit: SubmitHandler<UpdatePasswordData> = (data) => updateData(data)

    const navigate = useNavigate();

    useEffect(() => {


        GetUserid();
    });

    
    const contents = userid === ''
        ? <p><em>Loading ...</em></p>
        :

        <form onSubmit={handleSubmit(onSubmit)} >
            <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={userid} />
            <table>


                <tr>
                    <td className="Label">Password:</td>

                    <td className="Field">
                        <TextInput type="password" {...register('password')}  />
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

    return (
        <>
            <h3>Update your password</h3>
            {contents}


        </>
    );


    

    function updateData(data: UpdatePasswordData) {
        const url: string = `${import.meta.env.VITE_SERVER_URL}api/Admin/${userid}`;
        axios.put(url, data)
            .then(response => {
                console.log('Record updated successfully ', response.data);
                navigate("/Login");
            })
            .catch(error => {
                setErrorMsg('Error updating record: ', error);
            });
    }

    
    function GetUserid() {
        const url: string = `${import.meta.env.VITE_SERVER_URL}api/Admin/UpdatePassword/${id}`;
        axios.get(url)
            .then(response => {

                setUserid(response.data);

            })
            .catch(error => {
                setErrorMsg('Error aquiring record: '+ error.message);
            });
    }
       
    


}



export default UpdateRecoverPassword;