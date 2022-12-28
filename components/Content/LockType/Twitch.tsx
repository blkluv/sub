import { Button, Unstable_Grid2, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import BaseLockType from "./LockTypeContainer";
import { SubmarinedContent } from "../../../types/SubmarinedContent";

const Twitch = ({ fileInfo }) => {
  const [hasConnectedTwitch, setHasConnectedTwitch] = useState<boolean>(false);

  const handleVerification = () => {
    return console.log("Verify the user is subscribed to the Twitch channel.");
  };
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
        {fileInfo?.unlockInfo?.loginName && <Typography>{description}</Typography>}
        {hasConnectedTwitch ? (
          <Typography>Twitch Connected</Typography>
        ) : (
          // <BaseLockType
          //   description={description}
          //   fileInfo={fileInfo}
          //   lockName={"retweet"}
          //   handleVerify={handleVerification}
          // />
          <Button
            variant="contained"
            onClick={() => console.log("Connect Twitch function")}
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
        )}
      </Container>
    </Unstable_Grid2>
  );
};
export default Twitch;
