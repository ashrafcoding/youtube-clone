import { createSlice } from "@reduxjs/toolkit";
const subscriptionSlice = createSlice({
    name: "subscription",
    initialState: {
        isLoading: false,
        error: null,
        subscribed: false,
    },
    reducers: {
        subscriptionRequest: (state) => {
            return { ...state, isLoading: true };
        },
        subscriptionSuccess: (state, action) => {
            return {
                ...state,
                isLoading: false,
                subscribed: action.payload,
            };
        },
        subscriptionFailed: (state, action) => {
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        }
    },
});
export const { subscriptionRequest, subscriptionSuccess, subscriptionFailed } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
