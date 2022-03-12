import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./sliceAuth";
import videoReducer from "./sliceVideo";
import selectedVideoSlice from "./sliceSelectedVideo";
import channelSlice from "./sliceChannel";
import subscriptionSlice from "./sliceSubscription";

const store = configureStore({
  reducer: {
    auth: authReducer,
    videos: videoReducer,
    selectedVideo: selectedVideoSlice,
    channelDetails: channelSlice,
    subscription: subscriptionSlice,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
