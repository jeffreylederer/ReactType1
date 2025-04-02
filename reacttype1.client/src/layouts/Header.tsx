import Menu from '@components/Menu.tsx';


const Header = () => {
    return (
        <header>
            <h3 style={{textAlign: "center"} }>{import.meta.env.VITE_SERVER_ClubName}</h3>
        <Menu/>
        </header>
    )
}

export default Header;