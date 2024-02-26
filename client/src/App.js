import Homepage from "./pages/HomePage";
import { AuthProvider } from './context/AuthContext'

function App() {
    return (
        <AuthProvider>
       <Homepage/>
       </AuthProvider>
    );
}

export default App;
