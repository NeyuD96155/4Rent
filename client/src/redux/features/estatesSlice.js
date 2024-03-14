import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";

// Async thunk to fetch estates data
export const fetchEstates = createAsyncThunk(
    "estates/fetchEstates",
    async () => {
        const response = await api.get("/showEstate");
        return response.data;
    }
);

// Async thunk to delete estate by ID
export const deleteEstate = createAsyncThunk(
    "estates/deleteEstate",
    async (estateId) => {
        await api.put(`/deletedEstate/${estateId}`);
        return { estateId, estateStatus: "DELETED" };
    }
);

// Async thunk to reject estate by ID
export const rejectEstate = createAsyncThunk(
    "estates/rejectEstate",
    async (estateId) => {
        await api.put(`/authorizeReject/${estateId}`);
        return { estateId, estateStatus: "REJECTED" };
    }
);

// Async thunk to approve estate by ID
export const approveEstate = createAsyncThunk(
    "estates/approveEstate",
    async (estateId) => {
        await api.put(`/authorizeApprove/${estateId}`);
        // Update estateStatus to "APPROVED" locally
        return { estateId, estateStatus: "APPROVED" };
    }
);

// Initial state for the estates slice
const initialState = {
    estates: [],
    status: "idle", // 'idle' | 'loading' | 'success' | 'error'
    error: null,
};

// Creating the estates slice
const estatesSlice = createSlice({
    name: "estates",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEstates.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchEstates.fulfilled, (state, action) => {
                state.status = "success";
                state.estates = action.payload;
            })
            .addCase(fetchEstates.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            })
            .addCase(deleteEstate.fulfilled, (state, action) => {
                state.estates = state.estates.filter(
                    (estate) => estate.id !== action.payload
                );
            })
            .addCase(rejectEstate.fulfilled, (state, action) => {
                // Handle the state update for rejecting an estate
            })
            .addCase(approveEstate.fulfilled, (state, action) => {
                // Handle the state update for approving an estate
            });
    },
});

export default estatesSlice.reducer;
