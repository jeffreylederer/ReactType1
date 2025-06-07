import LeagueClass from '@components/LeagueClass.tsx';;
import useFetchPDF from '@hooks/useFetchPDF'


function TeamReport() {
    const league = new LeagueClass();
    const { data, isLoading, error } = useFetchPDF(`${import.meta.env.VITE_SERVER_URL}api/Teams/TeamReport/${league.id}`);

    if (isLoading) {
        return;
    }
    if (error) {
        alert(`Error: ${error}`)
        return;
    }

    if (data === "") {
        alert(`Error: No PDF generated`);
        return;
    }

    return (
        <embed src={data} type="application/pdf" width = '1000' height = '800' />
       
    );
}



export default TeamReport;