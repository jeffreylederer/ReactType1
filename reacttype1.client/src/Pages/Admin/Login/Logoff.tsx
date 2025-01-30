import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { removeAll } from '../../../components/leagueObject.tsx';

function Logoff() {
    const navigate = useNavigate();
    
   

    useEffect(() => {
        removeAll();
        navigate("/Login");
    }, [navigate ]);
    return (
        <></>
    );
}


export default Logoff