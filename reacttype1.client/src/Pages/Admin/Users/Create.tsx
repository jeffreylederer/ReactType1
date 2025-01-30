import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { FormData, FormDataSchema } from "./FormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput, Select, } from "flowbite-react";
import Menu from "../../../components/Menu.tsx";
import SubmitButton from '../../../components/Buttons.tsx';

const UserCreate = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema),
    });

    const onSubmit: SubmitHandler<FormData> = (data) => CreateData(data)

    const navigate = useNavigate();

    function CreateData(data: FormData) {
        axios.post(import.meta.env.VITE_SERVER_URL+'api/Users', data)
            .then((response) => {
                console.log(response.data);
                navigate("/Admin/Users");
                console.log('Record created successfully: ', response.data);
            })
            .catch(error => {
                console.log('Error creating record: ', error);
            });
    }

    return (
        <>
        <Menu/>
        <h3>Add new user</h3>
            <form onSubmit={handleSubmit(onSubmit)} >
                 <table>
                    <tr>
                        <td className="Label">User Name:</td>

                        <td className="Field"><TextInput {...register('userName')}   />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Password:</td>

                        <td className="Field"><TextInput type="password" {...register('password')}   />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Active:</td>

                        <td className="Field">
                            <Checkbox {...register('isActive')}  />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Display Name:</td>

                        <td className="Field"><TextInput {...register('displayName')}   />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Role:</td>

                        <td className="Field">
                            <Select   {...register('roleId')} defaultValue="1" name='roleId'>
                                <option value="1">Observer</option>
                                <option value="2">Scorer</option>
                                <option value="3">Admin</option>
                                <option value="4">SiteAdmin</option>
                            </Select>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2} >
                            <SubmitButton/>
                        </td>
                    </tr>
                   

                    <tr><td colSpan={1}>
                    {errors.userName && <p className="errorMessage">{errors.userName.message}</p>}
                    {errors.displayName && <p className="errorMessage">{errors.displayName.message}</p>}
                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                    {errors.roleId && <p className="errorMessage">{errors.roleId.message}</p>}
                    </td></tr>



                </table>
            </form>

        </>
    );




}



export default UserCreate;