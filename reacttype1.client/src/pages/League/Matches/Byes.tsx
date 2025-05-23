import LeagueClass from "@components/LeagueClass.tsx";
import useFetchPDF from '@hooks/useFetchPDF';

function Standings() {
   
    const league = new LeagueClass();
    const { data, loading, error } = useFetchPDF(`${import.meta.env.VITE_SERVER_URL}api/Matches/Byes/${league.id}`);

    if (loading) {
        return;
    }
    if (error) {
        alert(`Error: ${error}`)
        return;
    }

    if (data==="") {
        alert(`Error: No PDF generated`);
        return;
    }

    return (
        <embed src={data} type="application/pdf" width='1000' height='800' />

    );
  
}



export default Standings;