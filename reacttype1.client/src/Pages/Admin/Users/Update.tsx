import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput, Select } from "flowbite-react";
import Menu from "../../../components/Menu.tsx";
import SubmitButton from '../../../components/Buttons.tsx';




const UsersUpdate = () => {

    const [users, setUsers] = useState(
        {
            id: 0,
            roleId:1,
            userName: '',
            password: '',
            displayName: '',
            isActive: false          
        }
    );
    const location = useLocation();
    const id: number = location.state;

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),

    });

    const onSubmit: SubmitHandler<UpdateFormData> = (data) => updateData(data)

    const navigate = useNavigate();




    useEffect(() => {
        GetData();
    });

    const contents = users.id === 0
        ? <p><em>Loading ...</em></p> :

        <form onSubmit={handleSubmit(onSubmit)} >

        <table>

            <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={users.id} />
            <tr>
                <td className="Label">User Name:</td>

                    <td className="Field">{users.userName}
                </td>
            </tr>

            <tr>
                <td className="Label">Active:</td>

                    <td className="Field">
                        <Checkbox {...register('isActive')} defaultChecked={users.isActive} />
                </td>
            </tr>

            <tr>
                    <td className="Label">Display Name:</td>

                    <td className="Field"><TextInput {...register('displayName')} style={{ width: '85%' }} defaultValue={users.displayName} />
                </td>
            </tr>

                <tr>
                    <td className="Label">Role:</td>

                    <td className="Field">
                        <Select style={{ width: '85%' }}  {...register('roleId')} defaultValue={users.roleId }>
                            
                            <option value="1">Observer</option>
                            <option value="2">Scorer</option>
                            <option value="3">Admin</option>
                            <option value="4">SiteAdmin</option>
                           
                        </Select>
                       
                    </td>
                </tr>
            

            <tr>
                <td colSpan={2}  style={{ textAlign: "center" }}>
                        <SubmitButton/>
                </td>
            </tr>
                <tr><td colSpan={1}>


                {errors.displayName && <p className="errorMessage">{errors.displayName.message}</p>}

                </td></tr>

            </table>
        </form>

    return (
        <>
        <Menu/>
            <h3>Update user record</h3>
            {contents}


        </>
    );


    async function GetData() {
        const url: string = import.meta.env.VITE_SERVER_URL+'api/Users/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {

                setUsers(response.data);


                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    function updateData(data: UpdateFormData) {
        const url: string = import.meta.env.VITE_SERVER_URL+'api/Users/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        data.id = id;
        axios.put(fullUrl, data)
            .then(response => {
                console.log('Record updated successfully: ', response.data);
                navigate("/Admin/Users");
            })
            .catch(error => {
                console.error('Error updating record: ', error);
            });
    }

    
}



export default UsersUpdate;