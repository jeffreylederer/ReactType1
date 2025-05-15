import Layout from "@layouts/Layout.tsx";



const About = () => {
    


   

    return (
        <Layout>
            <h3 style={{ textAlign: 'center' }}>About</h3>

            <p style={{ width: '100%', textAlign: 'left' }}>This application is used to track leagues for
                the {import.meta.env.VITE_SERVER_ClubName}</p>

            <p style={{ width: '100%', textAlign: 'left' }}>The club's website is <a href={import.meta.env.VITE_SERVER_Website}>{import.meta.env.VITE_SERVER_Website}</a></p>

            <p style={{ width: '100%', textAlign: 'left' }}>
                The source code depository for this application as at <a href="https://github.com/jeffreylederer/ReactType1" target="blank">https://github.com/jeffreylederer/ReactType1</a>
            </p>
        </Layout>
    );

}



export default About;