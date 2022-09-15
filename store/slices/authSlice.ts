import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { HYDRATE } from "next-redux-wrapper";
import Auth from "@aws-amplify/auth";
import Amplify from "@aws-amplify/core";
// import { Hub } from "@aws-amplify/core";
import { awsconfig } from "../../constants/awsconfig";
import { awsauth } from "../../constants/awsauth";
import gravatar from "gravatar";
import { string } from "joi";
import { getKy, setCredentials } from "../../helpers/ky";

Amplify.configure(awsconfig);
Auth.configure({ oauth: awsauth });

export enum LOGIN_STATUSES {
  idle = "IDLE",
  pending = "PENDING",
  fulfilled = "FULFILLED",
  rejected = "REJECTED",
}

export interface AuthState {
  status: LOGIN_STATUSES;
  errorMsg?: string;
  user?: {
    email?: string;
    email_verified?: boolean;
    firstname?: string;
    lastname?: string;
    sub?: string;
    avatar?: string;
  };
}

// Initial state
const initialState: AuthState = {
  status: LOGIN_STATUSES.idle,
  user: null,
};

interface UserCredentials {
  email: string;
  password: string;
}

interface UserMFA {
  mfa: string;
}

export const confirmMFA = createAsyncThunk("auth/confirmMFA", async ({ mfa }: UserMFA) => {
  const user = await Auth.currentAuthenticatedUser();
  await Auth.confirmSignIn(user, mfa, "SOFTWARE_TOKEN_MFA");
});
export const doLogOut = createAsyncThunk("auth/logout", async () => {
  Auth.signOut();
});

export const doLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }: UserCredentials) => {
    const res = await Auth.signIn(email, password);
    if (res.challengeName) {
      //TODO
      return {
        success: true,
        user: res,
      };
    } else {
      const session = await Auth.currentSession();

      // @ts-ignore https://github.com/aws-amplify/amplify-js/issues/4927
      const { refreshToken, idToken, accessToken } = session;
      if (!accessToken) {
        throw new Error("Missing access token");
      }
      setCredentials(accessToken.jwtToken);
      const user = await Auth.currentAuthenticatedUser();
      try {
        const ky = getKy();
        console.log({ ky });
        const r = await ky("/api/users", {
          method: "GET",
        });
        console.log({ r });
      } catch (err) {
        console.log(err);
      }
      console.log({ user });
      return { user: user.attributes };
    }
  }
);

/**
 * if (result.success) {
        if (result?.user?.challengeName) {
          //  Indicates the user has MFA enabled
          setConfirmCode(true);
          setUser(result.user);
        } else if (result.error?.code === "UserNotConfirmedException") {
          setAuthError(
            "Account has not been confirmed, enter code that was previously emailed or request a new one"
          );
          setConfirmCode(true);
        }
      } else {
        // login failed, invalid username or wrong password
        setAuthError(result.error.message);
      }
 */

const setAvatar = async (user) => {
  if (user) {
    let avatar = localStorage.getItem("pinata-avatar");
    if (!avatar) {
      avatar = await gravatar.url(user.attributes.email, {
        s: "200", //size of image
        r: "pg", //rating of image - no adult content
        d: "mm", //return default image if no gravatar found
      });
      localStorage.setItem("pinata-avatar", avatar || "");
      //  Get User Info From Submarine DB
    }
    user.avatar = avatar;
  }
};
const fetchSession = async () => {
  try {
    const session = await Auth.currentSession();
    const user = await Auth.currentAuthenticatedUser();

    // @ts-ignore https://github.com/aws-amplify/amplify-js/issues/4927
    const { refreshToken, idToken, accessToken } = session;
    return {
      user,
      session,
      accessToken: accessToken.payload,
      refreshToken: refreshToken.getToken(),
      idToken: idToken.getJwtToken(),
    };
  } catch (error) {
    console.log({ error });
    if (window.location.pathname !== "/" && !window.location.pathname.includes("auth")) {
      window.location.replace("/");
    }
    //  Cognito does not handle non-logged in users well here
    //  Because it throws an error, we just need to return null for all properties
    return null;
  }
};
// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.auth,
    //     };
    //   },
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(doLogin.pending, (state, { payload }) => {
      state.errorMsg = null;
      state.status = LOGIN_STATUSES.pending;
    });
    builder.addCase(doLogin.rejected, (state, { error }) => {
      state.status = LOGIN_STATUSES.rejected;
      const { message } = error;
      state.errorMsg = message;
    });

    builder.addCase(doLogin.fulfilled, (state, { payload: { user } }) => {
      state.status = LOGIN_STATUSES.fulfilled;

      state.user = {
        email: user.email,
        email_verified: user.email_verified,
        firstname: user["custom:firstName"],
        lastname: user["custom:lastName"],
        sub: user.sub,
      };
    });
    builder.addCase(doLogOut.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export default authSlice.reducer;
