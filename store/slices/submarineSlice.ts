import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { getKy } from "../../helpers/ky";

export enum SUBMARINE_STATUSES {
  idle = "IDLE",
  pending = "PENDING",
  fulfilled = "FULFILLED",
  rejected = "REJECTED",
}

export interface SubmarineState {
  status: SUBMARINE_STATUSES;
  errorMsg?: string;
}

// Initial state
const initialState: SubmarineState = {
  status: SUBMARINE_STATUSES.idle,
};

export const getSubmarineApiKey = createAsyncThunk("submarine/getSubmarineApiKey", async () => {
  const ky = getKy();
  const res = await ky(`${process.env.NEXT_PUBLIC_MANAGED_API}/auth/keys`);
  const json = await res.json();
  const { items } = json;
  if (items.length > 0) {
    return items[0].key;
  } else {
    return null;
  }
});

export const submarineSlice = createSlice({
  name: "submarine",
  initialState,
  reducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },

  extraReducers: (builder) => {},
});

export default submarineSlice.reducer;
