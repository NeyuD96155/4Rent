import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './features/accountsSlice';
import authReducer from './features/authSlice';
export const store = configureStore({
  reducer: {
    accounts: accountReducer,
    auth: authReducer,
  },
})