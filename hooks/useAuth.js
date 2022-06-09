import { useState, useEffect } from "react";
import Amplify, { Auth, Hub, Cache } from "aws-amplify";
import router, { useRouter } from "next/router";
import { awsconfig } from "../helpers/awsconfig";
import { awsauth } from "../helpers/awsauth";
import Cookies from "js-cookie";
import gravatar from "gravatar";
import axios from "axios";
import ky from "ky";
Amplify.configure(awsconfig);
Auth.configure({ oauth: awsauth });

export const fetchSession = async () => {
  try {
    const session = await Auth.currentSession();
    const user = await Auth.currentAuthenticatedUser();
    if (user) {
      let avatar = localStorage.getItem("pinata-avatar");
      if (!avatar) {
        avatar = await gravatar.url(user.attributes.email, {
          s: "200", //size of image
          r: "pg", //rating of image - no adult content
          d: "mm", //return default image if no gravatar found
        });
        localStorage.setItem("pinata-avatar", avatar);
      }
      user.avatar = avatar;
    }
    const { idToken, accessToken, refreshToken } = session;
    return {
      user,
      session,
      accessToken: accessToken.jwtToken,
      refreshToken: refreshToken.token,
      idToken: idToken.jwtToken,
    };
  } catch (error) {
    console.log(error);
    if (
      window.location.pathname !== "/" &&
      !window.location.pathname.includes("auth")
    ) {
      window.location.replace("/");
    }
    //  Cognito does not handle non-logged in users well here
    //  Because it throws an error, we just need to return null for all properties
    return null;
  }
};

export const logUserOut = async () => {
  clearCognitoCache();
  await Auth.signOut({ global: true });
  window.location.replace("/");
};

export const clearCognitoCache = () => {
  const cookies = Cookies.get();
  const cookieKeys = Object.keys(cookies);
  const filteredCookies = cookieKeys.filter((c) =>
    c.includes("CognitoIdentityServiceProvider")
  );
  for (const c of filteredCookies) {
    Cookies.remove(c, { path: "/", domain: ".app.pinata.cloud" });
    Cookies.remove(c, { path: "/", domain: ".pinata.cloud" });
    console.log("removed");
  }
};

export const logUserIn = async (email, password) => {
  try {
    localStorage.removeItem("pinata-avatar");
    // await Auth.federatedSignIn();
    const res = await Auth.signIn(email, password);
    if(res.challengeName) {
      return {
        success: true,
        user: res,
      };
    } else {
      const { accessToken } = await fetchSession();
      await ky("/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          source: "login",
        },
      });
  
      return {
        success: true,
        user: res,
      };
    }    
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};

export const signUpUser = async (
  email,
  password,
  firstName,
  lastName,
  isBuilder
) => {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        "custom:firstName": firstName,
        "custom:lastName": lastName,
        "custom:userType": isBuilder ? "builder" : "creator",
      },
    });
    return {
      success: true,
      user,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      user: null,
      error,
    };
  }
};

export const confirmMFA = async (user, code) => {
  try {
    const res = await Auth.confirmSignIn(user, code, "SOFTWARE_TOKEN_MFA");
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const confirmSignUp = async (email, password, code) => {
  try {
    await Auth.confirmSignUp(email, code);
    await logUserIn(email, password);
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error,
    };
  }
};

export const resendConfirmationCode = async (email) => {
  try {
    await Auth.resendSignUp(email);
    return {
      success: true,
    };
  } catch (error) {
    console.log("error resending code: ", error);
    return {
      success: false,
      error,
    };
  }
};

export const sendPasswordReset = async (email) => {
  try {
    await Auth.forgotPassword(email);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const forgotPasswordSubmit = async (email, code, newPassword) => {
  try {
    await Auth.forgotPasswordSubmit(email, code, newPassword);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const session = await fetchSession();
    return await Auth.changePassword(session.user, oldPassword, newPassword);
  } catch (error) {
    throw error;
  }
};

export const getMFAOptions = async () => {
  const session = await fetchSession();
  return await Auth.getPreferredMFA(session.user);
};

export const setPreferredMFA = async (preferredMFA) => {
  const session = await fetchSession();
  const mfaType = preferredMFA ? preferredMFA : "TOTP";
  return await Auth.setPreferredMFA(session.user, mfaType);
};

export const setupTotp = async () => {
  const session = await fetchSession();
  return await Auth.setupTOTP(session.user);
};

export const verifytTotp = async (challengeAnswer) => {
  try {
    const session = await fetchSession();
    await Auth.verifyTotpToken(session.user, challengeAnswer);
    return await setPreferredMFA();
  } catch (error) {
    throw error;
  }
};

export const updateAttributes = async (attributes) => {
  try {
    const session = await fetchSession();
    const user = session.user;
    await Auth.updateUserAttributes(user, attributes);
  } catch (error) {
    throw error;
  }
};

export const getAuthenticatedUser = async () => {
  return await Auth.currentAuthenticatedUser();
};

// export const getUserBillingInfo = async () => {
//   const { accessToken } = await fetchSession();
//   try {
//     const res = await ky(
//       `${process.env.NEXT_PUBLIC_PINATA_API_URL}/users/userStripeCustomer`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           source: "login",
//         },
//       }
//     );

//     const userJson = await res.json();
//     return userJson;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

export const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [idToken, setIdToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [plan, setPlan] = useState("");
  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          const { signInUserSession } = data;
          Auth.currentAuthenticatedUser().then((user) => {
            setUser(user);
            setIsAuthenticated(true);
            setAccessToken(signInUserSession.accessToken);
            setRefreshToken(signInUserSession.refreshToken);
            setIdToken(signInUserSession.idToken);
          });
          break;
        case "signOut":
          console.log("sign out");
          setUser(null);
          setIsAuthenticated(false);
          break;
        case "signUp":
          console.log("sign up");

          break;
        default:
          return;
      }
    });
    handleSession();
  }, []);

  const authWithTwitter = async (calbackUrl) => {
    try {
      //OAuth Step 1
      const response = await axios({
        url: `/api/twitter?request_token=true`,
        method: "POST",
        body: {
          callbackUrl,
        },
      });

      const { oauth_token } = response.data;
      localStorage.setItem("ot", oauth_token);
      //Oauth Step 2
      window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSession = async () => {

    const sessionData = await fetchSession();

    if (sessionData && sessionData.user && sessionData.session) {
      setUser(sessionData.user);
      setIsAuthenticated(true);
      setAccessToken(sessionData.accessToken);
      setRefreshToken(sessionData.refreshToken);
      setIdToken(sessionData.idToken);
    }
  };

  return {
    isAuthenticated,
    loggedInUser,
    signUpUser,
    confirmSignUp,
    resendConfirmationCode,
    sendPasswordReset,
    forgotPasswordSubmit,
    confirmMFA,
    logUserIn,
    logUserOut,
    fetchSession,
    changePassword,
    getMFAOptions,
    setPreferredMFA,
    setupTotp,
    verifytTotp,
    accessToken,
    idToken,
    refreshToken,
    updateAttributes,
    getAuthenticatedUser,
    clearCognitoCache,
    authWithTwitter,
    plan,
  };
};
