import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";

export const fetchTransactions = createAsyncThunk(
    "transactions/fetchTransactions",
    async () => {
        const response = await api.get("/transaction");
        return response.data;
    }
);

const initialState = {
    items: [],
    status: "idle",
    error: null,
};

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTransactions.pending, (state) => {
            state.status = "loading";
        });

        builder.addCase(fetchTransactions.fulfilled, (state, action) => {
            state.status = "success";
            state.items = action.payload;
        });

        builder.addCase(fetchTransactions.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        });
    },
});

export default transactionsSlice.reducer;
