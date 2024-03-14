import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import Blog from "./components/Blog";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Insurance from "./components/Insurance";
import NavigationBar from "./components/Navbar";
import Policy from "./components/Policy";
import Privacy from "./components/Privacy";
import ReportError from "./components/ReportError";
import Rules from "./components/Rules";
import SearchBar from "./components/SearchBar";
import {
    ExchangeTimeshares,
    GettingStarted,
    MaximizeVacation,
} from "./components/guide/GettingStarted";
import CancellationPolicy from "./components/policy/CancellationPolicy";
import { AuthProvider } from "./context/AuthContext ";
import AboutUs from "./pages/AboutUs";
import AccessDeniedPage from "./pages/AccessDenied";
import Booking from "./pages/Booking";
import BookingHistory from "./pages/BookingHistory";
import ContactPage from "./pages/Contact";
import DashBoard from "./pages/Dashboard";
import DiscountDetail from "./pages/DiscountDetail";
import DiscountForm from "./pages/DiscountForm";
import { DiscountShow } from "./pages/DiscountShow";
import EstateDetail from "./pages/EstateDetail";
import EstateForm from "./pages/EstateForm";
import EstateShow from "./pages/EstateShow";
import Guides from "./pages/Guides";
import Landing from "./pages/Landing";
import News from "./pages/News";
import PaymentPage from "./pages/Payment";
import ProfilePage from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Success from "./pages/Success";
import PrivateRoute from "./components/PrivateRoute";
import UserEstate from "./pages/UsersEstate";
import { NonAuthorize } from "./pages/NonAuthorize";
import WalletPage from "./pages/Wallet";

function LayoutWrapper() {
    const location = useLocation();
    const isDashboard = location.pathname.startsWith("/dash-board");
    return (
        <>
            {!isDashboard && <NavigationBar />}
            <Routes>
                <Route path="/payment" element={<PaymentPage />} />
                <Route
                    path="/cancellation-policy"
                    element={<CancellationPolicy />}
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/news" element={<News />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/contact" element={<ContactPage />} />
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
                <Route path="show-discount" element={<DiscountShow />}></Route>
                <Route
                    path="/show-discount/detail/:discountId"
                    element={<DiscountDetail />}
                />
                <Route path="/form-discount" element={<DiscountForm />} />

                <Route
                    path="/booking/:id"
                    element={
                        <PrivateRoute>
                            <Booking />
                        </PrivateRoute>
                    }
                />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/wallet" element={<WalletPage />} />
                <Route path="/policy" element={<Policy />} />
                <Route path="/booking-history" element={<BookingHistory />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/reporterror" element={<ReportError />} />
                <Route path="/insurance" element={<Insurance />} />
                <Route path="/search" element={<SearchBar />} />
                <Route path="/success" element={<Success />} />
                <Route path="/access-denied" element={<AccessDeniedPage />} />

                <Route
                    path="/dash-board"
                    element={
                        <PrivateRoute>
                            <DashBoard />
                        </PrivateRoute>
                    }
                />
                <Route path="/show-estate" element={<EstateShow />} />
                <Route
                    path="/estate-form"
                    element={
                        <PrivateRoute>
                            <EstateForm />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/users-estate"
                    element={
                        <PrivateRoute>
                            <UserEstate />
                        </PrivateRoute>
                    }
                />
                <Route path="/non-authorize" element={<NonAuthorize />} />
                <Route
                    path="/showEstateDetail/:id"
                    element={<EstateDetail />}
                />
            </Routes>
            {!isDashboard && <Footer />}
        </>
    );
}
function App() {
    return (
        <AuthProvider>
            <Router>
                <LayoutWrapper />
            </Router>
        </AuthProvider>
    );
}

export default App;
