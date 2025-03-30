import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { ChangePasswordType, ChangePasswordTypeSchema } from "./ChangePasswordType.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from "flowbite-react";
import Layout from "@layouts/Layout.tsx";
import SubmitButton from '@components/Buttons.tsx';




const ChangePassword = () => {

    const [users, SetUsers] = useState(
        {
            id: 0,
            roleId: 1,
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

    } = useForm<ChangePasswordType>({
        resolver: zodResolver(ChangePasswordTypeSchema),

    });

    const onSubmit: SubmitHandler<ChangePasswordType> = (data) => updateData(data)

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
                    <td className="Label">Password:</td>

                    <td className="Field"><TextInput type="password" {...register('password')} style={{ width: '85%' }}  />
                    </td>
                </tr>

                <tr>
                    <td className="Label">Confirm Password:</td>

                    <td className="Field"><TextInput type="password" {...register('confirmPassword')} style={{ width: '85%' }} />
                    </td>
                </tr>
                <tr>
               
                    <td colSpan={2} style={{ textAlign: "center" }}>
                        <SubmitButton />
                    </td>
                </tr>
                <tr><td colSpan={2}>


                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                    {errors.confirmPassword && <p className="errorMessage">{errors.confirmPassword.message}</p>}

                </td></tr>

            </table>
        </form>

    return (
        <Layout>
            <h3>Change user's password</h3>
            {contents}


        </Layout>
    );


    async function GetData() {
        const url: string = import.meta.env.VITE_SERVER_URL + 'api/Users/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        if (users.id == 0) {
            axios.get(fullUrl)
                .then(response => {

                    SetUsers(response.data);


                    console.log('Record aquired successfully: ', response.data);
                })
                .catch(error => {
                    console.error('Error aquiring record: ', error);
                });
        }

    }

    function updateData(data: ChangePasswordType) {
        const url: string = import.meta.env.VITE_SERVER_URL + 'api/Users/ChangePassword';
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



export default ChangePassword;