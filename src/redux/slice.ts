import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: null,
  isLoggedIn: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      return { ...state, isLoading: true };
    },
    loginSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };
    },
    loginFail: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.payload,
      };
    },
    loadProfile: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };
    },
  },
});

export default authSlice.reducer;

export const { loginRequest, loginSuccess, loginFail, loadProfile } =
  authSlice.actions;
