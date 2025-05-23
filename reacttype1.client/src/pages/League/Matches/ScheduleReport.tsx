import useFetchPDF from '@hooks/useFetchPDF';
import LeagueClass from "@components/LeagueClass.tsx";


function ScheduleReport() {
    const league = new LeagueClass();
    const { data, loading, error } = useFetchPDF(`${import.meta.env.VITE_SERVER_URL}api/Matches/ScheduleReport/${league.id}`);

    if (loading) {
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
    else {
        console.log("got data");
        if (data.indexOf("Exception: ",0) != -1) {
            return (
                <p>{data} </p>
            );
        }


        return (
            <embed src={data} type="application/pdf" width='1000' height='800' />
        );
    }
}



export default ScheduleReport;