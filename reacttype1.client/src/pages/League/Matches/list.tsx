import { useState, useEffect  } from 'react';
import  MatchFormData  from "./MatchFormData.tsx";
import axios from "axios";
import { UpdateFormData } from "../Schedule/UpdateFormData.tsx";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Layout from '@layouts/Layout.tsx';
import uparrow from '@images/uparrow.png';
import convertDate from '@components/convertDate.tsx';
import LeagueClass from "@components/LeagueClass";
import UserClass from "@components/UserClass";
import useFetch from '@hooks/useFetch.tsx';


function Matches() {
    const user = new UserClass();
    const league = new LeagueClass();
    const [match, setMatch] = useState<MatchFormData[] | null>();
    const permission: string = user.role;
    const allowed: boolean = (permission == "SiteAdmin" || permission == "Admin" || permission == "Scorer") ? false : true;
    const admin: boolean = (permission == "SiteAdmin" || permission == "Admin" )? false : true;
    
    
    const location = useLocation();
    const id:string = location.search.substring(4);
    const [weekid, setWeekid] = useState(+id);
    const standingUrl: string = "/League/Matches/Standings?id=".concat(weekid.toString());
    const scoreUrl: string = "/league/matches/ScoreCard?id=".concat(weekid.toString());

    useEffect(() => {

        GetData(weekid);

    }, [weekid]);

    const { data, isLoading, error } = useFetch <UpdateFormData[]>(`/api/Schedules/${league.id}`);

    if (error)
        return (
            <Layout>
                <h3>Update membership record</h3>
                {error}
            </Layout>
        );

    if (isLoading)
        return (
            <Layout>
                <h3>Update membership record</h3>
                <p>Loading...</p>
            </Layout>
        );


   

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        //event.preventDefault();
        const value = event.target.value;
        setWeekid(+value);
       
    };

    async function GetData(weekid: number | null) {
        setMatch(null);
        if (weekid !== undefined && weekid != 0) {
            try {
                const response = await fetch(`/api/matches/${weekid}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = (await response.json()) as MatchFormData[];
                setMatch(json);
                localStorage.setItem("matches", JSON.stringify(json));
            } catch (error) {
                let message: string;
                if (error instanceof Error)
                    message = error.message
                else
                    message = String(error)
                console.log(message);
            }
        }
        
            
    }

    const Reorder =  (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        const id: string = button.name;
        const url: string = "/api/Matches/Reorder".concat(id);
        axios.get(url)
            .then(response => {
                GetData(weekid);
                console.log(response.data);

            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    };


    if ((match === null || (Array.isArray(match) && match.length === 0)) && (data && Array.isArray(data) && data.length>0))
        return (
            <Layout>
                <h3>Games in {league.leagueName} league</h3>
                <div className="toLeft">
                    <p className="toLeft">Date: <select onChange={selectChange} defaultValue={weekid}>
                        <option value="0" key="0" disabled>Select date</option>
                        {data?.map(item =>
                            <option key={item.id} value={item.id.toString()}>{convertDate(item.gameDate)}</option>
                        )};
                    </select><br />
                        <a href={standingUrl} target='blank' hidden={weekid == 0}>This week's standings report</a><br />
                        <a href={scoreUrl} target='blank' hidden={weekid == 0}>This week's score card</a>
                    </p>
                </div>
               
            </Layout>
        );

    if (match === null || (Array.isArray(match) && match.length === 0))
        return (
            <Layout>
                <h3>Games in {league.leagueName} league</h3>
                 <p>No matches created</p>
            </Layout>
        );


        return(
        <Layout>
        <h3>Games in {league.leagueName} league</h3>
                <div className="toLeft">
                    <p className="toLeft">Date: <select onChange={selectChange} defaultValue={weekid}>
                        <option value="0" key="0" disabled>Select date</option>
                        {data?.map(item =>
                            <option key={item.id} value={item.id.toString()}>{convertDate(item.gameDate)}</option>
                        )};
                    </select><br />
                        <a href={standingUrl} target='blank' hidden={weekid == 0}>This week's standings report</a><br />
                        <a href={scoreUrl} target='blank' hidden={weekid == 0}>This week's score card</a>
                    </p>
                </div>
                <table className="table table-striped" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th hidden={admin}>
                                Exchange Rink
                            </th>
                            <th>
                                Game Date
                            </th>
                            <th>
                                Rink
                            </th>

                            <th style={{ textAlign: "center" }}>
                                Team 1
                            </th>
                            <th style={{ textAlign: "center" }}>
                                Team 2
                            </th>
                            <th >
                                Team 1 Score
                            </th>
                            <th >
                                Team 2 Score
                            </th>
                            <th >
                                Team Forfeiting
                            </th>

                            <th hidden={allowed}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {match?.map(item =>
                            <tr key={item.id}>
                                <td hidden={admin}><button hidden={item.rink == 0} onClick={Reorder} name={item.id.toString()} style={{ backgroundColor: 'white' }}><img src={uparrow} /></button></td>

                                <td>{convertDate(item.gameDate)}</td>
                                <td>{item.rink + 1}</td>
                                <td style={{ color: item.wheelchair1, textAlign: "left" }} >
                                    {item.team1No} ({item.team1})</td>

                                <td style={{ color: item.wheelchair2, textAlign: "left" }} >
                                    {item.team2No} ({item.team2})</td>

                                <td style={{ textAlign: 'center' }} >{item.forFeitId != 0 ? '' : item.team1Score}</td>
                                <td style={{ textAlign: 'center' }} >{item.forFeitId != 0 ? '' : item.team2Score}</td>
                                <td style={{ textAlign: 'center' }} >{item.forFeitId == 0 ? '' : item.forFeitId}</td>



                                <td hidden={allowed} ><Link to="/League/Matches/Update" state={item.id.toString()}>Score</Link></td>

                            </tr>
                        )}
                    </tbody>
                </table>
                <p style={{ color: 'red', textAlign: 'left' }} hidden={weekid == 0}>Teams with wheel chair members are in red</p>
               
        
         </Layout>
    );
   
    
   
    

    

}

export default Matches;