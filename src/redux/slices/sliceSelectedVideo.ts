import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  video: null | {
    id: string;
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    etag: string;
    duration: string;
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
    iconUrl: string;
    subscriper: string;
  };
  isLoading: boolean;
  error: string | null;
}
const initialState: InitialState = {
  video: null,
  isLoading: false,
  error: null,
};

const selectedVideoSlice = createSlice({
  name: "selectedVideo",
  initialState,
  reducers: {
    selectedVideoRequest: (state) => {
      return { ...state, isLoading: true };
    },
    selectedVideoSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        video: action.payload.video,
      };
    },
  },
});

export default selectedVideoSlice.reducer;
export const { selectedVideoRequest, selectedVideoSuccess } =
  selectedVideoSlice.actions;
