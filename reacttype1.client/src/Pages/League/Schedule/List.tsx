import { Link } from 'react-router-dom';
import { UpdateFormData } from "./UpdateFormData.tsx";
import { League, User} from "@components/leagueObject.tsx";
import Layout from '@layouts/Layout.tsx';
import convertDate from '@components/convertDate.tsx';
import { useState, useEffect } from 'react';



function Schedule() {
    
    const [data, setData] = useState<UpdateFormData[]| null>(null);
    const [matches, setMatches] = useState<number | null>(null);

    const permission: string = User().role;
    const allowed: boolean = !((permission == "SiteAdmin" || permission == "Admin")&& matches == 0);
    const updateAllowed: boolean = !(permission == "SiteAdmin" || permission == "Admin");
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        if (data == undefined) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/schedules/${League().id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = (await response.json()) as UpdateFormData[];
                setData(json);

            } catch (error) {
                let message: string;
                if (error instanceof Error)
                    message = error.message
                else
                    message = String(error)
                setError(message);
            }
        }
    };

    const numberMatches = async () => {
        if (matches == undefined) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/matches/GetAllMatches/${League().id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = (await response.json()) as number;
                setMatches(json);

            } catch (error) {
                let message: string;
                if (error instanceof Error)
                    message = error.message
                else
                    message = String(error)
                setError(message);
            }
        }
    };

    useEffect(() => {
        fetchData();
        numberMatches();
    });


    const contents = (data === undefined || matches === undefined)
        ? <p><em>Loading ...</em></p>
        :
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Game Date</th>
                        <th>Cancelled</th>
                        <th>Playoffs</th>
                    <td hidden={updateAllowed}></td>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(item =>
                        <tr key={item.id}>
                            <td>{convertDate(item.gameDate)}</td>
                            <td>{item.cancelled ? "yes" : "no"}</td>
                            <td>{item.playOffs ? "yes" : "no"}</td>
                            <td hidden={updateAllowed}><Link to="/League/Schedule/Update" state={item.id.toString()}>Update</Link><span hidden={allowed}>|</span>
                                <Link to="/League/Schedule/Delete" state={item.id.toString()} hidden={allowed}>Delete</Link>
                            </td>

                        </tr>
                )}
                </tbody>
            </table>;
           
        return (
        <Layout>
            <h3 id="tableLabel">Schedule for League {League().leagueName}</h3>
                <Link to="/League/Schedule/Create" hidden={allowed}>Add</Link>
                {contents}
                <p>{error}</p>
            </Layout>
        );
 

    

    

    

    
}

export default Schedule;