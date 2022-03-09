import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./sliceAuth";
import videoReducer from "./sliceVideo";
import selectedVideoSlice from "./sliceSelectedVideo";

const store = configureStore({
  reducer: {
    auth: authReducer,
    videos: videoReducer,
    selectedVideo: selectedVideoSlice,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
