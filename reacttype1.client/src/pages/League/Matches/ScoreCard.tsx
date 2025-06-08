import useFetchPDF from '@hooks/useFetchPDF';
import { useLocation} from "react-router-dom";


function ScoreCard() {
    const location = useLocation();
    const id: string = location.search.substring(4);




    const { data, isLoading, error } = useFetchPDF(`/api/Matches/ScoreCard/${id}`);

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



export default ScoreCard;