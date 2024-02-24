import Homepage from "./pages/HomePage";
import { AuthProvider } from './context/AuthContext '
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// ... import other pages
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "./redux/features/counterSlice";
import axios from "axios";
import { login, logout } from "./redux/features/authenSlice";

function App() {

    const counter = useSelector((store) => store.counter.value); // lấy giá trị trên store =>  useSelector

    const dispatch = useDispatch(); // tương tác giá trị trên store => dispatch action

    const LoginHandler = async () => {
        const response = await axios.post("http://4rent.tech:8081/login", {
            username: "string",
            password: "string",
        });
        dispatch(login(response.data));
    }

    const LogoutHandler = async () => {
        dispatch(logout());
    }
    return (
        <>
            <button onClick={LoginHandler}>login</button>
            <button onClick={LogoutHandler}>Logout</button>

            <h1>{counter}</h1>
            <button onClick={() => {
                dispatch(increment());
            }}>increment</button>

            <button onClick={() => {
                dispatch(decrement());
            }}>decrement</button>

            <button onClick={() => {
                dispatch(incrementByAmount(5));
            }}>incrementByAmount</button>

            <AuthProvider>
                {/* <ToastContainer/> */}
                <Homepage />
            </AuthProvider>
        </>
    );
}

export default App;
