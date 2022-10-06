import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Tweet } from "react-twitter-widgets";
import { getKy } from "../../../helpers/ky";
import { SubmarinedContent } from "../../../types/SubmarinedContent";
import BaseLockType from "./LockTypeContainer";

const Retweet = ({ fileInfo }) => {
  const twitterAuth = async () => {
    try {
      localStorage.setItem("sub-id", window.location.pathname.split("/")[1]);
      const ky = getKy();
      const response = await ky.post(`/api/twitter/oauth/verify`);
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error(error);
      alert(error.message);
      return null;
    }
  };
  const router = useRouter();
  useEffect(() => {
    const { oauth_token, oauth_verifier } = router.query;
    if (oauth_token && oauth_verifier) {
      handleVerification(oauth_token, oauth_verifier);
    }
  }, [router.query]);

  const handleVerification = async (
    oauth_token,
    oauth_verifier
  ): Promise<SubmarinedContent | void> => {
    const ky = getKy();
    const res = await ky
      .get(
        `/api/twitter/oauth/verify?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}&shortId=${
          window.location.pathname.split("/")[1]
        }`
      )
      .catch((err) => {});
    if (res) {
      const data: SubmarinedContent = await res.json();
      console.log({ data });
      return data;
    }
  };
  const description = (
    <p className="mt-4 mb-4 text-md text-muted">
      Unlock this content by retweeting the above tweet and signing in with your Twitter account.
    </p>
  );
  const tweetId =
    fileInfo?.unlockInfo?.tweetUrl &&
    fileInfo?.unlockInfo?.tweetUrl.split("status/")?.[1]?.split("?")?.[0];
  return (
    <>
      {tweetId && <Tweet tweetId={tweetId} />}
      <p className="text-muted text-sm">Make sure you have retweeted the above Tweet.</p>
      <BaseLockType
        description={description}
        fileInfo={fileInfo}
        lockName={"retweet"}
        handleVerify={twitterAuth}
      />
    </>
  );
};
export default Retweet;
