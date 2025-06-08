import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import createData from '@components/CreateData.tsx';
import { FormData, FormDataSchema } from "./FormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput } from "flowbite-react";
import Layout from '@layouts/Layout.tsx';
import SubmitButton from '@components/Buttons.tsx';
import { useState } from 'react';

const MembershipCreate = () => {
   
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema),
    });

    const [errorMsg, setErrorMsg] = useState<string>('');

    const onSubmit: SubmitHandler<FormData> = (data) => create(data)
       
    const navigate = useNavigate();

    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)} >


                
                <TextInput {...register("nickName")} type="hidden"   />
                <TextInput {...register("fullName")} type="hidden"   />
                <table>
                    <tr>
                        <td className="Label">First Name:</td>

                        <td className="Field"><TextInput {...register('firstName')}  />
                        </td>
                         </tr>
                    <tr>
                        <td className="Label">Last Name:</td>

                        <td className="Field"><TextInput  {...register('lastName')}  />
                        </td>
                    </tr>
                    <tr>
                        <td className="Label">Short Name:</td>
                        <td className="Field"><TextInput {...register('shortname')}  />
                        </td>
                    </tr>
                    <tr>
                        <td className="Label">Wheel Chair:</td>

                        <td className="Field">
                            <Checkbox {...register('wheelchair')}  />
                        </td>
                    </tr>
                    <tr>

                        <td colSpan={2} >
                           <SubmitButton />
                        </td>
                    </tr>
                    <tr><td colSpan={1}>
                    {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                    {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
                        {errors.shortname && <p className="errorMessage">{errors.shortname.message}</p>}
                        <p className="errorMessage">{errorMsg}</p>
                    </td>
                    </tr>
                    

                </table>
            </form>
            
        </Layout>
    );

    async function create(data: FormData) {
        try {
            await createData(data, `/api/Memberships`);
            navigate("/Membership");;
        }
        catch (error) {
            setErrorMsg(`${error}`);
        }
    }
}

export default MembershipCreate;