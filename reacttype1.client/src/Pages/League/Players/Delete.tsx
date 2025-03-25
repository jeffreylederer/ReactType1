import { useLocation, useNavigate, } from "react-router-dom";
import DeleteItem from '@components/DeleteItem.tsx';
import { League } from '@components/leagueObject.tsx';
import { Button } from "flowbite-react";
import Layout from '@layouts/Layout.tsx';
import useFetchOne from '@hooks/useFetchOne.tsx';
import DeleteTypeData from './DeleteTypeData.ts';


const PlayersDelete = () => {
    const location = useLocation();
    const id: number = location.state;
    
    
    const navigate = useNavigate();


    const { data, loading, error } = useFetchOne<DeleteTypeData>(`${import.meta.env.VITE_SERVER_URL}api/Players/getOne`, id);

    if (error)
        return (
            <>
                <h3>Delete player from league {League().leagueName}</h3>
                {error}
            </>
        );
        

    if (loading)
        return 
            <p>Loading...</p>;


    if (data) {

        return (
            <Layout>
                <h2>Delete player from league {League().leagueName} </h2>
                <table>
                    <tr>
                        <td className="Label">Name:</td>

                        <td className="Field">{data.fullName}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} >
                            <Button pill color="gray" onClick={() => Delete(id)}>Delete Record</Button>&nbsp;&nbsp;
                            <Button pill color="gray" onClick={() => navigate(-1)}>Go back to list</Button>
                        </td>
                    </tr>
                </table>


            </Layout>
        );
    }

     function Delete(id: number) {
         if (DeleteItem(`${import.meta.env.VITE_SERVER_URL}api/players`, id))
            navigate("/League/Players");
    }
}


export default PlayersDelete;