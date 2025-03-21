import { League } from "@components/leagueObject.tsx";
import useFetchPDF from '@hooks/useFetchPDF';

function Standings() {
   

    const { data, loading, error } = useFetchPDF(`${import.meta.env.VITE_SERVER_URL}api/Matches/Byes/${League().id}`);

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