import { createSlice } from "@reduxjs/toolkit";
interface Channel {
    id: string;
    iconUrl: string;
    title: string;
    subscribers: number;
    videos: number;
    description: string;
    publishedAt: string;
}
const channel:Channel = {
    id: "", 
    iconUrl: "",
    title: "",
    subscribers: 0,
    videos: 0,
    description: "",
    publishedAt: "",
}

const channelSlice = createSlice({
    name: "channelDetails",
    initialState: {
        channel,
        isLoading: false,
        error: null,
    },
    reducers: {
        channelRequest: (state) => {
            return { ...state, isLoading: true };
        },
        channelSuccess: (state, action) => {
            return {
                ...state,
                isLoading: false,
                channel: action.payload,
            };
        },
       
    },
});

export const { channelRequest, channelSuccess } = channelSlice.actions;
export default channelSlice.reducer;
  
