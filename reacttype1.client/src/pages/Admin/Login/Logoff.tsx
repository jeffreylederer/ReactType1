import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { RemoveAll } from '@components/leagueObject.tsx';

function Logoff() {
    const navigate = useNavigate();
    
   

    useEffect(() => {
        RemoveAll();
        navigate("/Login");
    }, [navigate ]);
    return (
        <></>
    );
}


export default Logoff