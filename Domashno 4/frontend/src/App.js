import './App.css';
import Navbar from "./navbar_components/Navbar";
import HeroSection from './main_components/HeroSection';
import Footer from "./main_components/Footer";

function App() {
    return (
        <div className="app">
            <Navbar/>
            <div>
                <HeroSection/>
                <Footer/>
            </div>
        </div>
    );
}

export default App;