import Layout from "@layouts/Layout.tsx";
import { SiteInfoType } from './SiteInfoType.ts';
import axios from 'axios';
import { useEffect, useState } from 'react';



const About = () => {
    const [data, setData] = useState<SiteInfoType>();

    useEffect(() => {
        GetData();
    });


    const contents = data === undefined
        ? <p><em>Loading ...</em></p>
        :
        <>

            <h3 style={{ textAlign: 'center' }}>About</h3>

            <p style={{ width: '100%', textAlign: 'left' }}>This application is used to track leagues at
                the {data.clubname}</p>

            <p style={{ width: '100%', textAlign: 'left' }}>The FPLBC website is <a href="http://lawnbowlingpittsburgh.org">http://lawnbowlingpittsburgh.org</a></p>
        </>;

    return (
        <Layout>
            {contents}
        </Layout>
    );

    function GetData() {
        axios.get(import.meta.env.VITE_SERVER_URL + "api/home")
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}



export default About;