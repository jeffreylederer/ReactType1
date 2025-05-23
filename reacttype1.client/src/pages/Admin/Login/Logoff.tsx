import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import LeagueClass from "@components/LeagueClass";
import UserClass from "@components/UserClass";

function Logoff() {
    const navigate = useNavigate();
    
   

    useEffect(() => {
        const user = new UserClass();
        user.Remove();
        const league = new LeagueClass();
        league.Remove();
        navigate("/Login");
    }, [navigate ]);
    return (
        <></>
    );
}


export default Logoff