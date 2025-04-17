import useFetchPDF from '@hooks/useFetchPDF';
import { League } from "@components/leagueObject.tsx";


function ScheduleReport() {
    const { data, loading, error } = useFetchPDF(`${import.meta.env.VITE_SERVER_URL}api/Matches/ScheduleReport/${League().id}`);

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