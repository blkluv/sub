import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

const selectSubmarinedContentSlice = (state: AppState) => state.submarinedContent;

export const selectHasUnlockedContent = createSelector(
  [selectSubmarinedContentSlice],
  (submarinedContent) => !!submarinedContent.content
);

export const selectSubmarinedContent = createSelector(
  [selectSubmarinedContentSlice],
  (submarinedContent) => submarinedContent.content
);
