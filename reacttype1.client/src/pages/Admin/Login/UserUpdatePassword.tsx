import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdatePasswordData, UpdatePasswordDataScheme } from "./LoginDataTypes.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Button } from "flowbite-react";
import UserClass from "@components/UserClass";




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
    const user = new UserClass();



    const contents =

        <form onSubmit={handleSubmit(onSubmit)} >

            <table>

                <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={user.id} />
                <tr>
                    <td className="Label">User Name:</td>

                    <td className="Field"><TextInput defaultValue={user.userName} disabled />
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

                        <div className="flex flex-wrap gap-5"  >
                            <br />
                            <Button color="gray" type="submit" >Submit</Button>&nbsp;&nbsp;


                        </div>
                    </td>
                </tr>
                <tr><td colSpan={1}>


                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                    {errors.confirmPassword && <p className="errorMessage">{errors.confirmPassword.message}</p>}

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
        const url: string = import.meta.env.VITE_SERVER_URL + 'api/Admin/'.concat(user.id.toString());
        axios.put(url, data)
            .then(response => {
                console.log('Record updated successfully ', response.data);
                navigate(-1);
            })
            .catch(error => {
                console.log('Error updating record: ', error);
            });
    }


    




}



export default UserUpdatePassword;