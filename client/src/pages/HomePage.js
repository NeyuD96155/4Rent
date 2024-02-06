import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import Guides from "../components/Guides";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";
import Search from "../components/SearchBar";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import {
    GettingStarted,
    ExchangeTimeshares,
    MaximizeVacation,
} from "../components/GuidesCom/GettingStarted";
import Payment from "../components/Payment";
import CancellationPolicy from "../components/policy/CancellationPolicy";
import Landing from "../components/Landing";
import PostDetail from "../components/PostDetail";
import News from '../components/News';
function Homepage() {
    return (
        <Router>
            <NavigationBar />
            <Routes>
     
                <Route path="/payment" element={<Payment />} />
                <Route
                    path="/cancellation-policy"
                    element={<CancellationPolicy />}
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/news" element={<News />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/search" element={<Search />} />

                <Route path="/getting-started" element={<GettingStarted />} />
                <Route
                    path="/exchange-timeshares"
                    element={<ExchangeTimeshares />}
                />
                <Route path="/" element={<Landing />} />
                <Route
                    path="/maximize-vacation"
                    element={<MaximizeVacation />}
                />
                  <Route path="/detail/:id" element={<PostDetail />} />
                {/* Define other routes here */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default Homepage;
