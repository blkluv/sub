import { Box, Button, Container, Typography, Unstable_Grid2 } from "@mui/material";
import { useRouter } from "next/router";
import { TwitterTweetEmbed } from "react-twitter-embed";

import { getKy } from "../../../helpers/ky";
import { SubmarinedContent } from "../../../types/SubmarinedContent";
import { MetadataUnlockInfo } from "../../Submarine/SelectLockType/SubmarineFileForm";
import BaseLockType from "./LockTypeContainer";

interface RetweetProps {
  fileInfo: MetadataUnlockInfo;
  isPreview: boolean;
}
const Retweet = ({ fileInfo, isPreview }: RetweetProps) => {
  const router = useRouter();
  if (fileInfo.unlockInfo.type !== "retweet") {
    return null;
  }
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

  const { oauth_token, oauth_verifier } = router.query;
  const hasConnectedTwitter = oauth_token && oauth_verifier;

  const handleVerification = async (): Promise<SubmarinedContent> => {
    return new Promise<SubmarinedContent>(async (resolve, reject) => {
      const { oauth_token, oauth_verifier, id } = router.query;
      if (!oauth_token || !oauth_verifier) {
        reject("Could not verify retweet");
      }
      const ky = getKy();
      const res = await ky
        .get(
          `/api/twitter/oauth/verify?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}&shortId=${
            window.location.pathname.split("/")[1]
          }`
        )
        .catch((err) => {
          router.replace(`/${id}`, undefined, { shallow: true });
          reject("Could not verify retweet");
        });
      if (res) {
        const data: SubmarinedContent = await res.json();
        resolve(data);
      }
      router.replace(`/${id}`, undefined, { shallow: true });
      reject("Could not verify retweet");
    });
  };
  const description = (
    <Typography
      variant="h6"
      sx={{
        padding: (theme) => theme.spacing(1),
        color: (theme) => theme.palette.primary.contrastText,
      }}
    >
      Connect your Twitter account and<br></br>retweet the tweet to unlock content
    </Typography>
  );
  const tweetId =
    fileInfo?.unlockInfo?.tweetUrl &&
    fileInfo?.unlockInfo?.tweetUrl.split("status/")?.[1]?.split("?")?.[0];
  const containerOptions = isPreview
    ? {
        xs: 12,
      }
    : {
        xs: 12,
        md: 6,
      };
  return (
    <Unstable_Grid2 container direction={"column"} justifyContent={"center"}>
      <Container>
        {tweetId && (
          <Unstable_Grid2 container justifyContent={"center"}>
            <Unstable_Grid2 {...containerOptions}>
              <TwitterTweetEmbed options={{ conversation: "none" }} tweetId={tweetId} />
            </Unstable_Grid2>
          </Unstable_Grid2>
        )}
        {hasConnectedTwitter ? (
          <BaseLockType
            description={description}
            fileInfo={fileInfo}
            lockName={"retweet"}
            handleVerify={handleVerification}
          />
        ) : (
          <Button
            variant="contained"
            onClick={twitterAuth}
            sx={{
              width: "90%",
              maxWidth: "300px",
              borderRadius: 1000,
              ...(fileInfo?.customizations?.buttonShape === "square" && {
                borderRadius: 2,
              }),
              backgroundColor: (theme) => theme.palette.primary.light,
              ...(fileInfo?.customizations?.buttonColor &&
                fileInfo?.customizations?.buttonColor?.hex && {
                  backgroundColor: fileInfo.customizations.buttonColor.hex,
                }),
              color: "#000000",
              ...(fileInfo?.customizations?.buttonTextColor &&
                fileInfo?.customizations?.buttonTextColor.hex && {
                  color: fileInfo.customizations.buttonTextColor.hex,
                }),
            }}
          >
            Connect Twitter
          </Button>
        )}
      </Container>
    </Unstable_Grid2>
  );
};
export default Retweet;
