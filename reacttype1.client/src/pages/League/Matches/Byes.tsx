import LeagueClass from "@components/LeagueClass.tsx";
import useFetchPDF from '@hooks/useFetchPDF';

function Standings() {
   
    const league = new LeagueClass();
    const { data, isLoading, error } = useFetchPDF(`/api/Matches/Byes/${league.id}`);

    if (isLoading) {
        return;
    }
    if (error) {
        alert(`Error: ${error}`)
        return;
    }

    

    return (
        <embed src={!data ? 'No data generated' : data} type="application/pdf" width='1000' height='800' />

    );
  
}



export default Standings;