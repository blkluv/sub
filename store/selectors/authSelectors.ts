import { createSelector } from "@reduxjs/toolkit";

const selectAuth = (state) => state.auth || {};

export const selectIsAuthenticated = createSelector([selectAuth], (auth) => !!auth.user);
export const selectUser = createSelector([selectAuth], (auth) => auth.user || {});
export const selectUserAvatar = createSelector([selectUser], (user) => user.avatar || "");
export const selectAuthError = createSelector([selectAuth], (auth) => auth.errorMsg);
export const selectPinataSubdomain = createSelector([selectUser], (user) => user.pinataSubdomain);
export const selectAuthStatus = createSelector([selectAuth], (auth) => auth.status);
