
import Menu from "../components/Menu.tsx";


const About = () => {
    return (
        <>
        <Menu/>
            <h3 style={{textAlign: 'center'} }>About</h3>

            <p style={{ width: '100%', textAlign: 'left' }}>This application is used to track leagues at
                the Frick Park Lawn Bowling Club.</p>

            <p style={{ width: '100%', textAlign: 'left' }}>The FPLBC website is <a href="http://lawnbowlingpittsburgh.org">http://lawnbowlingpittsburgh.org</a></p>
        </>
    );
}

export default About;