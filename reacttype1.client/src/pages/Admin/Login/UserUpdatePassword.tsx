import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdatePasswordData, UpdatePasswordDataScheme } from "./LoginDataTypes.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Button } from "flowbite-react";
import { User } from "@components/leagueObject.tsx";




const UserUpdatePassword = () => {

    
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdatePasswordData>({
        resolver: zodResolver(UpdatePasswordDataScheme),

    });

    const onSubmit: SubmitHandler<UpdatePasswordData> = (data) => updateData(data)

    const navigate = useNavigate();



    const contents =

        <form onSubmit={handleSubmit(onSubmit)} >

            <table>

                <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={User().id} />
                <tr>
                    <td className="Label">User Name:</td>

                    <td className="Field"><TextInput defaultValue={User().username} disabled />
                    </td>
                </tr>

                <tr>
                    <td className="Label">Password:</td>

                    <td className="Field">
                        <TextInput type="password" {...register('password')} defaultValue="" />
                    </td>
                </tr>

                <tr>
                    <td className="Label">Confirm Password:</td>

                    <td className="Field">
                        <TextInput type="password" {...register('confirmPassword')} defaultValue="" />
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
        const url: string = import.meta.env.VITE_SERVER_URL + 'api/Admin/'.concat(User().id.toString());
        axios.put(url, data)
            .then(response => {
                console.log('Record updated successfully ', response.data);
                navigate("/Admim/Login/Login");
            })
            .catch(error => {
                console.log('Error updating record: ', error);
            });
    }


    




}



export default UserUpdatePassword;