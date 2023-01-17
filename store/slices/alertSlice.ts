import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AlertType } from "../../components/Alert";

interface AlertState {
  message: string;
  type: AlertType | "";
  timeout?: number;
}
// Initial state
const initialState: AlertState = {
  type: AlertType.Info,
  message: "",
  timeout: 0,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertState>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.timeout = action.payload.timeout || 5000;
    },
    clearAlert: (state) => {
      state.message = "";
      state.type = "";
      state.timeout = 0;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      console.log("HYDRATE ALERT", action);
    });
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
