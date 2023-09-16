import { createSlice } from "@reduxjs/toolkit"
import { userInitialState } from "../initialState"


const commonReducer = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {
        login: (state, { payload: details }) => ({ ...state, isLoggedIn: true, ...details }),
        logout: () => (userInitialState),

    }

})

export const { login, logout } = commonReducer.actions

export default commonReducer.reducer