import { useState, useEffect  } from 'react';
import  MatchFormData  from "./MatchFormData.tsx";
import axios from "axios";
import { UpdateFormData } from "../Schedule/UpdateFormData.tsx";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { User, League } from '@components/leagueObject.tsx';
import Layout from '@layouts/Layout.tsx';
import uparrow from '@images/uparrow.png';
import convertDate from '@components/convertDate.tsx';


function Matches() {
    const [match, setMatch] = useState<MatchFormData[]>();
    const permission: string = User().role;
    const allowed: boolean = (permission == "SiteAdmin" || permission == "Admin" || permission == "Scorer") ? false : true;
    const admin: boolean = (permission == "SiteAdmin" || permission == "Admin" )? false : true;
    
    const [schedule, setSchedule] = useState<UpdateFormData[]>();
    const location = useLocation();
    const id:string = location.search.substring(4);
    const [weekid, setWeekid] = useState(+id);
    const standingUrl: string = "/League/Matches/Standings?id=".concat(weekid.toString());
    const scoreUrl: string = "/league/matches/ScoreCard?id=".concat(weekid.toString());
   

    useEffect(() => {

        
        if (weekid !== undefined && weekid != 0)
            GetData(weekid);
        else
            GetDates();
    },[weekid]);

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        //event.preventDefault();
        const value = event.target.value;
        setWeekid(+value);
       
    };

    async function GetData(weekid: number) {
        const url: string = import.meta.env.VITE_SERVER_URL+"api/matches/".concat(weekid.toString());
        axios.get(url)
            .then(response => {

                setMatch(response.data);
                GetDates();
                localStorage.setItem("matches", JSON.stringify(response.data));

            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

    const Reorder =  (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        const id: string = button.name;
        const url: string = import.meta.env.VITE_SERVER_URL+"api/Matches/Reorder".concat(id);
        axios.get(url)
            .then(response => {
                GetData(weekid);
                console.log(response.data);

            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    };

    const contents = schedule === undefined
        ? <p><em>Loading ...</em></p>
        :
        <>
        <div className="toLeft">
            <p className="toLeft">Date: <select onChange={selectChange} defaultValue={weekid}>
                <option value="0" key="0" disabled>Select date</option>
                {schedule?.map(item =>
                    <option key={item.id} value={item.id.toString()}>{convertDate(item.gameDate)}</option>
                )};
            </select><br/>
                    <a href={standingUrl} target='blank' hidden={weekid == 0}>This week's standings report</a><br/>
                    <a href={scoreUrl} target='blank' hidden={weekid == 0}>This week's score card</a>
               </p> 
            </div>
        </>;

    const matchcontents = match === undefined ? <p></p> :
            <>
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
                    {match.map(item =>
                        <tr key={item.id}>
                            <td hidden={admin}><button hidden={item.rink == 0} onClick={Reorder} name={item.id.toString()} style={{ backgroundColor: 'white' }}><img src={uparrow} /></button></td>
                            
                            <td>{ convertDate(item.gameDate)}</td>
                            <td>{item.rink+1}</td>
                            <td style={{ color: item.wheelchair1, textAlign: "right" }} >
                                {item.team1No} ({item.team1})</td>

                            <td style={{ color: item.wheelchair2, textAlign: "right" }} >
                                {item.team2No} ({item.team2})</td>

                            <td style={{ textAlign: 'center' }} >{item.forFeitId != 0? '' : item.team1Score}</td>
                            <td style={{ textAlign: 'center' }} >{item.forFeitId != 0 ? '': item.team2Score}</td>
                            <td style={{ textAlign: 'center' }} >{item.forFeitId == 0 ? '' : item.forFeitId}</td>

                            

                            <td hidden={allowed} ><Link to="/League/Matches/Update" state={item.id.toString()}>Score</Link></td>
                            
                        </tr>
                    )}
                </tbody>
            </table>
            <p style={{ color: 'red', textAlign: 'left' }} hidden={weekid == 0}>Teams with wheel chair members are in red</p>
        </>;   
        return(
        <Layout>
        <h3>Games in {League().leagueName} league</h3>
                {contents}
                {matchcontents}
               
        
         </Layout>
    );
   
    async function GetDates() {
        if (schedule === undefined) {
            const url: string = import.meta.env.VITE_SERVER_URL+"api/Schedules/".concat(League().id.toString());
            axios.get(url)
                .then(response => {
                    const weeks: UpdateFormData[] = response.data;
                    setSchedule(weeks.filter((item) => !item.playOffs));
  
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                })
        }
    }

   
    

    

}

export default Matches;