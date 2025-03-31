import { BrowserRouter } from 'react-router-dom';
import RouteMenu from "@components/Routes.tsx";
import './App.css';



function App() {
    return (
        <BrowserRouter>
            <RouteMenu />

        </BrowserRouter>

    );

}

export default App;