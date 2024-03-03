import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import Guides from "../pages/Guides";
import Contact from "../pages/Contact";
import AboutUs from "../pages/AboutUs";

import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import {
    GettingStarted,
    ExchangeTimeshares,
    MaximizeVacation,
} from "../components/guide/GettingStarted";
import Payment from "./Payment";
import CancellationPolicy from "../components/policy/CancellationPolicy";
import PostDetail from "../pages/PostDetail";
import News from "../pages/News";
import Landing from "../pages/Landing";
import Post from "../pages/Post";
import Estate from "../pages/Estate";
import Booking from "../pages/Booking";
import Profile from "../pages/Profile";
import Policy from "../components/Policy";
import Faq from "../components/Faq";
import Privacy from "../components/Privacy";
import Rules from "../components/Rules";
import Blog from "../components/Blog";
import ReportError from "../components/ReportError";
import Insurance from "../components/Insurance";

import BookingHistory from "../pages/BookingHistory";
import ShowEstate from "./EstateDetail";
import SearchBar from "../components/SearchBar";
import PrivateRoute from "../components/PrivateRoute";
import DashBoard from "./Dashboard";
import AccessDeniedPage from "./AccessDenied";

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
                <Route path="/post/detail/:postId" element={<PostDetail />} />
                <Route path="/post" element={<Post />} />
                <Route path="/estate" element={<Estate />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/policy" element={<Policy />} />
                <Route path="/booking-history" element={<BookingHistory />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/reporterror" element={<ReportError />} />
                <Route path="/insurance" element={<Insurance />} />
                <Route path="/search" element={<SearchBar />} />
                <Route path="/access-denied" element={<AccessDeniedPage />} />
                <Route
                    path="/dash-board"
                    element={
                        <PrivateRoute>
                            <DashBoard />
                        </PrivateRoute>
                    }
                />
                <Route path="/ShowEstate" element={<ShowEstate />} />
            </Routes>
            <Footer />

        </Router>
        
    );
}

export default Homepage;
