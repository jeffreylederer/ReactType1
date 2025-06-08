import LeagueClass from "@components//LeagueClass.tsx";
import Layout from "@layouts/Layout.tsx";
import UserClass from "@components/UserClass";
import { SetCount } from '@components/CountMatches.tsx';
import useFetch from '@hooks/useFetch.tsx';


function Welcome() {
    const league = new LeagueClass();
    const user = new UserClass();

    const { data, isLoading, error } = useFetch<number>(`api/matches/GetAllMatches/${league.id}`);

    if (isLoading)
        return <p aria-label="Loading">Loading...</p>;

    if (error)
        return <p aria-label="Error">Return Error: {error}</p>;

    if(data != null) {
        SetCount(data);
        return (
            <Layout>

                <h3>Welcome to {league.leagueName}</h3>

                <div className="toLeft">
                    <h4>Current Role: {user.role} </h4>

                    <dl >
                        <dt>Observers</dt>
                        <dd>They can view all screens and reports in the league </dd>
                    </dl>
                    <dl >
                        <dt>Scorers</dt>
                        <dd>They can score matches and view all screens and reports in the league </dd>
                    </dl>
                    <dl >
                        <dt>League Administrators</dt>
                        <dd>They can edit the membership, players and schedule in the league, create and score matches </dd>
                    </dl>
                    <dl >
                        <dt>Site Administrators</dt>
                        <dd>They can be league administrator for any league and create leagues and users. </dd>
                    </dl>
                </div >
            </Layout>
        );

    }
}

export default Welcome;