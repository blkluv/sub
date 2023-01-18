import { LOAD_USER, UserState } from "./types";

const initialState: UserState = {
  user: null,
};

export default function (state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
}
