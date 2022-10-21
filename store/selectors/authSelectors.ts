import { createSelector } from "@reduxjs/toolkit";
import { LOGIN_STATUSES } from "../slices/authSlice";
import { AppState } from "../store";

const selectAuth = (state: AppState) => state.auth;
export const selectIsAuthenticated = createSelector([selectAuth], (auth) => !!auth.user);

export const selectIsMFARequest = createSelector(
  [selectAuth],
  (auth) => auth.status === LOGIN_STATUSES.MFARequest
);

export const selectUser = createSelector([selectAuth], (auth) => auth.user || {});
export const selectUserAvatar = createSelector([selectUser], (user) => user.avatar || "");
export const selectAuthError = createSelector([selectAuth], (auth) => auth.errorMsg);
export const selectAuthStatus = createSelector([selectAuth], (auth) => auth.status);
export const selectGatewayUrl = createSelector([selectUser], (user) => user.gatewayUrl);
export const selectTheme = createSelector([selectUser], (user) => {
  // TODO store preferences?
  if (user.theme) {
    return "light";
  }
  if (global.window) {
    return global.window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
});
