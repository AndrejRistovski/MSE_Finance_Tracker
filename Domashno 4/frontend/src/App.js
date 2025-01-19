import './App.css';
import Navbar from "./navbar_components/Navbar";
import MainSection from './main_components/MainSection';
import Footer from "./main_components/Footer";

function App() {
    return (
        <div className="app">
            <Navbar/>
            <div>
                <MainSection/>
                <Footer/>
            </div>
        </div>
    );
}

export default App;