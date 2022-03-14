import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/sliceAuth";
import videoReducer from "./slices/sliceVideo";
import selectedVideoSlice from "./slices/sliceSelectedVideo";
import channelSlice from "./slices/sliceChannel";
import subscriptionSlice from "./slices/sliceSubscription";
import commentsSlice from "./slices/sliceComments";
import searchedVideoSlice from "./slices/sliceSearchedVideo";

const store = configureStore({
  reducer: {
    auth: authReducer,
    videos: videoReducer,
    selectedVideo: selectedVideoSlice,
    channelDetails: channelSlice,
    subscription: subscriptionSlice,
    commentList: commentsSlice,
    searchedVideos: searchedVideoSlice,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
