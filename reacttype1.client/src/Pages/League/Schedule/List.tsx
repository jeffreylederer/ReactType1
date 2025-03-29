import { Link } from 'react-router-dom';
import useFetch from '@hooks/useFetch.tsx';
import { UpdateFormData } from "./UpdateFormData.tsx";
import { League, User} from "@components/leagueObject.tsx";;
import Layout from '@layouts/Layout.tsx';
import convertDate from '@components/convertDate.tsx';



function Schedule() {
  
   
    const permission: string = User().role;
    const allowed: boolean = (permission == "SiteAdmin" || permission == "Admin") ? false : true;

    const { data, loading, error } = useFetch<UpdateFormData>(`${import.meta.env.VITE_SERVER_URL}api/schedules/${League().id}`);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error)
        return <p>Error: {error}</p>;  

    if (data) {
        
        SetSchedule();

        return (
            <Layout>
                <h3 id="tableLabel">Schedule for League {League().leagueName}</h3>
                <Link to="/League/Schedule/Create" hidden={allowed}>Add</Link>
                <table className="table table-striped" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>Game Date</th>
                            <th>Cancelled</th>
                            <th>Playoffs</th>
                            <td hidden={allowed}></td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item =>
                            <tr key={item.id}>
                                <td>{convertDate(item.gameDate)}</td>
                                <td>{item.cancelled ? "yes" : "no"}</td>
                                <td>{item.playOffs ? "yes" : "no"}</td>
                                <td hidden={allowed}><Link to="/League/Schedule/Update" state={item.id.toString()}>Update</Link>|
                                    <Link to="/League/Schedule/Delete" state={item.id.toString()}>Delete</Link>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
            </Layout>
        );
    }

    function SetSchedule(): void {
        localStorage.setItem('schedule', JSON.stringify(data));
    }
    

    
}

export default Schedule;