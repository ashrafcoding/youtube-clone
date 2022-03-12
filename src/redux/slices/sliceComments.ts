import { createSlice } from "@reduxjs/toolkit";

const sliceComments = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    commentsRequest: (state) => {
      return { ...state, isLoading: true };
    },
    commentsSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        comments: action.payload,
      };
    },
  },
});
export const { commentsRequest, commentsSuccess } = sliceComments.actions;
export default sliceComments.reducer;
