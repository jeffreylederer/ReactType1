import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { FormData } from "./FormData.tsx";
import axios from "axios";
import Menu from "../../components/Menu.tsx";
import {DeleteButton} from '../../components/Buttons.tsx';


const MembershipDelete = () => {
    const location = useLocation();
    const id: number = location.state;
    const [errorMsg, SeterrorMsg] = useState("");
    const [membership, setMembership] = useState<FormData>();

    
    const navigate = useNavigate();

    useEffect(() => {
        GetData();
    });

    const contents = membership === undefined
        ? <p><em>Loading ...</em></p> :
        
        <table>
            <tr>
                <td className="Label">First Name:</td>

                <td className="Field">{membership.firstName}</td>
            </tr>
            <tr>
                <td style={{ width: "200px" }}>Last Name:</td>
                <td className="Field">{membership.lastName}</td>
              
            </tr>
            <tr>
                <td style={{ width: "200px" }}>Short Name:</td>
                <td className="Field">{membership.shortname == null ? "" : membership.shortname}</td>
              </tr>
            <tr>
                <td style={{ width: "200px" }}>Wheel Chair:</td>
                <td className="Field">{membership.wheelchair?"Yes":"No"}</td>
            </tr>
            <tr>
                   <td colSpan={2}>

                    <DeleteButton DeleteItem={DeleteItem }/>
                </td>
            </tr>
        </table>
        
    return (
        <div>
        <Menu/>
        <h3>Delete Member</h3>
            {contents}
            <p className="errorMessage">{errorMsg}</p>
        </div>
    );

    async function GetData() {
        const url: string = import.meta.env.VITE_SERVER_URL+'api/Memberships/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {
                setMembership(response.data);
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    async function DeleteItem() {
        const url: string = import.meta.env.VITE_SERVER_URL+'api/Memberships/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.delete(fullUrl)
            .then(response => {
                console.log(response.statusText);
                navigate("/Membership");
            })
            .catch(error => {
                SeterrorMsg(error.response.data);
            })
    }
}


export default MembershipDelete;