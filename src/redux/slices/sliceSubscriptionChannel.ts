import { createSlice } from "@reduxjs/toolkit";
const subscriptionChannels = createSlice({
    name: "subscriptionChannels",
    initialState: {
        isLoading: false,
        error: null,
        channels: [],
    },
    reducers: {
        subscriptionChannelsRequest: (state) => {
            return { ...state, isLoading: true };
        },
        subscriptionChannelsSuccess: (state, action) => {
            return {
                ...state,
                isLoading: false,
                channels: action.payload,
            };
        }
    },
});
export const { subscriptionChannelsRequest, subscriptionChannelsSuccess } = subscriptionChannels.actions;
export default subscriptionChannels.reducer;