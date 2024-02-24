import {combineReducers} from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
const rootReducer =combineReducers({
    counter:counterSlice
});
export default rootReducer