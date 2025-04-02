import Layout from "@layouts/Layout.tsx";
import { SiteInfoType } from './SiteInfoType.ts';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Contact = () => {
    const [data, setData] = useState<SiteInfoType>();

    useEffect(() => {
        GetData();
    });

    const contents = data === undefined
        ? <p><em>Loading ...</em></p>
    :
        <>
            <h3 style={{ textAlign: 'center' }}>Contact</h3>

            <p style={{ width: '100%', textAlign: 'left' }}>This application is supported by Jeffrey Lederer.
                The source code depository for this application as at <a href="https://github.com/jeffreylederer/ReactType1" target="blank">https://github.com/jeffreylederer/ReactType1</a>
            </p>

            <p style={{ width: '100%', textAlign: 'left' }}>
                <address>
                    <strong>Support:</strong>   <a href={`mailto:${data.contact}`}>{data.contact}</a><br />
                </address>   </p>
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

export default Contact;