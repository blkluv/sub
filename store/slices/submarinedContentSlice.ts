import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { SubmarinedContent } from "../../types/SubmarinedContent";

interface SubmarinedContentState {
  content?: SubmarinedContent;
}
const initialState: SubmarinedContentState = {
  content: null,
};

export const submarinedContentSlice = createSlice({
  name: "submarinedContent",
  initialState,
  reducers: {
    setSubmarinedContent: (state, action: PayloadAction<SubmarinedContent>) => {
      state.content = action.payload;
    },
    clearSubmarinedContent: (state) => {
      state.content = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      console.log("HYDRATE SUBMARINED CONTENT", action);
    });
  },
});

export const { setSubmarinedContent, clearSubmarinedContent } = submarinedContentSlice.actions;

export default submarinedContentSlice.reducer;
