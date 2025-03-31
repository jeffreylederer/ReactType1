import { useLocation, useNavigate } from "react-router-dom";
import { ListData } from "./ListData.tsx";
import Layout from '@layouts/Layout.tsx';
import { DeleteButton } from '@components/Buttons.tsx';
import useFetchOne from '@hooks/useFetchOne.tsx';
import DeleteItem from '@components/DeleteItem.tsx';


const MembershipDelete = () => {
    const location = useLocation();
    const id: number = location.state;
   
   
    const navigate = useNavigate();

    const { data, loading, error } = useFetchOne<ListData>(`${import.meta.env.VITE_SERVER_URL}api/Memberships` ,id);
    if (error)
        return (
            <Layout>
                <h3>Delete Member</h3>
                {error}
            </Layout>
        );

    if (loading)
        return (
            <Layout>
                <h3>Delete Member</h3>
                <p>Loading...</p>
            </Layout>
        );

    if (data) {
       

        return (
            <Layout>
                <h3>Delete Member</h3>
                <table>
                    <tr>
                        <td className="Label">First Name:</td>

                        <td className="Field">{data.firstName}</td>
                    </tr>
                    <tr>
                        <td style={{ width: "200px" }}>Last Name:</td>
                        <td className="Field">{data.lastName}</td>

                    </tr>
                    <tr>
                        <td style={{ width: "200px" }}>Short Name:</td>
                        <td className="Field">{data.shortname == null ? "" : data.shortname}</td>
                    </tr>
                    <tr>
                        <td style={{ width: "200px" }}>Wheel Chair:</td>
                        <td className="Field">{data.wheelchair ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>

                            <DeleteButton DeleteItem={deleteItem} />
                        </td>
                    </tr>
                </table>
                
            </Layout>
        );
    }

    function deleteItem() {
        if (DeleteItem(`${import.meta.env.VITE_SERVER_URL}api/Memberships`, id))
            navigate("/Membership");
    }
}

export default MembershipDelete;