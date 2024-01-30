import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import Guides from "../components/Guides";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";
import Search from "../components/Search";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
function Homepage() {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route path="/"/>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/search" element={<Search />} />
                {/* Define other routes here */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default Homepage;
