import AccessDeniedPage from "./AccessDenied";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function Error() {
    <Route path="/access-denied" element={<AccessDeniedPage />} />;
    return (
        <Router>
            <Routes>
                <Route path="/access-denied" element={<AccessDeniedPage />} />
            </Routes>
        </Router>
    );
}

export default Error;
