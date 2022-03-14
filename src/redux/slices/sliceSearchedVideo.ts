import { createSlice } from "@reduxjs/toolkit";

const searchedVideoSlice = createSlice({
  name: "searchedVideo",
  initialState: {
    videos: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    searchedVideosRequest: (state) => {
      return { ...state, isLoading: true };
    },
    searchedVideosSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        videos: action.payload,
      };
    },
  },
});
export const { searchedVideosRequest, searchedVideosSuccess } =
  searchedVideoSlice.actions;
export default searchedVideoSlice.reducer;
