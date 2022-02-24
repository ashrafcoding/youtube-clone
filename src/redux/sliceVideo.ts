import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    homeVideos: [],
    nextPageToken: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    homeVideosRequest: (state) => {
      return { ...state, isLoading: true };
    },
    homeVideosSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        homeVideos: action.payload.video,
        nextPageToken: action.payload.nextPageToken,
      };
    },
    homeVideosFail: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    },
  },
});
export default videoSlice.reducer;
export const { homeVideosRequest, homeVideosSuccess, homeVideosFail } =
  videoSlice.actions;