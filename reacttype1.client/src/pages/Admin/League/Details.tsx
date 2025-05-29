import { useLocation, Link } from "react-router-dom";
import { FormData } from "./FormData.tsx";
import { useNavigate } from "react-router-dom";
import Layout from "@layouts/Layout.tsx";
import { Button } from "flowbite-react";
import useFetch from '@hooks/useFetch.tsx';


const LeagueDetails = () => {
    const location = useLocation();
    const id: number = location.state;
    const navigate = useNavigate();
    const { data, isLoading, error } = useFetch<FormData>(`${import.meta.env.VITE_SERVER_URL}api/leagues/${id}`);

    if (error)
        return (
            <p>{error}</p>
                
           
        );

    if (isLoading)
        return (
            
                <p>Loading...</p>
       
        );

    if (data) {

        return (
            <Layout>
                <h3>Details for league {data.leagueName}</h3>
                <table >
                    <tr>
                        <td className="Label">Active:</td>
                        <td className="Field">{data.active ? "Yes" : "No"}</td>

                    </tr>
                    <tr>
                        <td className="Label">Team Size:</td>
                        <td className="Field">{data.teamSize}</td>
                    </tr>
                    <tr>
                        <td className="Label">Ties Allowed:</td>
                        <td className="Field">{data.tiesAllowed ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td className="Label">Points Count:</td>
                        <td className="Field">{data.pointsCount ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td className="Label">Points for a Win:</td>
                        <td className="Field">{data.winPoints}</td>
                    </tr>
                    <tr>
                        <td className="Label">Points for a Tie:</td>
                        <td className="Field">{data.tiePoints}</td>
                    </tr>
                    <tr>
                        <td className="Label">Points for a Bye:</td>
                        <td className="Field">{data.byePoints}</td>
                    </tr>
                    {/*<tr>*/}
                    {/*    <td className="Label">Start Week:</td>*/}
                    {/*    <td className="Field">{data.startWeek}</td>*/}
                    {/*</tr>*/}
                    <tr>
                        <td className="Label">Points Limit:</td>
                        <td className="Field">{data.pointsLimit ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td className="Label">Divisions:</td>
                        <td className="Field">{data.divisions}</td>
                    </tr>
                    <tr>
                        <td className="Label">Playoffs:</td>
                        <td className="Field">{data.playOffs ? "Yes" : "No"}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Link to="/Admin/League/Update" state={id.toString()}>
                                <Button outline color="Default">Update</Button></Link>
                            <Button outline color="Default" onClick={() => navigate(-1)}>Go back to list</Button>
                        </td>
                    </tr>
                </table>
            </Layout>
        );
    }

  
  
}


export default LeagueDetails;