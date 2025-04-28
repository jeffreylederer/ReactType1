import useFetch from '@hooks/useFetch.tsx';;
import { LeagueType } from "@components/leagueObjectTypes.tsx";
import { SetLeague, RemoveLeague } from "@components/leagueObject.tsx";
import { useNavigate } from "react-router-dom";
import Layout from "@layouts/Layout.tsx";
import { IsUserNull } from '@components/leagueObject.tsx';




function Home() {

    const navigate = useNavigate();
    if (IsUserNull()) {
        navigate("/Login");
    }
    const { data, loading, error } = useFetch<LeagueType>(`${import.meta.env.VITE_SERVER_URL}api/leagues`);
   

    const selected = (data: LeagueType) => {

        SetLeague(data);
        navigate("/Welcome");
    }
    
    
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error)
        return <p>Error: {error}</p>;

    if (!data)
        return (

            <Layout>
                <h3 id="tableLabel">Select League</h3>
                <p>No leagues specified</p>
            </Layout>
        )
    else {
        const leagues: LeagueType[] = data.filter((word) => word.active)
        RemoveLeague();
        return (
            <Layout>
                <h3 id="tableLabel">Select League</h3>
                <table className="table table-striped" aria-labelledby="tableLabel">
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
                        {leagues.map(data =>
                            <tr key={data.id.toString()}>
                                <td>{data.leagueName}</td>
                                <td>{data.teamSize}</td>
                                <td>{data.divisions}</td>
                                <td>{data.playOffs ? "Yes" : "No"}</td>
                                <td><button onClick={()=>selected(data)} >
                                    select
                                </button>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>

            </Layout>
        );
    }
   
   
}


export default Home;