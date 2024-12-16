import './App.css';
import Navbar from "./navbar_components/Navbar";
import HeroSection from './navbar_components/HeroSection';

function App() {
    return (
        <div className="app">
            <Navbar/>
            <div>
                <HeroSection/>
            </div>
        </div>
    );
}

export default App;