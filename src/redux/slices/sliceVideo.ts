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
      const idList = state.homeVideos?.map((item: { id: string }) => item.id);
      const newList = action.payload.video.filter(
        (item: { id: string }) => !idList?.includes(item.id)
      );
      return {
        ...state,
        isLoading: false,
        homeVideos:
          state.activeCategory === action.payload.category
            ? [...state.homeVideos, ...newList]
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
