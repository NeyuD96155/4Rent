import { configureStore } from '@reduxjs/toolkit';

import accountReducer from './features/accountsSlice';

export const store = configureStore({
  reducer: {
    accounts: accountReducer,
  },
})