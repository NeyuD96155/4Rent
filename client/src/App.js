
import Homepage from "./pages/HomePage";
import { AuthProvider } from './context/AuthContext '
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// ... import other pages

function App() {
    return (
        <AuthProvider>
       {/* <ToastContainer/> */}
       <Homepage/>
       </AuthProvider>
    );
}

export default App;
