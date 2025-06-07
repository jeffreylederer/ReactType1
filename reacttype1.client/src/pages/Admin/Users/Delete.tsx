import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { DetailsType } from "./DetailsType.tsx";
import Layout from "@layouts/Layout.tsx";
import { DeleteButton } from '@components/Buttons.tsx';
import useFetch from '@hooks/useFetch.tsx';
import deleteData from '@components/deleteData.tsx';


const UsersDelete = () => {
    const location = useLocation();
    const id: number = location.state;

    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const { data, isLoading, error } = useFetch<DetailsType>(`${import.meta.env.VITE_SERVER_URL}api/Users/${id}`);

    if (error)
        return (
            <Layout>
                <h3>Delete Member</h3>
                {error}
            </Layout>
        );

    if (isLoading)
        return (
            <Layout>
                <h3>Delete Member</h3>
                <p>Loading...</p>
            </Layout>
        );        

    return (
        <Layout>
             <h3>Delete user</h3>
            <table>
                <tr>
                    <td className="Label">Users Name:</td>

                    <td className="Field">{data?.userName}</td>
                </tr>
                <tr>
                    <td className="Label">Active:</td>
                    <td className="Field">{data?.isActive ? "Yes" : "No"}</td>

                </tr>
                <tr>
                    <td className="Label">Display Name:</td>
                    <td className="Field">{data?.displayName}</td>
                </tr>

                <tr>
                    <td className="Label">Role:</td>
                    <td className="Field">{data?.role}</td>
                </tr>

                <tr>
                    <td colSpan={2} >
                        <DeleteButton DeleteItem={deleteItem} />
                    </td>
                </tr>
            </table>
            <p>{errorMsg}</p>
        </Layout>
    );


    async function deleteItem() {

        try {
            await deleteData(`${import.meta.env.VITE_SERVER_URL}api/Users/${id}`);
            navigate("/Admin/Users");
        }
        catch (error) {
            setErrorMsg(`${error}`);
        }
    }

};


export default UsersDelete;