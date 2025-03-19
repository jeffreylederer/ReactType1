import { League } from "@components/leagueObject.tsx";;
import useFetchPDF from '@hooks/useFetchPDF'


function TeamReport() {
    const { data, loading, error } = useFetchPDF<string>(`${import.meta.env.VITE_SERVER_URL}api/Teams/TeamReport/${League().id}`);

    if (loading) {
        return;
    }
    if (error) {
        alert(`Error: ${error}`)
        return;
    }

    if (!data) {
        alert(`Error: No PDF generated`);
        return;
    }

    return (
        <embed src={data} type="application/pdf" width = '1000' height = '800' />
       
    );
}



export default TeamReport;