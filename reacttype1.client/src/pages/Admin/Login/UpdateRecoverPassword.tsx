import { useNavigate, useLocation } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdatePasswordData, UpdatePasswordDataScheme } from "./LoginDataTypes.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Button } from "flowbite-react";
import { User } from "@components/leagueObject.tsx";
import { useEffect, useState } from 'react';




const UpdateRecoverPassword = () => {

    const location = useLocation();
    const id: string = location.state;   
    const [ userid, setUserid ] = useState<number | null>(null);
    

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

    
    const contents = userid === undefined
        ? <p><em>Loading ...</em></p>
        :

        <form onSubmit={handleSubmit(onSubmit)} >

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
                        
                        return (
                        <div className="flex flex-wrap gap-5"  >
                            <br />
                            <Button color="gray" type="submit" >Submit</Button>&nbsp;&nbsp;


                        </div>
                    </td>
                </tr>
                <tr><td colSpan={1}>


                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}

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
       const url: string = import.meta.env.VITE_SERVER_URL+'api/Admin/'.concat(User().id.toString());
        axios.put(url, data)
            .then(response => {
                console.log('Record updated successfully ', response.data);
                navigate("/Admim/Login/Login");
            })
            .catch(error => {
                console.log('Error updating record: ', error);
            });
    }

    
    function GetUserid() {
        const url: string = `${import.meta.env.VITE_SERVER_URL}api/Admin/UpdateUserPassword/${id}`;
        axios.get(url)
            .then(response => {

                setUserid(response.data);


                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });
    }
       
    


}



export default UpdateRecoverPassword;