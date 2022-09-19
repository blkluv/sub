import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { AppState, AppStoreDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export type AppDispatch = typeof useDispatch;
export const useAppDispatch: () => AppStoreDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
