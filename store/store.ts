import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { createWrapper } from "next-redux-wrapper";
import { alertSlice } from "./slices/alertSlice";
import { submarinedContentSlice } from "./slices/submarinedContentSlice";
import billing from "./legacy/billing/billing.reducer";
import metrics from "./legacy/metrics/metrics.reducer";
import gateways from "./legacy/gateways/gateways.reducer";
import user from "./legacy/user/user.reducer";

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [alertSlice.name]: alertSlice.reducer,
  [submarinedContentSlice.name]: submarinedContentSlice.reducer,
  billing,
  metrics,
  gateways,
  user,
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export type AppStoreDispatch = ReturnType<typeof makeStore>["dispatch"];
export const wrapper = createWrapper<AppStore>(makeStore);
