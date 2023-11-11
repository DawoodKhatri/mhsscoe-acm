import { createSlice } from "@reduxjs/toolkit";
import { authInitialState } from "../initialState";

const authReducer = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login: (state, { payload }) => ({
      ...state,
      isLoggedIn: true,
      isAdmin: payload?.isAdmin ?? undefined,
    }),
    logout: () => ({
      isLoggedIn: false,
      isAdmin: undefined,
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
