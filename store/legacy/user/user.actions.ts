import gravatar from "gravatar";
// import { fetchApiKeys } from "../apiKeys/apikeys.actions";
import { LOAD_USER, User } from "./types";
import { api } from "../fakeAxios";
import { doLogOut } from "../../slices/authSlice";

export const loadUserInfo = (user: User) => async (dispatch: any) => {
  console.log("loading user info", user);
  try {
    const res = await api.get("users/checkForSession");
    let avatar = localStorage.getItem("pinata-avatar");
    if (!avatar) {
      avatar = await gravatar.url(user.email, {
        s: "200", //size of image
        r: "pg", //rating of image - no adult content
        d: "mm", //return default image if no gravatar found
      });
      localStorage.setItem("pinata-avatar", avatar);
    }
    const userInfo = {
      ...user,
      avatar,
      featureFlags: res?.data?.userInformation?.feature_flags?.feature_flags,
      scheduledToBeCancelledAt: res?.data?.userInformation?.scheduledToBeCancelledAt,
    };
    dispatch({
      type: LOAD_USER,
      payload: userInfo,
    });
    //     dispatch(fetchApiKeys(0));
  } catch (error) {
    console.log(error);
    dispatch(doLogOut());
  }
};

// export const getUserPreview = async () => {
//   return api.get("v2/users/preview");
// };

// export const deleteUserPreview = async () => {
//   return api.delete("v2/users/preview");
// };

// export const setUserPreview = async (data: { file: any; title: string; description: string }) => {
//   const formData = new FormData();
//   formData.append("file", data.file);
//   formData.append("title", data.title);
//   formData.append("description", data.description);
//   return api.post("v2/users/preview", formData);
// };

// export const cancelUserAccount = () => async (dispatch: any) => {
//   try {
//     await api.delete(`users/current?confirm=true`);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const restoreCanceledAccount = () => async (dispatch: any) => {
  try {
    await api.post(`users/un-cancel`);
  } catch (error) {
    console.log(error);
  }
};
