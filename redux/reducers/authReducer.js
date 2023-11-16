import { createSlice } from "@reduxjs/toolkit";
import { authInitialState } from "../initialState";

const authReducer = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login: (state, { payload }) => ({
      ...state,
      isLoggedIn: true,
      email: payload?.email,
      role: payload?.role ?? undefined,
    }),
    logout: () => ({
      isLoggedIn: false,
      email: undefined,
      role: undefined,
    }),
    profileIncomplete: (state) => ({
      ...state,
      isProfileIncomplete: true,
    }),
    profileComplete: (state) => ({
      ...state,
      isProfileIncomplete: undefined,
    }),
  },
});

export const { login, logout, profileIncomplete, profileComplete } =
  authReducer.actions;

export default authReducer.reducer;
