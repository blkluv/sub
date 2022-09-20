import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export type AppStoreDispatch = ReturnType<typeof makeStore>["dispatch"];
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
