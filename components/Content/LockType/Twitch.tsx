import { Button, Unstable_Grid2, Typography } from "@mui/material";
import { Container } from "@mui/system";
import BaseLockType from "./LockTypeContainer";
import { SubmarinedContent } from "../../../types/SubmarinedContent";
import { getKy } from "../../../helpers/ky";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { setAlert } from "../../../store/slices/alertSlice";
import { setSubmarinedContent } from "../../../store/slices/submarinedContentSlice";
import { useAppDispatch } from "../../../store/hooks";

const Twitch = ({ fileInfo }) => {
  const router = useRouter();
  const { access_token } = router.query;
  const dispatch = useAppDispatch();
  const twitchAuth = async () => {
    try {
      localStorage.setItem("twitch-sub-id", window.location.pathname.split("/")[1]);
      window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENTID}&redirect_uri=http://${process.env.NEXT_PUBLIC_VERCEL_URL}/twitch&response_type=token&scope=user:read:subscriptions`;
    } catch (error) {
      console.error(error);
      alert(error.message);
      return null;
    }
  };

  useEffect(() => {
    const handleVerification = async () => {
      const ky = getKy();
      const res = await ky
        .post("/api/twitch/oauth/verify", {
          json: {
            accessToken: access_token,
            shortId: window.location.pathname.split("/")[1],
          },
        })
        .catch((err) => {
          console.log(err);
        });
      if (res) {
        const data: SubmarinedContent = await res.json();
        dispatch(setSubmarinedContent(data));
        return;
      }
      dispatch(setAlert({ type: "error", message: "Subscription cannot be verified" }));
      return;
    };
    if (access_token) {
      handleVerification().catch((err) => console.log(err));
    }
  }, [router.query]);

  const description = (
    <Typography
      variant="h6"
      sx={{
        padding: (theme) => theme.spacing(1),
        color: (theme) => theme.palette.primary.contrastText,
      }}
    >
      Connect your Twitch account and<br></br>verify you are subscribed to{" "}
      {fileInfo?.unlockInfo?.loginName}&apos;s channel.
    </Typography>
  );
  return (
    <Unstable_Grid2 container direction={"column"} justifyContent={"center"}>
      <Container>
        {description}
        <Button
          variant="contained"
          onClick={twitchAuth}
          sx={{
            width: "90%",
            maxWidth: "300px",
            borderRadius: 1000,
            ...(fileInfo?.customizations?.buttonShape === "square" && {
              borderRadius: 2,
            }),
            backgroundColor: (theme) => theme.palette.primary.light,
            ...(fileInfo?.customizations.buttonColor &&
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
          Connect Twitch
        </Button>
      </Container>
    </Unstable_Grid2>
  );
};
export default Twitch;
