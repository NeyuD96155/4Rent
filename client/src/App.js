import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import Guides from "./components/Guides";
import Contact from "./components/Contact";
import AboutUs from "./components/AboutUs";

// ... import other pages

function App() {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<NavigationBar/>} />
                <Route path="/guides" element={<Guides/>} />
                <Route path="/contact" element={<Contact/>} />
                <Route path="/about-us" element={<AboutUs/>} />
                {/* Define other routes here */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
