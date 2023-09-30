import { createSlice } from "@reduxjs/toolkit";
import { authInitialState } from "../initialState";

const authReducer = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login: (state, { payload: details }) => ({
      ...state,
      isLoggedIn: true,
      ...details,
    }),
    logout: () => ({
      isLoggedIn: false,
    }),
  },
});

export const { login, logout } = authReducer.actions;

export default authReducer.reducer;
