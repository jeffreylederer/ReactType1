import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function NotLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/Login");
    }, [navigate]);
    return (
        <></>
    );

}

export default NotLogin;