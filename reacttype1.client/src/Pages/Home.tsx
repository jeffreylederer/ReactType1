import { useEffect, useState } from 'react';
import axios from "axios";
import { LeagueType } from "../components/leagueObjectTypes.tsx";
import { setLeague, removeLeague } from "../components/leagueObject.tsx";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu.tsx";



function Home() {

    const [leagueList, setLeagueList] = useState<LeagueType[]>([]);
    const navigate = useNavigate();

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        //event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        const idValue: number = +button.name;
        const result = leagueList.filter(function (o: LeagueType) { return o.id == idValue; });
        if (result?.length == 1) {
            const data: LeagueType = result[0];
            setLeague(data);
            navigate("/Welcome")
        }
    };

    useEffect(() => {
        GetData();
        removeLeague();
    });

    const contents = leagueList === undefined
        ? <p><em>Loading ...</em></p>

        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>League Name</th>
                    <th>Active</th>
                    <th>Team Size</th>
                    <th>Divisions</th>
                    <th>Playoffs</th>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {leagueList.map(item =>
                    <tr key={item.id.toString()}>
                        <td>{item.leagueName}</td>
                        <td>{item.teamSize}</td>
                        <td>{item.divisions}</td>
                        <td>{item.playOffs ? "Yes" : "No"}</td>
                        <td><button onClick={buttonHandler} className="button" name={item.id.toString()}>
                            select
                        </button>
                        </td>

                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h3 id="tableLabel">Select League</h3>
            <Menu/>
            {contents}
           
        </div>
    );

   



    async function GetData() {
        axios.get(import.meta.env.VITE_SERVER_URL + "api/leagues")
            .then(response => {
                const values = response.data as LeagueType[];
                const results = values.filter(x => x.active) as LeagueType[];
                setLeagueList(results);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }


}

export default Home;