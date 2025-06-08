import Layout from "@layouts/Layout.tsx";
import { SiteInfoType } from './SiteInfoType.ts';
import useFetch from '@hooks/useFetch.tsx';

const Contact = () => {
    


    const { data, isLoading, error } = useFetch<SiteInfoType>(`/api/Home`);

    if (error)
        return (
            <Layout>
                <h3>Delete Member</h3>
                {error}
            </Layout>
        );

    if (isLoading)
        return (
            <Layout>
                <h3>Delete Member</h3>
                <p>Loading...</p>
            </Layout>
        );
   
   
    return (
        <Layout>
            <>
                <h3 style={{ textAlign: 'center' }}>Contact</h3>

                <p style={{ width: '100%', textAlign: 'left' }}>This application is supported by Jeffrey Lederer.
                    The source code depository for this application as at <a href="https://github.com/jeffreylederer/ReactType1" target="blank">https://github.com/jeffreylederer/ReactType1</a>
                </p>

                <p style={{ width: '100%', textAlign: 'left' }}>
                    <address>
                        <strong>Support:</strong>   <a href={`mailto:${data?.contact}`}>{data?.contact}</a><br />
                    </address>   </p>
            </>
        </Layout>
    );


    
}

export default Contact;