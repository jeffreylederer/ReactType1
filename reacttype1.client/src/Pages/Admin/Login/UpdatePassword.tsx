import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateForm.tsx"
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from "flowbite-react";
import { user } from "../../../components/leagueObject.tsx";;
import SubmitButton from '../../../components/Buttons.tsx';




const UpdatePassword = () => {

      
   
    

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),

    });

    const onSubmit: SubmitHandler<UpdateFormData> = (data) => updateData(data)

    const navigate = useNavigate();




    

    const contents = 

        <form onSubmit={handleSubmit(onSubmit)} >

            <table>

                <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={user().id} />
                <tr>
                    <td className="Label">User Name:</td>

                    <td className="Field"><TextInput defaultValue={user().username} disabled />
                    </td>
                </tr>

                <tr>
                    <td className="Label">Password:</td>

                    <td className="Field">
                        <TextInput type="password" {...register('password')} defaultValue="" />
                    </td>
                </tr>

               

                <tr>
                    <td colSpan={2} >
                       <SubmitButton/>
                    </td>
                </tr>
                <tr><td colSpan={1}>


                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}

                </td></tr>

            </table>
        </form>

    return (
        <>
            <h3>Update user password</h3>
            {contents}


        </>
    );


    

    function updateData(data: UpdateFormData) {
       const url: string = import.meta.env.VITE_SERVER_URL+'api/Admin/'.concat(user().id.toString());
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



export default UpdatePassword;