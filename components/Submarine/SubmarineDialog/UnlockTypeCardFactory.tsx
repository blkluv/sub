import { Divider, Typography, Unstable_Grid2, Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import { UnlockTypeCard } from "./UnlockTypeCard";

const UnlockTypeCardFactory = () => {
  const [unlockType, setUnlockType] = useState<string>("");

  const nftText = "Require ownership of a particular NFT to unlock your submarined content.";
  const retweetText =
    "Require a retweet of a specific tweet in order to unlock your submarined content.";
  const locationText =
    "Require someone to verify their current location to unlock your submarined content.";
  const twitchText = "Require a user to be a subscriber of a Twitch channel.";

  return (
    <>
      <Unstable_Grid2
        container
        direction="row"
        spacing={1}
        sx={{ margin: (theme) => theme.spacing(2, 0, 2, 0) }}
      >
        <UnlockTypeCard
          setUnlockType={setUnlockType}
          title="NFT Ownership"
          unlockType={unlockType}
          helperText={nftText}
          type="nft"
        />
        <UnlockTypeCard
          setUnlockType={setUnlockType}
          title="Retweet"
          unlockType={unlockType}
          helperText={retweetText}
          type="retweet"
        />
        <UnlockTypeCard
          setUnlockType={setUnlockType}
          title="Location"
          unlockType={unlockType}
          helperText={locationText}
          type="location"
        />
        <UnlockTypeCard
          setUnlockType={setUnlockType}
          title="Twitch"
          unlockType={unlockType}
          helperText={twitchText}
          type="twitch"
        />
        {/* <Unstable_Grid2 xs={12} sm={6} lg={3}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Unstable_Grid2 xs={2}>
                <Typography variant="h3" sx={{ color: (theme) => theme.palette.grey[500] }}>
                  Credit/Debit Card Payment
                </Typography>
              </Unstable_Grid2>
              <Unstable_Grid2 xs={10} sx={{ margin: (theme) => theme.spacing(0, 0, 2, 0) }}>
                <Typography sx={{ color: (theme) => theme.palette.grey[500] }}>
                  Coming Soon
                </Typography>
              </Unstable_Grid2>
            </CardContent>
          </Card>
        </Unstable_Grid2> */}
      </Unstable_Grid2>
    </>
  );
};
export default UnlockTypeCardFactory;
