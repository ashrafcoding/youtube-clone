import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./sliceAuth";
import videoReducer from "./sliceVideo";

const store = configureStore({
  reducer: {
    auth: authReducer,
    videos: videoReducer,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
