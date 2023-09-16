import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./reducers/commonReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: { common: commonReducer, user: userReducer },
});

export const dispatch = (action) => store.dispatch(action);

export default store;
