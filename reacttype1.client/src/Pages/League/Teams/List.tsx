import { Link } from 'react-router-dom';
import { TeamMember } from "./TeamMember.tsx";
import { User, League } from "@components/leagueObject.tsx";
import Layout from '@layouts/Layout.tsx';
import { useState, useEffect } from 'react';
import './Teams.css';


function Teams() {
    const [data, setData] = useState<TeamMember[]| null>(null);
    const [matches, setMatches] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const permission: string = User().role;
    const updateAllowed: boolean = (permission == "SiteAdmin" || permission == "Admin"); 
    const allowed: boolean = updateAllowed &&  matches == 0;

    const fetchData = async () => {
        if (data == undefined) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/Teams/${League().id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = (await response.json()) as TeamMember[];
                setData(json);

            } catch (error) {
                let message: string;
                if (error instanceof Error)
                    message = error.message
                else
                    message = String(error)
                setError(message);
            }
        }
    };

    const numberMatches = async () => {
        if (matches == undefined) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/matches/GetAllMatches/${League().id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = (await response.json()) as number;
                setMatches(json);

            } catch (error) {
                let message: string;
                if (error instanceof Error)
                    message = error.message
                else
                    message = String(error)
                setError(message);
            }
        }
    };
    

    

    useEffect(() => {
        fetchData();
        numberMatches();
    });

    const contents = (data === undefined || matches === undefined)
        ? <p><em>Loading ...</em></p>
        :


        <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Team No</th>
                    <th>Skip</th>
                    <th hidden={League().teamSize < 3}>Vice Skip</th>
                    <th hidden={League().teamSize < 2}>Lead</th>
                    <th>Division</th>
                    <td hidden={allowed}></td>
                </tr>
            </thead>
            <tbody>
                {data && data.map(item =>
                    <tr key={item.id}>
                        <td>{item.teamNo}</td>
                        <td>{item.skip}</td>
                        <td hidden={League().teamSize < 3}>{item.viceSkip}</td>
                        <td hidden={League().teamSize < 2}>{item.lead}</td>
                        <td>{item.division}</td>
                        <td hidden={!updateAllowed}><Link to={`/league/Teams/Update?matches=${matches}`} state={item.id.toString()} >Update</Link><span hidden={!allowed}>|</span>
                            <Link hidden={!allowed} to={`/league/Teams/Delete/?id=${item.id}`} >Delete</Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;



        return (
            <Layout>
                <h3 id="tableLabel">Teams for League {League().leagueName}</h3>
                <Link to="/league/Teams/Create" hidden={!allowed}>Add</Link><br/>
                <Link to="/league/Teams/Report" target="blank">Teams Report</Link>
                {contents}
                <p>Number of Teams: {data?.length}</p>
                <p>{error}</p>
            </Layout>
        );

   
}

    

export default Teams;