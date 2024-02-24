import Homepage from "./pages/HomePage";
import { AuthProvider } from './context/AuthContext '
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// ... import other pages
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "./redux/features/counterSlice";

function App() {
    // lấy giá trị trên store =>  useSelector
    const counter = useSelector((store) => store.counter.value);
    const dispatch = useDispatch();
    // tương tác giá trị trên store => dispatch action
    return (
        <>
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
