import { createSlice, createAsyncThunk, AnyAction, isPending, isFulfilled } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import Auth from "@aws-amplify/auth";
import Amplify from "@aws-amplify/core";
// import { Hub } from "@aws-amplify/core";
import { awsconfig } from "../../constants/awsconfig";
import gravatar from "gravatar";
import { getKy, setCredentials } from "../../helpers/ky";
import { Themes } from "../../theme/themes";
import * as FullStory from "@fullstory/browser";

//https://github.com/aws-amplify/amplify-js/issues/9208
//@ts-ignore
const _handleAuthResponse = Auth._handleAuthResponse.bind(Auth);
//@ts-ignore
Auth._handleAuthResponse = (url) => {
  const configuration = Auth.configure();
  //@ts-ignore
  if (!url.includes(configuration.oauth.redirectSignIn)) return;
  return _handleAuthResponse(url);
};
Amplify.configure(awsconfig);

export enum LOGIN_STATUSES {
  idle = "IDLE",
  pending = "PENDING",
  fulfilled = "FULFILLED",
  rejected = "REJECTED",
  MFARequest = "MFA_REQUEST",
  needsConfirmation = "NEEDS_CONFIRMATION",
}

// we use this to temporarily store CognitoUser for MFA login.
// CognitoUser is not serializable so we cannot store it on Redux.
let cognitoUser = {};
interface User {
  email?: string;
  email_verified?: boolean;
  firstname?: string;
  lastname?: string;
  sub?: string;
  avatar?: string;
  gatewayUrl?: string;
  theme?: keyof typeof Themes;
}
export interface AuthState {
  status: LOGIN_STATUSES;
  errorMsg?: string;
  user?: User;
}

// Initial state
const initialState = {
  status: LOGIN_STATUSES.idle,
  theme: "light",
} as AuthState;

interface UserCredentials {
  email: string;
  password: string;
}

interface UserMFA {
  mfa: string;
}

interface Login {
  user: User;
  status: "OK";
}
interface MFA {
  user: null;
  status: "MFA";
}

export const confirmMFA = createAsyncThunk("auth/confirmMFA", async ({ mfa }: UserMFA) => {
  if (!cognitoUser) {
    throw new Error("Invalid flow?!");
  }
  await Auth.confirmSignIn(cognitoUser, mfa, "SOFTWARE_TOKEN_MFA");
  const user = await getUser();
  return { user, status: "OK" };
});

export const doLogOut = createAsyncThunk("auth/logout", async () => {
  Auth.signOut();
  localStorage.removeItem("pinata_gateway_subdomain");
});

export const doLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }: UserCredentials): Promise<Login | MFA> => {
    const res = await Auth.signIn(email, password);
    if (res.challengeName === "SOFTWARE_TOKEN_MFA") {
      // we use this to temporarily store CognitoUser for MFA login.
      // CognitoUser is not serializable so we cannot store it on Redux.
      cognitoUser = res;
      return {
        status: "MFA",
        user: null,
      };
    } else {
      const user = await getUser();

      FullStory.event("Logged in", {
        userEmail: email,
      });
      return { user, status: "OK" };
    }
  }
);

const getUser = async (): Promise<User> => {
  const session = await Auth.currentSession();
  // @ts-ignore https://github.com/aws-amplify/amplify-js/issues/4927
  const { accessToken } = session;
  if (!accessToken) {
    throw new Error("Missing access token");
  }
  setCredentials(accessToken.jwtToken);
  const user = await Auth.currentAuthenticatedUser();
  try {
    const gatewayUrl = await getGatewayUrl();
    user.attributes = {
      ...user.attributes,
      gatewayUrl,
    };
  } catch (err) {}
  return user.attributes;
};

const getGatewayUrl = async (): Promise<string> => {
  const gatewayUrl = localStorage.getItem("pinata_gateway_subdomain");
  if (gatewayUrl) {
    return gatewayUrl;
  }
  const ky = getKy();
  const r = await ky(`${process.env.NEXT_PUBLIC_MANAGED_API}/gateways?page=1`, {
    method: "GET",
  });
  const re = await r.json();
  const gw = re?.items?.rows?.[0]?.domain;
  if (gw) {
    localStorage.setItem("pinata_gateway_subdomain", gw);
  }
  return gw;
};

export const refreshGatewayUrl = createAsyncThunk("auth/refreshGatewayUrl", async () => {
  const ky = getKy();
  const r = await ky("/api/users", {
    method: "GET",
  });
  const re = await r.json();
  const gw = re.pinata_gateway_subdomain;
  localStorage.setItem("pinata_gateway_subdomain", gw);
  return gw;
});

export const tryLogin = createAsyncThunk("auth/tryLogin", async (): Promise<Login | MFA> => {
  const user = await getUser();
  const userWithAvatar = await setAvatar(user);
  return { user: userWithAvatar, status: "OK" };
});

const setAvatar = async (user: User): Promise<User> => {
  let avatar = localStorage.getItem("pinata-avatar");
  if (!avatar) {
    avatar = await gravatar.url(user.email, {
      s: "200", //size of image
      r: "pg", //rating of image - no adult content
      d: "mm", //return default image if no gravatar found
    });
    localStorage.setItem("pinata-avatar", avatar || "");
  }
  user.avatar = avatar;
  return user;
};

const isPendingLogin = isPending(tryLogin, doLogin);
const isFulfilledLogin = isFulfilled(tryLogin, doLogin, confirmMFA);

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      console.log("HYDRATE AUTH", action);
    });
    builder.addCase(tryLogin.rejected, (state) => {
      state.status = LOGIN_STATUSES.idle;
    });
    builder.addCase(confirmMFA.rejected, (state, { error }) => {
      const { message } = error;
      state.errorMsg = message;
    });
    builder.addCase(doLogin.rejected, (state, { error }) => {
      if (error.code === "UserNotConfirmedException") {
        state.status = LOGIN_STATUSES.needsConfirmation;
      } else {
        state.status = LOGIN_STATUSES.rejected;
        const { message } = error;
        state.errorMsg = message;
      }
    });

    builder.addCase(doLogOut.fulfilled, (state) => {
      state.user = null;
    });

    builder.addCase(refreshGatewayUrl.fulfilled, (state, { payload }) => {
      if (state.user && payload !== state.user.gatewayUrl) {
        const gatewayUrl = `https://${payload}.${process.env.NEXT_PUBLIC_GATEWAY_ROOT}.cloud`;
        state.user.gatewayUrl = gatewayUrl;
      }
    });

    builder.addMatcher(isPendingLogin, (state) => {
      state.errorMsg = null;
      state.status = LOGIN_STATUSES.pending;
    });
    builder.addMatcher(isFulfilledLogin, (state, { payload: { user, status } }) => {
      state.status = LOGIN_STATUSES.fulfilled;
      if (status === "MFA") {
        state.status = LOGIN_STATUSES.MFARequest;
        return;
      }

      const gatewayUrl = `https://${user["gatewayUrl"]}.${process.env.NEXT_PUBLIC_GATEWAY_ROOT}.cloud`;
      state.user = {
        email: user.email,
        email_verified: user.email_verified,
        firstname: user["custom:firstName"],
        lastname: user["custom:lastName"],
        sub: user.sub,
        gatewayUrl,
      };
    });
  },
});

export default authSlice.reducer;
