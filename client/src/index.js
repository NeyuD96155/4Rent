import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext ";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import ScrollToTop from "react-scroll-to-top";

const root = ReactDOM.createRoot(document.getElementById("root"));
function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}
root.render(
    <React.StrictMode>
        <AuthProvider>
            <ScrollToTop smooth color="#000" top={100} height={50} width={50} />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Provider store={store}>
                <App />
            </Provider>
        </AuthProvider>
        <ScrollToTopOnMount />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
