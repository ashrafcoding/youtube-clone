import { createSlice } from "@reduxjs/toolkit";

const LikedVideosSlice = createSlice({
    name: "likedVideos",
    initialState: {
        videos: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        likedVideosRequest: (state) => {
            return { ...state, isLoading: true };
        },
        likedVideosSuccess: (state, action) => {
            return {
                ...state,
                isLoading: false,
                videos: action.payload,
            };
        }
    }
});

export default LikedVideosSlice.reducer;
export const { likedVideosRequest, likedVideosSuccess } = LikedVideosSlice.actions;
