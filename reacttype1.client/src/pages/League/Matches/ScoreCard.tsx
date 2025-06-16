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

    

    return (
        <embed src={!data  ? 'No data generated' : data} type="application/pdf" width='1000' height='800' />

    );
}



export default ScoreCard;