import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import authenSlice from "./features/authenSlice";

const rootReducer = combineReducers({
    counter: counterSlice,
    authen: authenSlice
})
export default rootReducer