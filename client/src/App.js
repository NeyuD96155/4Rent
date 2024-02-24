// import Homepage from "./pages/HomePage";
// import { AuthProvider } from './context/AuthContext '
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// ... import other pages
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, incrementByAmount } from "./redux/features/counterSlice";
function App() {
    // lấy giá trị trên store sử dụng use selector
    const counter = useSelector((store) => store.counter.value);
    const dispatch = useDispatch();

    // tương tác với giá trị trên store => dispatch action
    return (
        //     <AuthProvider>
        //    {/* <ToastContainer/> */}
        //    <Homepage/>
        //    </AuthProvider>
        <>
            <h1>{counter}</h1>
            <button
                onClick={() => {
                    dispatch(increment());
                }}
            >
                increment
            </button>
            <button
                onClick={() => {
                    dispatch(decrement());
                }}
            >
                decrement
            </button>
            <button
                onClick={() => {
                    dispatch(incrementByAmount(5));
                }}
            >
                +1 đống 
            </button>
        </>
    );
}

export default App;
