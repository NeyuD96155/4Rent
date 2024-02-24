import { createSlice } from '@reduxjs/toolkit'

const initialState = null;

export const authenSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   login:(store,action)=>{
    const userData=action.payload;
    store = userData;
    return store;
   },
   logout:(store,action)=>{
    const userData=action.payload;
    store = userData;
    return null;
   },
  },
});

// Action creators are generated for each case reducer function
export const { login,logout } = authenSlice.actions;

export default authenSlice.reducer;