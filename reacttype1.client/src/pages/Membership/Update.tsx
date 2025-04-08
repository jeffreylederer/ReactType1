import { useLocation, useNavigate} from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput, } from "flowbite-react";
import SubmitButton from '@components/Buttons.tsx';
import Layout from '@layouts/Layout.tsx';
import useFetchOne from '@hooks/useFetchOne.tsx';
import UpdateData from '@components/UpdateData.tsx';
import GetData from './GetData.ts'; 


const MembershipUpdate = () => {

    let membership: GetData = {
        id: 0,
        firstName: '',
        lastName: '',
        shortname: '',
        fullName: '',
        nickName: '',
        wheelchair: false
    };

    const navigate = useNavigate();

    const location = useLocation();
    const id: number = location.state;
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),
    });
    const onSubmit: SubmitHandler<UpdateFormData> = (data) => updateData(data,id)
 
   
    const { data, loading, error } = useFetchOne<UpdateFormData>(`${import.meta.env.VITE_SERVER_URL}api/Memberships`, id);

    if (error)
        return (
            <Layout>
                <h3>Update membership record</h3>
                {error}
            </Layout>
        );

    if (loading)
        return (
            <Layout>
                <h3>Update membership record</h3>
                <p>Loading...</p>
            </Layout>
        );
    if (data) {
        membership = data;



        return (
            <Layout>
                <h3>Update membership record</h3>
                <form onSubmit={handleSubmit(onSubmit)} >



                    <input type="hidden" {...register("id", { valueAsNumber: true })} value={membership.id} />
                    <TextInput {...register("nickName")} type="hidden" />
                    <TextInput {...register("fullName")} type="hidden" />
                    <table>
                        <tr>
                            <td className="Label">First Name:</td>

                            <td className="Field"><TextInput type="text" {...register('firstName')} style={{ width: '85%' }} defaultValue={membership.firstName} />
                            </td>
                        </tr>
                        <tr>
                            <td className="Label">Last Name:</td>

                            <td className="Field"><TextInput  {...register('lastName')} style={{ width: '85%' }} defaultValue={membership.lastName} />
                            </td>
                        </tr>
                        <tr>
                            <td className="Label">Short Name:</td>
                            <td className="Field"><TextInput {...register('shortname')} style={{ width: '85%' }} defaultValue={membership.shortname} />
                            </td>
                        </tr>
                        <tr>
                            <td className="Label">Wheel Chair:</td>

                            <td className="Field">
                                <Checkbox {...register('wheelchair')} defaultChecked={membership.wheelchair} />
                            </td>
                        </tr>
                        <tr className="center-td">

                            <td colSpan={2} >
                                <SubmitButton />
                            </td>
                        </tr>
                        <tr><td colSpan={1}>
                            {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                            {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
                            {errors.shortname && <p className="errorMessage">{errors.shortname.message}</p>}
                            {errors.id && <p className="errorMessage">{errors.id.message}</p>}
                        </td></tr>
                    </table>
                </form>

                
            </Layout>
        );
    }

    function updateData(data: UpdateFormData, id:number) {
        if (UpdateData<UpdateFormData>(data, `${import.meta.env.VITE_SERVER_URL}api/Memberships/${id}`))
            navigate("/Membership");
    }


    
}




export default MembershipUpdate;