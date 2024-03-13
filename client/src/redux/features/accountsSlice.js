import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";

export const deleteAccount = createAsyncThunk(
    "accounts/deleteAccount",
    async (accountId) => {
        const response = await api.delete(`/api/profile/${accountId}`);
        console.log(response);
        return accountId;
    }
);

export const fetchAccounts = createAsyncThunk(
    "accounts/fetchAccounts",
    async () => {
        const response = await api.get("/api");
        console.log(response);
        const accounts = response.data;
        return accounts;
    }
);

const initialState = {
    items: [],
    status: "idle",
    error: null,
};

const accountSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccounts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteAccount.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter(
                    (account) => account.id !== action.payload
                );
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default accountSlice.reducer;
