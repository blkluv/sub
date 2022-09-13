import { useEffect, useState, FC, useCallback } from "react";
import axios from "axios";

export const useTwitter = () => {
  const twitterAuth = async () => {
    try {
      localStorage.setItem("sub-id", window.location.pathname.split("/")[1]);
      const response = await axios.post(`/api/twitter/oauth/verify`);

      const { oauth_token } = response.data;
      localStorage.setItem("ot", oauth_token);
      window.location.href = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
    } catch (error) {
      console.error(error);
      alert(error.message);
      return null;
    }
  };

  const verifyRetweet = async (oauth_token, oauth_verifier) => {
    if (oauth_token && oauth_verifier) {
      try {
        const res = await axios.get(
          `/api/twitter/oauth/verify?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}&shortId=${
            window.location.pathname.split("/")[1]
          }`
        );
        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  };

  return {
    twitterAuth,
    verifyRetweet,
  };
};
