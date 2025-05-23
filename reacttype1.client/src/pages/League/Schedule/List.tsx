import { Link } from 'react-router-dom';
import { UpdateFormData } from "./UpdateFormData.tsx";
import LeagueClass from "@components/LeagueClass";
import UserClass from "@components/UserClass";
import Layout from '@layouts/Layout.tsx';
import convertDate from '@components/convertDate.tsx';
import { useState, useEffect } from 'react';



function Schedule() {
    const user = new UserClass();
    const league = new LeagueClass();
    const [data, setData] = useState<UpdateFormData[]| null>(null);
    const [matches, setMatches] = useState<number | null>(null);

    const permission: string = user.role;
    const updateAllowed: boolean = (permission == "SiteAdmin" || permission == "Admin");
    const allowed: boolean =  updateAllowed && matches == 0;
    
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        if (data == undefined) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/schedules/${league.id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = (await response.json()) as UpdateFormData[];
                setData(json);
                localStorage.setItem("schedule", JSON.stringify(json));
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

    }, []);

    const numberMatches = async () => {
        if (matches == undefined) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/matches/GetAllMatches/${league.id}`);
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
                            <td hidden={!updateAllowed}><Link to={`/league/schedule/Update?matches=${matches}`} state={item.id.toString()} >Update</Link><span hidden={!allowed}>|</span>
                                <Link to="/League/Schedule/Delete" state={item.id.toString()} hidden={!allowed}>Delete</Link>
                            </td>

                        </tr>
                )}
                </tbody>
            </table>;
           
        return (
        <Layout>
            <h3 id="tableLabel">Schedule for League {league.leagueName}</h3>
                <Link to="/League/Schedule/Create" hidden={!allowed}>Add</Link>
                {contents}
                <p>{error}</p>
            </Layout>
        );
 

    

    

    

    
}

export default Schedule;