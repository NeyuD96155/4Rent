import Homepage from "./pages/HomePage";
import { AuthProvider } from "./context/AuthContext ";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { login, logout } from "./redux/features/authenSlice";

import { useDispatch, useSelector } from "react-redux";
// import { increment, decrement, incrementByAmount } from "./redux/features/counterSlice";
function App() {
    // lấy giá trị trên store sử dụng use selector
    // const counter = useSelector((store) => store.counter.value);
    // const dispatch = useDispatch();
    const counter = useSelector((store) => store.counter.value);
    const dispatch = useDispatch();
    const loginHandeler = async () => {
        const response = await axios.post("http://4rent.tech:8081/login", {
            username: "string",
            password: "string",
        });
        dispatch(login(response.data));
    };
    const logoutHandeler = async () => {
        dispatch(logout());
    };

    // tương tác với giá trị trên store => dispatch action
    return (
        <>
            <button onClick={loginHandeler}>Login</button>
            <button onClick={logoutHandeler}>LogOut</button>
            <AuthProvider>
                {/* <ToastContainer/> */}
                <Homepage />
            </AuthProvider>
        </>

        // <>
        //     <h1>{counter}</h1>
        //     <button
        //         onClick={() => {
        //             dispatch(increment());
        //         }}
        //     >
        //         increment
        //     </button>
        //     <button
        //         onClick={() => {
        //             dispatch(decrement());
        //         }}
        //     >
        //         decrement
        //     </button>
        //     <button
        //         onClick={() => {
        //             dispatch(incrementByAmount(5));
        //         }}
        //     >
        //         +1 đống
        //     </button>
        // </>
    );
}

export default App;
