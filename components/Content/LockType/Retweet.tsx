import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Tweet } from "react-twitter-widgets";
import { getKy } from "../../../helpers/ky";
import { useTwitter } from "../../../hooks/useTwitter";
import { SubmarinedContent } from "../../../types/SubmarinedContent";
import BaseLockType from "./LockTypeContainer";

const Retweet = ({ fileInfo }) => {
  const { verifyRetweet, twitterAuth } = useTwitter();

  const router = useRouter();
  useEffect(() => {
    const { oauth_token, oauth_verifier } = router.query;
    if (oauth_token && oauth_verifier) {
      handleVerification(oauth_token, oauth_verifier);
    }
  }, [router.query]);

  const handleVerification = async (): Promise<SubmarinedContent | void> => {
    const ky = getKy();
    const res = await ky.get(
      `/api/twitter/oauth/verify?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}&shortId=${
        window.location.pathname.split("/")[1]
      }`
    );
    const data: SubmarinedContent = await res.json();
    return data;
  };
  const description = (
    <p className="mt-4 mb-4 text-md text-muted">
      Unlock this content by retweeting the above tweet and signing in with your Twitter account.
    </p>
  );
  return (
    <>
      <Tweet
        tweetId={
          fileInfo?.unlockInfo?.tweetUrl &&
          fileInfo?.unlockInfo?.tweetUrl.split("status/")?.[1]?.split("?")?.[0]
        }
      />
      <p className="text-muted text-sm">Make sure you have retweeted the above Tweet.</p>

      <BaseLockType
        description={description}
        fileInfo={fileInfo}
        lockName={"retweet"}
        handleVerify={handleVerification}
      />
    </>
  );
};
export default Retweet;
