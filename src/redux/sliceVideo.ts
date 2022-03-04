import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  homeVideos: [];
  nextPageToken: string | null;
  activeCategory: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  homeVideos: [],
  nextPageToken: null,
  activeCategory: "All",
  isLoading: false,
  error: null,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    homeVideosRequest: (state) => {
      return { ...state, isLoading: true };
    },
    homeVideosSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        homeVideos:
          state.activeCategory === action.payload.category
            ? [...state.homeVideos, ...action.payload.video]
            : action.payload.video,
        nextPageToken: action.payload.nextPageToken,
        activeCategory: action.payload.category,
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
