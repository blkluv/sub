import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const selectAlert = (state: AppState) => state.alert;
export const selectMessage = createSelector([selectAlert], (alert) => alert.message);
export const selectType = createSelector([selectAlert], (alert) => alert.type);
export const selectTimeout = createSelector([selectAlert], (alert) => alert.timeout);
