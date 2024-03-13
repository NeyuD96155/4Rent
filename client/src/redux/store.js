import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accountsSlice";
import transactionsReducer from "./features/transactionsSlice";
import authReducer from "./features/authSlice";
import estatesReducer from "./features/EstatesSlice";

export const store = configureStore({
    reducer: {
        accounts: accountReducer,
        transactions: transactionsReducer,
        auth: authReducer,
        estates: estatesReducer,
    },
});
