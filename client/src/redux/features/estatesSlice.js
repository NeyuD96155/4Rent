import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";

// Async thunk to fetch estates data
export const fetchEstates = createAsyncThunk(
    "estates/fetchEstates",
    async () => {
        const response = await api.get("/showEstate"); // Use the correct endpoint
        return response.data;
    }
);

// Async thunk to delete estate by ID
export const deleteEstate = createAsyncThunk(
    "estates/deleteEstate",
    async (estateId) => {
        await api.delete(`/deletedEstate/${estateId}`);
        return estateId;
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
                // Assuming the API returns an array of estates
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
            });
    },
});

export default estatesSlice.reducer;