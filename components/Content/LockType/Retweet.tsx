import { Divider, Typography, Unstable_Grid2 } from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
      return data;
    }
  };
  const description = (
    <Typography
      variant="h6"
      sx={{
        padding: (theme) => theme.spacing(1),
        color: (theme) => theme.palette.primary.contrastText,
      }}
    >
      Connect your Twitter account and<br></br>retweet the tweet to unlock the content.
    </Typography>
  );
  const tweetId =
    fileInfo?.unlockInfo?.tweetUrl &&
    fileInfo?.unlockInfo?.tweetUrl.split("status/")?.[1]?.split("?")?.[0];
  return (
    <Unstable_Grid2 container direction={"column"} justifyContent={"center"}>
      <Container>
        <Unstable_Grid2 container justifyContent={"center"}>
          {tweetId && <Tweet tweetId={tweetId} />}
          <Divider sx={{ width: "100%", margin: (theme) => theme.spacing(1, 0, 0, 0) }} />
        </Unstable_Grid2>
        <BaseLockType
          description={description}
          fileInfo={fileInfo}
          lockName={"retweet"}
          handleVerify={twitterAuth}
        />
      </Container>
    </Unstable_Grid2>
  );
};
export default Retweet;
