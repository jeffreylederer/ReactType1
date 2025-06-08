import useFetchPDF from '@hooks/useFetchPDF';
import LeagueClass from "@components/LeagueClass.tsx";


function ScheduleReport() {
    const league = new LeagueClass();
    const { data, isLoading, error } = useFetchPDF(`/api/Matches/ScheduleReport/${league.id}`);

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
            <embed src={data} type="application/pdf" width='1000' height='800' />
        );
  
}



export default ScheduleReport;