import LeagueClass from "@components/LeagueClass.tsx";
import Layout from '@layouts/Layout.tsx';
import useFetch from '@hooks/useFetch.tsx';

const CreateMatches = () => {
   
    const league = new LeagueClass();
    const { data, isLoading, error } = useFetch<string>(`/api/Matches/CreateSchedule/${league.id}`);
    if (isLoading)
        return <p aria-label="Loading">Loading...</p>;

    if (error)
        return <p aria-label="Error">Return Error: {error}</p>;
    return (
        <Layout>
            <h3>Create Schedule</h3>
            <p style={{ textAlign: "center" }}>{data}</p>
        </Layout>
    );

   
}

export default CreateMatches;