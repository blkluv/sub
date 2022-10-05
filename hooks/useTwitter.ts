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
